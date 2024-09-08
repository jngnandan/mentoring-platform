import React, { useState, useEffect } from 'react';
import { Button, Paper, Text, Group, CloseButton } from '@mantine/core';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomPosition, setBottomPosition] = useState(70);

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsentGiven');
    if (consentGiven === null) {
      setIsVisible(true);
    }

    const checkScrollButton = () => {
      const scrollButton = document.querySelector('.scroll-to-top-button');
      if (scrollButton) {
        const scrollButtonRect = scrollButton.getBoundingClientRect();
        setBottomPosition(Math.max(70, scrollButtonRect.height + 80));
      }
    };

    checkScrollButton();
    window.addEventListener('resize', checkScrollButton);
    return () => window.removeEventListener('resize', checkScrollButton);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsentGiven', 'true');
    setIsVisible(false);
  };

  const handleClose = () => {
    localStorage.setItem('cookieConsentGiven', 'false');
    setIsVisible(false);
  };

  const handlePreferences = () => {
    // Here you would typically open a modal or navigate to a page with more detailed cookie preferences
    console.log('Open cookie preferences');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Paper
      withBorder
      p="lg"
      radius="md"
      shadow="md"
      style={{
        position: 'fixed',
        bottom: bottomPosition,
        right: 20,
        maxWidth: 400,
        zIndex: 9999,
      }}
    >
      <Group justify="space-between" mb="xs">
        <Text fz="md" fw={500}>
          Allow cookies
        </Text>
        <CloseButton mr={-9} mt={-9} onClick={handleClose} />
      </Group>
      <Text c="dimmed" fz="xs">
        We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
        By clicking "Accept all", you consent to our use of cookies. You can manage your preferences by clicking "Cookie preferences".
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" size="xs" onClick={handlePreferences}>
          Decline
        </Button>
        <Button variant="outline" size="xs" onClick={handleAccept}>
          Accept all
        </Button>
      </Group>
    </Paper>
  );
}