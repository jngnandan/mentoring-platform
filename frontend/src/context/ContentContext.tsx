import React, { createContext, useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

const ContentContext = createContext();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


const ContentProvider = ({ children }) => {
  const [products, setProducts] = useState('super');
  const [compareProducts, setCompareProducts] = useState('Wow');
  const [dataFromBackend, setDataFromBackend] = useState([]);
  const [appleData, setAppleData] = useState([]);
  const [samsungData, setSamsungData] = useState([]);
  const [xiaomiData, setXiaomiData] = useState([]);
  const [oneplusData, setOneplusData] = useState([]);
  const [motorolaData, setMotorolaData] = useState([]);
  const [googleData, setGoogleData] = useState([]);
  const [mobilesData, setMobilesData] = useState([]);
  const [checkboxData, setCheckboxData] = useState(['cool']);
  const [profilesData, setProfilesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [superProfiles, setSuperProfiles] = useState([])
  
  const backendPort = 3002;
  const domainName = "localhost";

  const fetchSuperbaseProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles') // Replace with your Supabase table name
        .select('*');
      if (error) {
        throw error;
      }
      setSuperProfiles(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSuperbaseProfiles();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://${domainName}:${backendPort}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setDataFromBackend(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const fetchMobilesData = async (brand) => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/${brand}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setMobilesData(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error(`Error fetching ${brand} data:`, error);
      setLoading(false);
      return [];
    }
  };

  const fetchAppleData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/apple`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setAppleData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Apple data:', error);
      setLoading(false);
    }
  };

  const fetchSamsungData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/samsung`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setSamsungData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Samsung data:', error);
      setLoading(false);
    }
  };

  const fetchXiaomiData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/xiaomi`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setXiaomiData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Xiaomi data:', error);
      setLoading(false);
    }
  };

  const fetchOneplusData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/oneplus`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setOneplusData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Oneplus data:', error);
      setLoading(false);
    }
  };

  const fetchMotorolaData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/motorola`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setMotorolaData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Motorola data:', error);
      setLoading(false);
    }
  };

  const fetchGoogleData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/google`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setGoogleData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Google data:', error);
      setLoading(false);
    }
  };

  const fetchProfilesData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/profiles`);
      if (!response.ok) {
        throw new Error('Failed to fetch profiles data');
      }
      const data = await response.json();
      setProfilesData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profiles data:', error);
      setLoading(false);
    }
  };

  const fetchProfileById = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/profiles/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data = await response.json();
      setProfilesData([data]); // Replace or update the existing profile
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching profile with ID ${id}:`, error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProfilesData();
  }, []);

  return (
    <ContentContext.Provider value={{ 
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
      fetchGoogleData, 
      googleData, 
      fetchMotorolaData, 
      motorolaData, 
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
      fetchSuperbaseProfiles
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContext, ContentProvider };
