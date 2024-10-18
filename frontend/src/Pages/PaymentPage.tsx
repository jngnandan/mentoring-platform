import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation for accessing state
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ContentContext } from '../context/ContentContext.tsx';
import PaymentForm from './PaymentForm.tsx';
import { Calendar, Clock, UserCircle, Mail, Phone } from 'lucide-react';
import { Card, Text, Group, Stack, SimpleGrid, Button, TextInput } from '@mantine/core';

const PaymentPage = () => {
  const location = useLocation(); // Get the location object
  const { selectedDate } = location.state || {}; // Extract selectedDate from state
  const [stripePromise, setStripePromise] = useState(null);
  const [error, setError] = useState(null);
  const { paymentOptions } = useContext(ContentContext);

  const selectedPaymentOption = paymentOptions?.[0];
  const { plan: selectedPlan, time: selectedTime, userInfo, price } = selectedPaymentOption || {};

  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  useEffect(() => {
    const initializeStripe = async () => {
      const key = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
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

  const formatDate = (date) => {
    if (!date) return 'Date not set';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate prices
  const subtotal = price ? parseFloat(price) : 0;
  const tax = subtotal * 0.20;
  const total = subtotal + tax;

  if (error) {
    return (
      <div className="p-4">
        <Card withBorder p="lg" radius="md">
          <Text c="red">{error}</Text>
        </Card>
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div className="p-4 mt-16">
        <Card withBorder p="lg" radius="md">
          <Group justify="center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
            <Text>Loading payment details...</Text>
          </Group>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <SimpleGrid cols={{ base: 1, md: 5 }} spacing="lg">
          {/* Left Column - Payment Form */}
          <Card withBorder radius="md" className="col-span-3">
            <Card.Section withBorder inheritPadding py="xs">
              <Text size="xl" fw={600}>Complete your purchase</Text>
            </Card.Section>

            <Card.Section withBorder inheritPadding py="md">
              <Text fw={500} mb="md">Billing Information</Text>
              <Stack gap="sm">
                <TextInput
                  label="Street Address"
                  placeholder="Enter street address"
                  value={billingAddress.street}
                  onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})}
                />
                <Group grow>
                  <TextInput
                    label="City"
                    placeholder="Enter city"
                    value={billingAddress.city}
                    onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                  />
                  <TextInput
                    label="State"
                    placeholder="Enter state"
                    value={billingAddress.state}
                    onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                  />
                </Group>
                <Group grow>
                  <TextInput
                    label="Post Code"
                    placeholder="Enter post code"
                    value={billingAddress.zipCode}
                    onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                  />
                  <TextInput
                    label="Country"
                    placeholder="Enter country"
                    value={billingAddress.country}
                    onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                  />
                </Group>
              </Stack>
            </Card.Section>

            <Card.Section inheritPadding py="md">
              <Text fw={500} mb="md">Payment Details</Text>
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            </Card.Section>
          </Card>

          {/* Right Column - Order Summary */}
          <Card withBorder radius="md" className="col-span-2" style={{ position: 'sticky', top: '1rem' }}>
            <Card.Section withBorder inheritPadding py="sm">
              <Text fw={500}>Order Summary</Text>
            </Card.Section>

            <Card.Section inheritPadding py="md">
              <Stack gap="xs">
                <Group gap="xs">
                  <Calendar size={16} className="text-gray-500" />
                  <Text size="sm">{formatDate(selectedDate)}</Text> {/* Use the passed selectedDate */}
                </Group>
                <Group gap="xs">
                  <Clock size={16} className="text-gray-500" />
                  <Text size="sm">{selectedTime || 'Time not set'}</Text>
                </Group>
                <Group gap="xs">
                  <UserCircle size={16} className="text-gray-500" />
                  <Text size="sm">{selectedPlan || 'Plan not selected'}</Text>
                </Group>
              </Stack>
            </Card.Section>

            {userInfo && (
              <Card.Section withBorder inheritPadding py="md">
                <Stack gap="xs">
                  <Group gap="xs">
                    <UserCircle size={16} className="text-gray-500" />
                    <Text size="sm">{userInfo.name || 'Name not set'}</Text>
                  </Group>
                  <Group gap="xs">
                    <Mail size={16} className="text-gray-500" />
                    <Text size="sm">{userInfo.email || 'Email not set'}</Text>
                  </Group>
                  <Group gap="xs">
                    <Phone size={16} className="text-gray-500" />
                    <Text size="sm">{userInfo.contactNumber || 'Contact not set'}</Text>
                  </Group>
                </Stack>
              </Card.Section>
            )}

            <Card.Section inheritPadding py="md">
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm">Subtotal</Text>
                  <Text size="sm">${subtotal.toFixed(2)}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Tax (20%)</Text>
                  <Text size="sm">${tax.toFixed(2)}</Text>
                </Group>
                <Group justify="space-between" pt="sm" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
                  <Text fw={500}>Total</Text>
                  <Text fw={500}>${total.toFixed(2)}</Text>
                </Group>
              </Stack>

              <Button fullWidth size="lg" mt="md">
                Place Order
              </Button>
            </Card.Section>
          </Card>
        </SimpleGrid>
      </div>
    </div>
  );
};

export default PaymentPage;
