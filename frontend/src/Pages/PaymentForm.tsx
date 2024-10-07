import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Text, Box, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setErrorMessage(error.message || 'An error occurred');
        setProcessing(false);
      } else {
        // Handle payment success by sending the payment method to the backend
        console.log(paymentMethod);
        setPaymentSuccess(true);
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-80'>
      <Box mb="md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </Box>
      {errorMessage && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" mb="md">
          {errorMessage}
        </Alert>
      )}
      <Button type="submit" disabled={!stripe || processing} loading={processing} fullWidth>
        Pay
      </Button>
      {paymentSuccess && (
        <Alert title="Success" color="green" mt="md">
          Payment successful!
        </Alert>
      )}
    </form>
  );
};

export default PaymentForm;