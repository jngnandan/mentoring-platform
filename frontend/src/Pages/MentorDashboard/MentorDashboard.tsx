import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem, Text, Card, Tabs } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import BookingCard from './Cards/BookingCard.tsx';
import {CalendarWithAvailability} from './Cards/AvailabilitySettings.tsx'; // Import the new component
import AccountForm from './Cards/AccountForm.tsx'

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={`
          w-[50px] h-[50px] rounded-md flex items-center justify-center
          text-gray-700 dark:text-gray-300
          hover:bg-gray-100 dark:hover:bg-gray-700
          ${active ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200' : ''}
        `}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconUser, label: 'Account' },
  { icon: IconCalendarStats, label: 'Availability' },
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];

function TabContent({ label }: { label: string }) {
  if (label === 'Dashboard') {
    return (
      <Card shadow="sm" p="lg" radius="md" withBorder className="m-4 flex-grow">
        <Text size="xl" weight={700} mb="md">Dashboard</Text>
        <Tabs defaultValue="bookings">
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
  if (label === 'Availability') {
    return <CalendarWithAvailability />;
  }
  if (label === 'Account') {
    return (
      // <Card shadow="sm" p="lg" radius="md" withBorder className="m-4 flex-grow">
        // <Text size="xl" weight={700} mb="md">Account</Text>
        <AccountForm/>
      // </Card>
    );
  }
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="m-4 flex-grow" mt={56}>
      <Text size="xl" weight={500} mb="md">{label}</Text>
      <Text>This is the content for the {label} tab.</Text>
    </Card>
  );
}


export default function MentorDashboard() {
  const [active, setActive] = useState(1); // Set default to Dashboard

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <div className="flex h-screen">
      <nav className="w-[80px] p-4 flex flex-col border-r border-gray-200 dark:border-gray-700">
        <Center>
          <MantineLogo type="mark" size={30} />
        </Center>
        <div className="flex-1 mt-[50px]">
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>
        <Stack justify="center" gap={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </nav>
      <main className="flex-grow bg-gray-100 dark:bg-gray-900 overflow-auto p-4">
        <TabContent label={mockdata[active].label} />
      </main>
    </div>
  );
}