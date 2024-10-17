import React, { useContext, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ContentContext } from '../context/ContentContext.tsx';
import PaymentForm from './PaymentForm.tsx';
import { Calendar, Clock, UserCircle, Mail, Phone } from 'lucide-react';

const PaymentPage = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [error, setError] = useState(null);
  // const { paymentOptions } = useContext(ContentContext);
  const { paymentOptions } = useContext(ContentContext);
  console.log('Context paymentOptions:', paymentOptions);

  
  // Log the payment options to ensure data is coming through
  // console.log('Context paymentOptions:', paymentOptions);

  // Safely access the first option from the paymentOptions array
  const selectedPaymentOption = paymentOptions?.[0];
  
  // Destructure the selected option, handling undefined values
  const { plan: selectedPlan, date: selectedDate, time: selectedTime, userInfo } = selectedPaymentOption || {};

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-3"></div>
            <span>Loading payment details...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Left Column - Payment Form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-6">Complete your purchase</h2>
              
              {/* Billing Information Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Billing Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter street address"
                      value={billingAddress.street}
                      onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter city"
                        value={billingAddress.city}
                        onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter state"
                        value={billingAddress.state}
                        onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter ZIP code"
                        value={billingAddress.zipCode}
                        onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter country"
                        value={billingAddress.country}
                        onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form Section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Payment Details</h3>
                <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              
              {/* Booking Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{formatDate(selectedDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{selectedTime || 'Time not set'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <UserCircle className="w-4 h-4 text-gray-500" />
                  <span>{selectedPlan || 'Plan not selected'}</span>
                </div>
              </div>

              {/* User Info */}
              {userInfo && (
                <div className="space-y-3 mb-6 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <UserCircle className="w-4 h-4 text-gray-500" />
                    <span>{userInfo.name || 'Name not set'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{userInfo.email || 'Email not set'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{userInfo.contactNumber || 'Contact not set'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
