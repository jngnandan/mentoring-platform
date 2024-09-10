import React, { useState } from 'react';
import { Card, Text, Group, Button, Collapse, ActionIcon, Tabs } from '@mantine/core';
import { IconCalendar, IconClock, IconChevronRight, IconChevronDown } from '@tabler/icons-react';

function BookingCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder my={4}>
      <Group position="apart" mb="xs">
        <div>
          <Text weight={500}>John Greesham</Text>
          <Text size="sm" color="dimmed">Resume review</Text>
        </div>
        <ActionIcon 
          variant="subtle" 
          onClick={() => setExpanded(!expanded)}
          style={{ transform: expanded ? 'rotate(90deg)' : 'none' }}
          transition="transform 150ms ease"
        >
          <IconChevronRight size={16} />
        </ActionIcon>
      </Group>
      <Group spacing="xl">
        <Group spacing="xs">
          <IconCalendar size={16} />
          <Text size="sm">10 Sep 2024</Text>
        </Group>
        <Group spacing="xs">
          <IconClock size={16} />
          <Text size="sm">19:30 - 20:30</Text>
        </Group>
      </Group>
      <Collapse in={expanded}>
        <Text mt="md">
          Additional details about the booking go here. This could include the meeting link,
          preparation instructions, or any other relevant information for the resume review session.
        </Text>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          Join Meeting
        </Button>
      </Collapse>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {/* <Text size="xl" weight={700} mb="md">Dashboard</Text> */}
      <Tabs defaultValue="bookings">
        <Tabs.List>
          <Tabs.Tab value="bookings">Bookings</Tabs.Tab>
          <Tabs.Tab value="plans">Plans</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="bookings" pt="xs">
          <BookingCard />
        </Tabs.Panel>

        <Tabs.Panel value="plans" pt="xs">
          <Text>Plans content goes here.</Text>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}