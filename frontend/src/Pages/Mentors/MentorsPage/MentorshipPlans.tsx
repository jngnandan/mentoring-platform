import React, { useState } from 'react';
import { Card, Text, Button, Stack, Group, Radio, Box, Modal, Select, TextInput, Checkbox } from '@mantine/core';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const MentorshipPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    contactNumber: '',
    chiefConcern: [],
  });

  const plans = [
    { name: 'Resume Feedback', duration: '30 minutes', price: 89 },
    { name: 'Portfolio Feedback', duration: '30 minutes', price: 89 },
    { name: 'Work Review', duration: '45 minutes', price: 119 },
    { name: 'Expert Consultation', duration: '60 minutes', price: 189 },
  ];

  const timeSlots = [
    { value: '07:30', label: '07:30 am' },
    { value: '08:30', label: '08:30 am' },
    { value: '09:30', label: '09:30 am' },
    { value: '10:30', label: '10:30 am' },
    { value: '11:30', label: '11:30 am' },
    { value: '12:30', label: '12:30 pm' },
  ];

  const concerns = [
    'Career Development',
    'Job Search Strategies',
    'Resume and Cover Letter Writing',
    'Interview Preparation',
    'Networking Skills',
    'Professional Growth',
    'Work-Life Balance',
    'Leadership Development',
    'Performance Management',
    'Career Transition',
    'Skill Enhancement',
    'Time Management',
    'Workplace Communication',
    'Team Collaboration',
    'Dealing with Workplace Challenges',
    'Career Path Exploration',
    'Personal Branding',
  ];

  const handleBookNow = () => {
    setIsModalOpen(true);
    setBookingStep(1);
  };

  const handleNext = () => {
    setBookingStep(2);
  };

  const handleSubmit = () => {
    console.log('Booking submitted:', { selectedPlan, selectedDate, selectedTime, userInfo });
    setIsModalOpen(false);
  };

  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-1">
      <Card withBorder p="lg">
        <Group position="apart" mb="md">
          <Text size="lg" weight={700}>Sessions</Text>
        </Group>
        <Stack spacing="xs">
          {plans.map((plan) => (
            <Box
              key={plan.name}
              className={`p-3 ${selectedPlan === plan.name ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-300'} border rounded-md`}
            >
              <Radio
                value={plan.name}
                label={
                  <div>
                    <Text weight={500}>{plan.name}</Text>
                    <Text size="sm" color="dimmed">
                      {plan.duration}, ${plan.price} per session
                    </Text>
                  </div>
                }
                checked={selectedPlan === plan.name}
                onChange={() => setSelectedPlan(plan.name)}
              />
            </Box>
          ))}
        </Stack>
        <Button fullWidth color="blue" size="sm" mt="md" onClick={handleBookNow}>
          Book now
        </Button>
      </Card>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={bookingStep === 1 ? "Book Your Appointment" : "Your Info"}
        size="xl"
      >
        {bookingStep === 1 && (
          <div className="mb-4">
            <Text className="text-lg font-semibold mb-2">Date & Time</Text>
            <Text className="text-sm text-gray-600 mb-4">Your appointment will be booked with Lizu Kaur</Text>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              inline
              minDate={new Date()}
              className="w-full"
            />
            <div className="mb-4">
              <Text weight={500} className="mb-2">Slot Availability</Text>
              <Select
                label="Time Zone"
                placeholder="Europe/London - BST (+01:00)"
                data={[{ value: 'Europe/London', label: 'Europe/London - BST (+01:00)' }]}
                className="mb-4"
              />
              <Text weight={500} className="mb-2">Morning</Text>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {timeSlots.slice(0, 5).map(slot => (
                  <Button
                    key={slot.value}
                    variant={selectedTime === slot.value ? 'filled' : 'outline'}
                    onClick={() => setSelectedTime(slot.value)}
                    className="w-full"
                  >
                    {slot.label}
                  </Button>
                ))}
              </div>
              <Text weight={500} className="mb-2">Afternoon</Text>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.slice(5).map(slot => (
                  <Button
                    key={slot.value}
                    variant={selectedTime === slot.value ? 'filled' : 'outline'}
                    onClick={() => setSelectedTime(slot.value)}
                    className="w-full"
                  >
                    {slot.label}
                  </Button>
                ))}
              </div>
            </div>
            <Button fullWidth onClick={handleNext} mt="xl">
              Next
            </Button>
          </div>
        )}
        
        {bookingStep === 2 && (
          <div className="mb-4">
            <Text size="lg" weight={700} mb="md">Your Info</Text>
            <Text mb="lg">Please enter your details</Text>
            <Stack spacing="md">
              <TextInput
                label="Name"
                placeholder="Name"
                required
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              />
              <TextInput
                label="Email"
                placeholder="Email"
                required
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              />
              <TextInput
                label="Contact Number"
                placeholder="Contact Number"
                required
                icon={<span>🇮🇳</span>} // Placeholder for Indian flag icon
                value={userInfo.contactNumber}
                onChange={(e) => setUserInfo({ ...userInfo, contactNumber: e.target.value })}
              />
              <Text weight={500} mb="xs">Chief Concern</Text>
              <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
                {concerns.map(concern => (
                  <Checkbox
                    key={concern}
                    label={concern}
                    checked={userInfo.chiefConcern.includes(concern)}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setUserInfo({ ...userInfo, chiefConcern: [...userInfo.chiefConcern, concern] });
                      } else {
                        setUserInfo({
                          ...userInfo,
                          chiefConcern: userInfo.chiefConcern.filter(c => c !== concern)
                        });
                      }
                    }}
                    mb="xs"
                  />
                ))}
              </Box>
              <TextInput
                label="Payment Amount"
                value={`${plans.find(p => p.name === selectedPlan)?.price || 0} INR`}
                readOnly
              />
              <Checkbox
                label={
                  <Text size="sm">
                    I have read and agree to your{' '}
                    <Text component="span" color="blue" inherit>
                      Terms and Conditions
                    </Text>{' '}
                    and the{' '}
                    <Text component="span" color="blue" inherit>
                      Consent Agreement
                    </Text>
                    .
                  </Text>
                }
              />
              <Button fullWidth color="blue" size="md" onClick={handleSubmit}>
                Pay and Schedule Appointment
              </Button>
            </Stack>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MentorshipPlans;