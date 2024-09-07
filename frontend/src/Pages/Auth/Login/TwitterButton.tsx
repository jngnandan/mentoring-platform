// src/components/TwitterButton.tsx

import React from 'react';
import { Button, ButtonProps } from '@mantine/core';
import { TwitterIcon } from '@mantine/ds';
import { useNavigate } from 'react-router-dom';
import { signInWithTwitter } from '../../../firebase.js'; // Ensure this is correctly pointing to your firebase utility functions

export default function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleClick = async () => {
    try {
      await signInWithTwitter();
      navigate('/mentors'); // Redirect to the "mentors" page after successful sign-in
    } catch (error) {
      console.error("Error signing in with Twitter:", error);
      // Handle errors, show notifications, etc.
    }
  };

  return (
    <Button
      leftSection={<TwitterIcon style={{ width: '1rem', height: '1rem' }} color="#00ACEE" />}
      variant="default"
      onClick={handleClick}
      {...props}
    />
  );
}
