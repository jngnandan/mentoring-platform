import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from './firebase'; // Make sure to import your Firebase configuration
import { Loader } from '@mantine/core'; // Import Mantine Loader

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuth(!!user); // Set isAuth to true if user exists, else false

      // Delay setting loading to false for half a second
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => {
        clearTimeout(timeout); // Clear the timeout if the component unmounts
      };
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size="md" stroke={1.5} /> {/* Use Mantine Loader */}
      </div>
    ); // Show Mantine loader while checking authentication
  }

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Render the children if the user is authenticated
};

export default ProtectedRoute;
