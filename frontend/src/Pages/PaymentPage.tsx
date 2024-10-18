import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ContentContext } from '../context/ContentContext.tsx';
import PaymentForm from './PaymentForm.tsx';
import { Calendar, Clock, UserCircle, Mail, Phone, CheckCircle } from 'lucide-react';
import { Card, Text, Group, Stack, SimpleGrid, Button, TextInput } from '@mantine/core';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

const updateBookingInProfile = async (profileId, bookingDetails) => {
  try {
    console.log('Updating profile with ID:', profileId, 'and booking details:', bookingDetails);
    const { data, error } = await supabase
      .from('profiles')
      .update({ bookings: bookingDetails })
      .eq('id', profileId);

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Error updating profile bookings: ${error.message}`);
    }

    console.log('Profile updated:', data);
    return data;
  } catch (err) {
    console.error('Failed to update booking in profile:', err);
    throw err;
  }
};


// Confirmation Screen Component
const ConfirmationScreen = ({ bookingDetails }) => {
  const navigate = useNavigate();
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-8 mt-16">
      <div className="max-w-2xl mx-auto px-4">
        <Card withBorder radius="md" className="text-center">
          <Card.Section inheritPadding py="xl">
            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <Text size="xl" fw={600} className="mb-4">
              Thank You! Your Booking is Confirmed
            </Text>
            <Text size="md" c="dimmed" className="mb-6">
              We've sent a confirmation email with all the details to your inbox
            </Text>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <Stack gap="md">
                <Group gap="xs" justify="center">
                  <Calendar size={20} className="text-gray-500" />
                  <Text>{formatDate(bookingDetails?.date)}</Text>
                </Group>
                <Group gap="xs" justify="center">
                  <Clock size={20} className="text-gray-500" />
                  <Text>{bookingDetails?.time}</Text>
                </Group>
                <Group gap="xs" justify="center">
                  <UserCircle size={20} className="text-gray-500" />
                  <Text>{bookingDetails?.plan}</Text>
                </Group>
                {bookingDetails?.userInfo?.email && (
                  <Group gap="xs" justify="center">
                    <Mail size={20} className="text-gray-500" />
                    <Text>{bookingDetails.userInfo.email}</Text>
                  </Group>
                )}
              </Stack>
            </div>

            <Stack gap="md">
              <Button 
                fullWidth 
                variant="outline"
                onClick={() => navigate('/profile')}
              >
                View Booking Details
              </Button>
              <Button 
                fullWidth
                variant="subtle"
                onClick={() => navigate('/')}
              >
                Return to Home
              </Button>
            </Stack>
          </Card.Section>
        </Card>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentDetails } = location.state || {};
  const [stripePromise, setStripePromise] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { paymentOptions } = useContext(ContentContext);

  const selectedPaymentOption = paymentDetails || paymentOptions?.[0];
  const { 
    plan: selectedPlan, 
    time: selectedTime, 
    date: selectedDate,
    userInfo, 
    price: subtotal,
    tax,
    total
  } = selectedPaymentOption || {};

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

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      // Simulate the Stripe payment process (replace with actual logic)
      const paymentSuccess = true; // Replace this with actual Stripe payment intent confirmation logic
  
      if (!paymentSuccess) {
        throw new Error('Payment failed');
      }
  
      // If payment is successful, update the profile booking
      if (userInfo?.id) {
        const bookingDetails = {
          plan: selectedPlan,
          date: selectedDate,
          time: selectedTime,
          total: total,
          billingAddress,
          status: 'confirmed',
          confirmedAt: new Date().toISOString()
        };
  
        await updateBookingInProfile(userInfo.id, bookingDetails);
      }
  
      // Show confirmation screen
      setIsConfirmed(true);
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  // If confirmed, show confirmation screen
  if (isConfirmed) {
    return <ConfirmationScreen bookingDetails={selectedPaymentOption} />;
  }

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
    <div className="min-h-screen py-8 mt-16">
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
                  required
                />
                <Group grow>
                  <TextInput
                    label="City"
                    placeholder="Enter city"
                    value={billingAddress.city}
                    onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                    required
                  />
                  <TextInput
                    label="State"
                    placeholder="Enter state"
                    value={billingAddress.state}
                    onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                    required
                  />
                </Group>
                <Group grow>
                  <TextInput
                    label="Post Code"
                    placeholder="Enter post code"
                    value={billingAddress.zipCode}
                    onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                    required
                  />
                  <TextInput
                    label="Country"
                    placeholder="Enter country"
                    value={billingAddress.country}
                    onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                    required
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
                  <Text size="sm">{formatDate(selectedDate)}</Text>
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
                  <Text size="sm">${subtotal?.toFixed(2) || '0.00'}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Tax (20%)</Text>
                  <Text size="sm">${tax?.toFixed(2) || '0.00'}</Text>
                </Group>
                <Group justify="space-between" pt="sm" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
                  <Text fw={500}>Total</Text>
                  <Text fw={500}>${total?.toFixed(2) || '0.00'}</Text>
                </Group>
              </Stack>

              <Button 
                fullWidth 
                size="lg" 
                mt="md"
                loading={isLoading}
                onClick={handlePlaceOrder}
                // disabled={!billingAddress.street || !billingAddress.city || !billingAddress.state || !billingAddress.zipCode || !billingAddress.country}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </Button>
            </Card.Section>
          </Card>
        </SimpleGrid>
      </div>
    </div>
  );
};

export default PaymentPage;