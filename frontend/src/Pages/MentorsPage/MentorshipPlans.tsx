import React, { useContext, useEffect, useState } from 'react';
import { Card, Text, Button, Stack, Group, Radio, Box, Modal, Select, TextInput, Checkbox } from '@mantine/core';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import { ContentContext, ContentProvider } from '../../context/ContentContext.tsx';
import { useNavigate } from 'react-router-dom';

import { IconCalendarDue, IconClock, IconUser, IconTopologyStar } from '@tabler/icons-react';
import { Clock, User, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar } from '@mantine/dates';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';

const MentorshipPlans = ({data}) => {

  console.log('data here', data)

  const navigate = useNavigate(); // Initialize useNavigate

  const {setPaymentOptions} = useContext(ContentContext);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State for the selected date
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    contactNumber: '',
    chiefConcern: '', // Changed to string for the text area
  });

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when date changes
  };

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

  useEffect(() => {
    if (data && data.availability) {
      const { weekly, specificDates } = data.availability;
  
      const allTimeSlots = [];
  
      // Add weekly slots
      Object.entries(weekly).forEach(([day, { times, enabled }]) => {
        if (enabled && times) {
          times.forEach((time) => {
            allTimeSlots.push({
              day,
              startTime: time.start,
              endTime: time.end,
              label: `${time.start} - ${time.end}`
            });
          });
        }
      });
  
      // Add specific date slots
      specificDates.forEach(({ date, start, end }) => {
        allTimeSlots.push({
          date: new Date(date),
          startTime: start,
          endTime: end,
          label: `${start} - ${end}`
        });
      });
  
      setAvailableTimeSlots(allTimeSlots);
    }
  }, [data]);

  const handleBookNow = () => {
    setIsModalOpen(true);
    setBookingStep(1);
  };

  const handleNext = () => {
    setBookingStep(2);
  };

  const handleBack = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1); // Go back to the previous step
    }
  };

  const handleSubmit = () => {
    const selectedPlanDetails = plans.find(plan => plan.name === selectedPlan);
    const price = selectedPlanDetails?.price || 0;
    const tax = price * 0.2; // 20% tax
    const total = price + tax;

    const newPaymentOption = {
      plan: selectedPlan,
      date: selectedDate,
      time: selectedTime,
      userInfo: userInfo,
      price: price,
      tax: tax,
      total: total,
    };

    setPaymentOptions(prevOptions => [
      ...prevOptions, 
      newPaymentOption
    ]);

    console.log('Booking submitted:', newPaymentOption);

    setIsModalOpen(false);
    navigate('/mentors/payment', { state: { paymentDetails: newPaymentOption } });
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
              className={`p-3 ${selectedPlan === plan.name ? 'bg-black-50 border-blue-500' : 'bg-black-50 border-gray-300'} border rounded-md`}
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
        size="xl"
        title={
          <Text className="text-xl font-bold text-gray-800">
            {bookingStep === 1 ? "Book Your Appointment" : "Your Information"}
          </Text>
        }
      >
        <div className="p-1 py-6">
          {bookingStep === 1 && (
            <div className="space-y-6">
              <Card withBorder radius="sm">
                {/* Date Selection Section */}
                <Card.Section withBorder inheritPadding py="xl">
                  <Text fw={600} className="text-md font-semibold text-gray-600 mb-4 flex items-center">
                    <IconCalendarDue className="mr-2" /> Select Date
                  </Text>
                  <div className="w-full mt-2">
                    <Calendar
                      value={selectedDate}
                      onChange={handleSelect}
                      minDate={new Date()}
                      className="w-full"
                      getDayProps={(date) => ({
                        selected: dayjs(date).isSame(selectedDate, 'date'),
                        onClick: () => handleSelect(date),
                      })}
                    />
                  </div>
                </Card.Section>

                {/* Time Selection Section */}
                <Card.Section withBorder inheritPadding py="xl">
                  <Text fw={600} className="text-md font-semibold text-gray-600 mb-4 flex items-center">
                    <IconClock className="mr-2" /> Select Time
                  </Text>
                  <div className="space-y-4">
                    <Select
                      label="Time Zone"
                      placeholder="Europe/London - BST (+01:00)"
                      data={[{ value: 'Europe/London', label: 'Europe/London - BST (+01:00)' }]}
                      className="my-2"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      {availableTimeSlots
                        .filter(slot => !slot.date || dayjs(slot.date).isSame(selectedDate, 'date')) // Ensure slots are filtered correctly
                        .map((slot) => (
                          <Button
                            key={slot.startTime} // Ensure each key is unique
                            variant={selectedTime === slot.startTime ? 'filled' : 'outline'} // Change button style based on selection
                            onClick={() => setSelectedTime(slot.startTime)} // Update selected time
                            className="w-full py-2"
                          >
                            {slot.label}
                          </Button>
                        ))}
                    </div>
                  </div>
                </Card.Section>
              </Card>
              <Button onClick={handleNext} className="w-full">
                Next Step
              </Button>
            </div>
          )}

{bookingStep === 2 && (
          <div className="space-y-6">
            <Card withBorder radius="sm">
              {/* Personal Information Section */}
              <Card.Section withBorder inheritPadding py="xl">
                {/* <Text fw={500} className="text-md font-semibold text-gray-700 mb-4">
                  Personal Details
                </Text> */}
                <Text fw={600} className="text-md font-semibold text-gray-600 mb-4 flex flex-row justify-start items-center">
                  <IconUser className="mr-2" /> Personal Details
                </Text>
                
                <div className="space-y-4 mt-2">
                  <TextInput
                    icon={<User size={18} />}
                    label="Name"
                    placeholder="Enter your full name"
                    required
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  />
                  <TextInput
                    icon={<Mail size={18} />}
                    label="Email"
                    placeholder="Enter your email address"
                    required
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                  <TextInput
                    icon={<Phone size={18} />}
                    label="Contact Number"
                    placeholder="Enter your phone number"
                    required
                    value={userInfo.contactNumber}
                    onChange={(e) => setUserInfo({ ...userInfo, contactNumber: e.target.value })}
                  />
                </div>
              </Card.Section>

              {/* Appointment Details Section */}
              <Card.Section withBorder inheritPadding py="xl">
              <Text fw={600} className="text-md font-semibold text-gray-600 mb-1 flex flex-row justify-start items-center">
                  <IconTopologyStar className="mr-2" /> Concern
                </Text>
                <div className="space-y-4 mt-3">
                  
                    <div className="grid grid-cols-2 gap-2">
                      {concerns.map((concern) => (
                        <Checkbox
                          key={concern}
                          label={concern}
                          checked={userInfo.chiefConcern.includes(concern)}
                          // onChange={(e) => {
                          //   if (e.currentTarget.checked) {
                          //     setUserInfo({ ...userInfo, chiefConcern: [...userInfo.chiefConcern, concern] });
                          //   } else {
                          //     setUserInfo({
                          //       ...userInfo,
                          //       chiefConcern: userInfo.chiefConcern.filter((c) => c !== concern),
                          //     });
                          //   }
                          // }}
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
                        />
                      ))}
                    </div>

                  <TextInput
                    label="Payment Amount"
                    value={`${plans.find(p => p.name === selectedPlan)?.price || 0} USD`}                    readOnly
                    className="bg-gray-100"
                  />
                </div>
              </Card.Section>

              {/* Terms and Conditions Section */}
              <Card.Section inheritPadding py="xl">
                <Checkbox
                  label={
                    <Text size="sm" c="dimmed">
                      I have read and agree to the{' '}
                      <Text span inherit c="var(--mantine-color-anchor)">
                        Terms and Conditions
                      </Text>{' '}
                      and the{' '}
                      <Text span inherit c="var(--mantine-color-anchor)">
                        Consent Agreement
                      </Text>
                      .
                    </Text>
                  }
                />
              </Card.Section>
            </Card>

            <div className="flex space-x-4">
              <Button
                onClick={handleBack}
                variant="outline"
                className="w-1/2 py-3 rounded-lg transition duration-300"
              >
                <ChevronLeft size={18} className="mr-2" /> Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
              >
                Complete Booking <ChevronRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        )}
        </div>
      </Modal>
    </div>
  );
};

export default MentorshipPlans;
