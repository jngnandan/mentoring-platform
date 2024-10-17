import React, { createContext, useState, useEffect, useContext, useReducer } from "react";
import { createClient, User, SupabaseClient } from '@supabase/supabase-js';
import { signInWithGoogle, auth } from '../firebase'; // Ensure this path is correct

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

type AuthState = {
  user: User | null;
  loading: boolean;
};

type AuthAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

interface Notification {
  id: number;
  type: 'booking' | 'announcement';
  action?: string;
  user?: string;
  avatar?: string;
  title?: string;
  link: string;
  read: boolean;
}

interface ContentContextType {
  authState: AuthState;
  authDispatch: React.Dispatch<AuthAction>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  profilesData: any[];
  fetchProfilesData: () => Promise<void>;
  fetchProfileById: (id: string) => Promise<any>;
  superProfiles: any[];
  setSuperProfiles: React.Dispatch<React.SetStateAction<any[]>>;
  fetchSuperbaseProfiles: () => Promise<void>;
  colorScheme: string;
  toggleColorScheme: () => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
  markNotificationAsRead: (id: number) => void;
  markAllNotificationsAsRead: () => void;
  clearAllNotifications: () => void;
  unreadNotificationsCount: number;
  paymentOptions: any[];
  setPaymentOptions: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, { user: null, loading: true });
  const [profilesData, setProfilesData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [superProfiles, setSuperProfiles] = useState<any[]>([]);
  const [colorScheme, setColorScheme] = useState<string>('light');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [paymentOptions, setPaymentOptions] = useState<any[]>([]);

  const backendPort = 3002;
  const domainName = "localhost";

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      authDispatch({ type: 'SET_USER', payload: session?.user || null });
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      authDispatch({ type: 'SET_USER', payload: session?.user || null });
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      authDispatch({ type: 'SET_USER', payload: user });
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      authDispatch({ type: 'SET_LOADING', payload: true });
      const user = await signInWithGoogle();
      if (user) {
        authDispatch({ type: 'SET_USER', payload: user });
      }
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      authDispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      authDispatch({ type: 'SET_USER', payload: null });
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const fetchSuperbaseProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw error;
      setSuperProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfilesData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/profiles`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setProfilesData(data);
    } catch (error) {
      console.error('Error fetching profiles data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileById = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/profiles/${id}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching profile with ID ${id}:`, error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'read'>) => {
    setNotifications(prev => [
      ...prev,
      { ...notification, id: Date.now(), read: false }
    ]);
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    fetchProfilesData();
    fetchSuperbaseProfiles();
  }, []);

  const value: ContentContextType = {
    authState,
    authDispatch,
    signIn,
    signOut,
    profilesData,
    fetchProfilesData,
    fetchProfileById,
    superProfiles,
    setSuperProfiles,
    fetchSuperbaseProfiles,
    colorScheme,
    toggleColorScheme,
    notifications,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications,
    unreadNotificationsCount,
    paymentOptions, // Exposed paymentOptions
    setPaymentOptions, // Exposed setPaymentOptions
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
