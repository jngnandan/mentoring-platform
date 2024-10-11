import React, { useState, useEffect } from 'react';
import { Card, Text, Image, Button } from '@mantine/core';
import { IconBrandGoogleFilled, IconCheck, IconX } from '@tabler/icons-react';
import { gapi } from 'gapi-script';

function ExtensionsConnections() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load the Google API Client Library
  useEffect(() => {
    const loadGapi = () => {
      gapi.load('client:auth2', () => {
        gapi.auth2.init({
          client_id: '910214703887-qvvj07143j42m2pijkt2v2f9dvsvkubj.apps.googleusercontent.com', // Replace with your actual Client ID
          scope: 'https://www.googleapis.com/auth/calendar',
        }).then(() => {
          const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
          setIsConnected(isSignedIn);
        });
      });
    };

    loadGapi();
  }, []);

  const handleGoogleCalendarConnection = async () => {
    setIsLoading(true);
    const authInstance = gapi.auth2.getAuthInstance();

    try {
      if (isConnected) {
        // Disconnect logic
        await authInstance.signOut();
        localStorage.removeItem('googleCalendarToken');
        setIsConnected(false);
      } else {
        // Connect logic
        const response = await authInstance.signIn();
        const token = response.getAuthResponse().access_token;

        localStorage.setItem('googleCalendarToken', token);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Error connecting to Google Calendar:', error);
      // Handle error (show a notification to the user, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="m-4 my-6 flex-grow" mt={56}>
      <Text size="xl" weight={500} mb="md">Dashboard</Text>
      <div className="grid grid-cols-2 gap-4 justify-items-center">
        
        {/* Google Calendar Section */}
        <Card.Section withBorder className="rounded flex flex-col items-center p-4 w-full">
          <Image
            radius="sm"
            src="https://res.cloudinary.com/dgcfly5zo/image/upload/v1728576421/nguyvvd2psjjrrtrdptz.png"
            h={100}
            w="auto"
            fit="contain"
          />
          <Button 
            variant={isConnected ? "filled" : "outline"}
            color={isConnected ? "green" : "blue"}
            leftSection={isConnected ? <IconCheck size={18} /> : <IconBrandGoogleFilled size={18} />}
            className="mt-4 mx-auto"
            onClick={handleGoogleCalendarConnection}
            loading={isLoading}
          >
            {isConnected ? "Connected" : "Connect Google Calendar"}
          </Button>
        </Card.Section>
        
        {/* Another Section Placeholder (unchanged) */}
        <Card.Section withBorder className="rounded flex flex-col items-center p-4 w-full">
          <Image
            radius="sm"
            src="https://res.cloudinary.com/dgcfly5zo/image/upload/v1728576421/nguyvvd2psjjrrtrdptz.png"
            h={100}
            w="auto"
            fit="contain"
          />
          <Button 
            variant="outline"
            leftSection={<IconBrandGoogleFilled size={18} />}
            className="mt-4 mx-auto"
          >
            Google Calendar
          </Button>
        </Card.Section>

      </div>
    </Card>
  );
}

export default ExtensionsConnections;