import React from 'react';
import { Container, Paper, Text, Group, SimpleGrid, Card, Title, Avatar } from '@mantine/core';
import { IconUser, IconUsers, IconNotes } from '@tabler/icons-react';
import { AreaChart, BarChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const bookingsData = [
  { name: 'Jul 1', bookings: 2 },
  { name: 'Today', bookings: 5 },
];

const minutesData = [
  { name: 'Jul 1', minutes: 1000 },
  { name: 'Mid', minutes: 20000 },
  { name: 'Today', minutes: 3456 },
];

const rsvpsData = [
  { name: 'Jul 1', rsvps: 20 },
  { name: 'Mid', rsvps: 50 },
  { name: 'Today', rsvps: 30 },
];

const reviewsData = [
  { name: 'Jul 1', reviews: 1 },
  { name: 'Mid', reviews: 2 },
  { name: 'Today', reviews: 3 },
];

const HomeDashboard = () => {
  return (
    <Container size="lg" className='my-12 rounded-md'>
      <Paper shadow="xs" p="md">
        <Group position="apart" mb="xl">
          <Group>
            <Avatar color="blue" radius="xl">JB</Avatar>
            <div>
              <Text size="xl" weight={700}>Hello, James Baduor</Text>
              <Text size="sm" color="dimmed">jmsbaduor@gmail.com</Text>
            </div>
          </Group>
          <Text size="sm" color="teal">Verified mentor</Text>
        </Group>

        <Title order={4} mb="md">Quick actions</Title>
        <SimpleGrid cols={3} mb="xl">
          <Card shadow="sm" p="lg">
            <Group>
              <IconUser size={24} />
              <Text>View my profile</Text>
            </Group>
            <Text size="xs" color="dimmed">See your public profile</Text>
          </Card>
          <Card shadow="sm" p="lg">
            <Group>
              <IconUsers size={24} />
              <Text>Create a session</Text>
            </Group>
            <Text size="xs" color="dimmed">Group mentoring session</Text>
          </Card>
          <Card shadow="sm" p="lg">
            <Group>
              <IconNotes size={24} />
              <Text>Send Notes</Text>
            </Group>
            <Text size="xs" color="dimmed">Send notes to your mentees</Text>
          </Card>
        </SimpleGrid>

        <Title order={4} mb="md">Your impact at a glance</Title>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Card shadow="sm" p="lg">
            <Group position="apart" mb="xs">
              <Text size="xl" weight={700}>80</Text>
              <Text weight={500}>1:1 Bookings</Text>
            </Group>
            <Text size="sm" color="dimmed" mb="md">This month: 05</Text>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={bookingsData}>
                <Bar dataKey="bookings" fill="#8884d8" />
                <XAxis dataKey="name" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card shadow="sm" p="lg">
            <Group position="apart" mb="xs">
              <Text size="xl" weight={700} color="orange">23,4561</Text>
              <Text weight={500}>Minutes mentored</Text>
            </Group>
            <Text size="sm" color="dimmed" mb="md">This month: 3,456</Text>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={minutesData}>
                <Area type="monotone" dataKey="minutes" stroke="#ffa726" fill="#ffa726" />
                <XAxis dataKey="name" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card shadow="sm" p="lg">
            <Group position="apart" mb="xs">
              <Text size="xl" weight={700} color="red">890</Text>
              <Text weight={500}>Session RSVPs</Text>
            </Group>
            <Text size="sm" color="dimmed" mb="md">This month: 230</Text>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={rsvpsData}>
                <Bar dataKey="rsvps" fill="#ff6b6b" />
                <XAxis dataKey="name" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card shadow="sm" p="lg">
            <Group position="apart" mb="xs">
              <Text size="xl" weight={700} color="blue">34</Text>
              <Text weight={500}>Reviews</Text>
            </Group>
            <Text size="sm" color="dimmed" mb="md">This month: 03</Text>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={reviewsData}>
                <Bar dataKey="reviews" fill="#4dabf7" />
                <XAxis dataKey="name" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </SimpleGrid>
      </Paper>
    </Container>
  );
};

export default HomeDashboard;