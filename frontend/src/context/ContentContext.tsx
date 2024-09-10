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

interface ContentContextType {
  authState: AuthState;
  authDispatch: React.Dispatch<AuthAction>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  products: string;
  setProducts: React.Dispatch<React.SetStateAction<string>>;
  compareProducts: string;
  setCompareProducts: React.Dispatch<React.SetStateAction<string>>;
  dataFromBackend: any[];
  setDataFromBackend: React.Dispatch<React.SetStateAction<any[]>>;
  appleData: any[];
  samsungData: any[];
  fetchSamsungData: () => Promise<void>;
  xiaomiData: any[];
  fetchXiaomiData: () => Promise<void>;
  oneplusData: any[];
  fetchOneplusData: () => Promise<void>;
  fetchGoogleData: () => Promise<void>;
  googleData: any[];
  fetchMotorolaData: () => Promise<void>;
  motorolaData: any[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAppleData: () => Promise<void>;
  checkboxData: string[];
  setCheckboxData: React.Dispatch<React.SetStateAction<string[]>>;
  mobilesData: any[];
  fetchMobilesData: (brand: string) => Promise<any[]>;
  profilesData: any[];
  fetchProfilesData: () => Promise<void>;
  fetchProfileById: (id: string) => Promise<any>;
  superProfiles: any[];
  setSuperProfiles: React.Dispatch<React.SetStateAction<any[]>>;
  fetchSuperbaseProfiles: () => Promise<void>;
  colorScheme: string; // Added for dark mode
  toggleColorScheme: () => void; // Function to toggle color scheme
}

export const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, { user: null, loading: true });
  const [products, setProducts] = useState<string>('super');
  const [compareProducts, setCompareProducts] = useState<string>('Wow');
  const [dataFromBackend, setDataFromBackend] = useState<any[]>([]);
  const [appleData, setAppleData] = useState<any[]>([]);
  const [samsungData, setSamsungData] = useState<any[]>([]);
  const [xiaomiData, setXiaomiData] = useState<any[]>([]);
  const [oneplusData, setOneplusData] = useState<any[]>([]);
  const [motorolaData, setMotorolaData] = useState<any[]>([]);
  const [googleData, setGoogleData] = useState<any[]>([]);
  const [mobilesData, setMobilesData] = useState<any[]>([]);
  const [checkboxData, setCheckboxData] = useState<string[]>(['cool']);
  const [profilesData, setProfilesData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [superProfiles, setSuperProfiles] = useState<any[]>([]);
  
  const [colorScheme, setColorScheme] = useState<string>('light'); // Default to light

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

  const fetchData = async () => {
    try {
      const response = await fetch(`http://${domainName}:${backendPort}/`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setDataFromBackend(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMobilesData = async (brand: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/${brand}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setMobilesData(data);
      return data;
    } catch (error) {
      console.error(`Error fetching ${brand} data:`, error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchAppleData = async () => fetchMobilesData('apple');
  const fetchSamsungData = async () => fetchMobilesData('samsung');
  const fetchXiaomiData = async () => fetchMobilesData('xiaomi');
  const fetchOneplusData = async () => fetchMobilesData('oneplus');
  const fetchMotorolaData = async () => fetchMobilesData('motorola');
  const fetchGoogleData = async () => fetchMobilesData('google');

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

  useEffect(() => {
    fetchData();
    fetchAppleData();
    fetchSamsungData();
    fetchXiaomiData();
    fetchOneplusData();
    fetchMotorolaData();
    fetchGoogleData();
    fetchProfilesData();
    fetchSuperbaseProfiles();
  }, []);

  const value: ContentContextType = {
    authState,
    authDispatch,
    signIn,
    signOut,
    products,
    setProducts,
    compareProducts,
    setCompareProducts,
    dataFromBackend,
    setDataFromBackend,
    appleData,
    samsungData,
    fetchSamsungData,
    xiaomiData,
    fetchXiaomiData,
    oneplusData,
    fetchOneplusData,
    googleData,
    fetchGoogleData,
    motorolaData,
    fetchMotorolaData,
    loading,
    setLoading,
    fetchAppleData,
    checkboxData,
    setCheckboxData,
    mobilesData,
    fetchMobilesData,
    profilesData,
    fetchProfilesData,
    fetchProfileById,
    superProfiles,
    setSuperProfiles,
    fetchSuperbaseProfiles,
    colorScheme, 
    toggleColorScheme // Added to toggle color scheme
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