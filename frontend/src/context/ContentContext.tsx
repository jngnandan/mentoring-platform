import React, { createContext, useState, useEffect } from "react";

const ContentContext = createContext();

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


  const [checkboxData, setCheckboxData] = useState(['cool',])


  const [loading, setLoading] = useState(true);
  const backendPort = 3002;
  const domainName = "localhost";


  const fetchData = async () => {
    try {
      const response = await fetch(`http://${domainName}:${backendPort}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setDataFromBackend(data);
      setLoading(false);
      // setFilteredData(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchMobilesData = async (brand) => {
    try {
      setLoading(true);
      console.log('Fetching data for:', brand);
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/${brand}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setLoading(false);
      setMobilesData(data);
      console.log('Received data:', data); // Log the received data for verification
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
      // setDataFromBackend(data);
      setLoading(false);
      // setFilteredData(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchSamsungData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/samsung`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const newdata = await response.json();
      setSamsungData(newdata);
      // setDataFromBackend(data);
      setLoading(false);
      // setFilteredData(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchXiaomiData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/xiaomi`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const newdata = await response.json();
      setXiaomiData(newdata);
      setLoading(false);
      console.log('Xiaomi Data:', newdata); // Uncomment for debugging
    } catch (error) {
      console.error('Error fetching Xiaomi data:', error);
      setLoading(false); // Ensure setLoading is updated in the error case
      // Handle the error state or retries accordingly
      // For example, setXiaomiDataError(true);
    }
  };

  const fetchOneplusData = async () => {
    try {
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/oneplus`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const OneplusData = await response.json();
      setOneplusData(OneplusData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchMotorolaData = async () => {
    try {
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/motorola`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const motorolaDevices = await response.json();
      setMotorolaData(motorolaDevices);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchGoogleData = async () => {
    try {
      const response = await fetch(`http://${domainName}:${backendPort}/mobiles/google`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const gooleDevices = await response.json();
      setGoogleData(gooleDevices);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (dataFromBackend.length === 0) {
      fetchData();
    }
  }, [dataFromBackend]);

  console.log(checkboxData)

  return (
    <ContentContext.Provider value={{ products, setProducts, compareProducts, setCompareProducts, dataFromBackend, setDataFromBackend, appleData, samsungData, fetchSamsungData, xiaomiData, fetchXiaomiData, oneplusData, fetchOneplusData, fetchGoogleData, googleData, fetchMotorolaData, motorolaData, loading, setLoading, fetchAppleData, checkboxData, setCheckboxData, mobilesData, fetchMobilesData }}>
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContext, ContentProvider };
