import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, Paper, Button, LoadingOverlay } from '@mantine/core';

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
    <form onSubmit={handleSubmit}>
      <Paper p="md" radius="md" pos="relative">
        <LoadingOverlay 
          visible={processing} 
          zIndex={1000} 
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        
        {/* Card Element Container */}
        <Paper withBorder p="md" radius="md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                  iconColor: '#666EE8',
                },
                invalid: {
                  color: '#9e2146',
                  iconColor: '#FFC7EE',
                },
              },
            }}
          />
        </Paper>

        {/* Error Message */}
        {errorMessage && (
          <Alert
            mt="md"
            variant="light"
            color="red"
            title="Payment Error"
            icon={<AlertCircle size={18} />}
          >
            {errorMessage}
          </Alert>
        )}

        {/* Success Message */}
        {paymentSuccess && (
          <Alert
            mt="md"
            variant="light"
            color="green"
            title="Payment Successful"
            icon={<CheckCircle2 size={18} />}
          >
            Your payment has been processed successfully.
          </Alert>
        )}

        {/* Submit Button */}
        {/* <Button
          type="submit"
          fullWidth
          size="md"
          mt="md"
          disabled={!stripe || processing}
          loading={processing}
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </Button> */}
      </Paper>
    </form>
  );
};

export default PaymentForm;