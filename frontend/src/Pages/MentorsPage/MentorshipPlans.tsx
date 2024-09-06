import React, { useState } from 'react';
import { Card, Text, Button, Stack, Group, Radio, Box } from '@mantine/core';

const MentorshipPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const plans = [
    { name: 'Resume Feedback', duration: '30 minutes', price: 89 },
    { name: 'Portfolio Feedback', duration: '30 minutes', price: 89 },
    { name: 'Work Review', duration: '45 minutes', price: 119 },
    { name: 'Expert Consultation', duration: '60 minutes', price: 189 },
  ];

  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-1">
      <Card withBorder p="lg">
        <Group position="apart" mb="md">
          <Text size="lg" weight={700}>Sessions</Text>
          {/* <Text size="lg" weight={700} color="dimmed">Sessions</Text> */}
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
        <Button fullWidth color="blue" size="sm" mt="md">
          Book now
        </Button>
        {/* <Button fullWidth variant="subtle" color="teal" size="md" mt="xs">
          View all sessions
        </Button> */}
      </Card>
    </div>
  );
};

export default MentorshipPlans;