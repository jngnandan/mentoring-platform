import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Box, Alert } from '@mantine/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm.tsx';

const PaymentPage = () => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const key = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
      console.log("Stripe Key:", key); // Remove this in production

      if (!key) {
        setError("Stripe publishable key is not set. Please check your environment variables.");
        return;
      }

      try {
        const stripe = await loadStripe(key);
        setStripePromise(Promise.resolve(stripe));
      } catch (err) {
        console.error("Error loading Stripe:", err);
        setError("Failed to initialize Stripe. Please try again later.");
      }
    };

    initializeStripe();
  }, []);

  if (error) {
    return (
      <Container size="sm">
        <Box my="xl">
          <Alert color="red" title="Error">
            {error}
          </Alert>
        </Box>
      </Container>
    );
  }

  if (!stripePromise) {
    return (
      <Container size="sm">
        <Box my="xl">
          <Text>Loading payment system...</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container size="sm">
      <Box my="xl">
        <Title order={2} mb="md">Payment</Title>
        <Text mb="lg">Complete your payment to schedule an appointment with your mentor.</Text>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Box>
    </Container>
  );
};

export default PaymentPage;