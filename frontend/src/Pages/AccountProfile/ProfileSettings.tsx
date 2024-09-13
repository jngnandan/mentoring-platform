import React, { useState, useEffect } from 'react';
import { Tabs, rem, Text, Paper, TextInput, Select, Textarea, Button, Image, Group, Alert, Radio, Checkbox, Container, Skeleton } from '@mantine/core';
import { IconInfoCircle, IconUpload, IconChevronDown, IconUserCircle, IconCreditCard, IconCoin, IconLock, IconCalendar, IconChevronRight, IconBoxMultiple } from '@tabler/icons-react';

export default function ProfileSettings() {
  const [loading, setLoading] = useState(true);
  const iconStyle = { width: rem(16), height: rem(16) };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const AccountFormSkeleton = () => (
    <Paper shadow="sm" p="md" withBorder>
      <Skeleton height={30} width="50%" mb="md" />
      <Skeleton height={100} mb="md" />
      <Group mb="md">
        <Skeleton circle height={80} />
        <Skeleton height={36} width={120} />
      </Group>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} height={36} />
        ))}
      </div>
      <Skeleton height={36} mt="md" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {[...Array(2)].map((_, index) => (
          <Skeleton key={index} height={36} />
        ))}
      </div>
      <Skeleton height={100} mt="md" />
      <Skeleton height={20} width="70%" mt="sm" />
      <Skeleton height={36} width={120} mt="md" />
    </Paper>
  );

  const BookingsContentSkeleton = () => (
    <Container>
      <Skeleton height={30} width="30%" mb="lg" />
      <Skeleton height={20} width="70%" mb="md" />
      <Skeleton height={80} mb="xl" />
      <Skeleton height={40} mb="md" />
      <Skeleton height={120} />
    </Container>
  );

  const TimeZoneFormSkeleton = () => (
    <Paper shadow="sm" p="md" withBorder className="mt-4">
      <Skeleton height={30} width="50%" mb="md" />
      <Skeleton height={20} width="80%" mb="md" />
      <Skeleton height={36} mb="md" />
      <Skeleton height={20} width="70%" mb="xs" />
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} height={24} width="60%" mb="sm" />
      ))}
      <Skeleton height={36} width={120} mt="md" />
    </Paper>
  );

  const EmailPreferencesSkeleton = () => (
    <Paper shadow="sm" p="md" withBorder className="mt-4">
      <Skeleton height={30} width="50%" mb="md" />
      <Skeleton height={20} width="80%" mb="md" />
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} height={24} width="90%" mb="sm" />
      ))}
      <Skeleton height={36} width={120} mt="md" />
    </Paper>
  );

  const CloseAccountSkeleton = () => (
    <Paper shadow="sm" p="md" withBorder className="mt-4">
      <Skeleton height={30} width="50%" mb="md" />
      <Skeleton height={20} width="80%" mb="md" />
      <Skeleton height={36} width={120} />
    </Paper>
  );

  const AccountForm = () => (
    <Paper shadow="sm" p="md" withBorder>
      <Text size="lg" weight={700} mb="md">Personal Information</Text>
      
      <Alert icon={<IconInfoCircle size="1rem" />} title="Tips" color="blue" mb="md">
        <Text size="sm">
          • Adding your photo and social media profiles helps mentors feel confident that you're a real person (e.g. not a bot).
          <br />
          • Your profile is only visible to mentors that you send applications to. It is not indexed on search engines like Google.
        </Text>
      </Alert>

      <Group mb="md">
        <Image
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          alt="Profile"
          radius="xl"
          width={80}
          height={80}
        />
        <Button leftIcon={<IconUpload size={14} />} variant="outline">
          Upload Photo
        </Button>
      </Group>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput label="First Name" placeholder="JNG" required />
        <TextInput label="Last Name" placeholder="Nandan" required />
        <TextInput label="Email" placeholder="jngnandan@gmail.com" required />
        <Select
          label="Location"
          placeholder="United Kingdom"
          data={['United Kingdom', 'United States', 'Canada', 'Australia']}
          rightSection={<IconChevronDown size={14} />}
        />
      </div>
      <TextInput label="Job title" placeholder="UI/UX Designer" className="mt-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <TextInput label="LinkedIn" placeholder="https://www.linkedin.com/..." />
        <TextInput label="Twitter" placeholder="https://twitter.com/" />
      </div>
      <Textarea
        label="Goal"
        placeholder="My dream is to work in Faang companies. I have one year experience as UI/UX Designer"
        className="mt-4"
      />
      <Text size="sm" color="dimmed" className="mt-2 mb-4">
        It's good practice to build mentorship around a long-term goal of yours. This is shared with mentors.
      </Text>
      <Button>Save Changes</Button>
    </Paper>
  );

  const BookingsContent = () => (
    <Container>
      <Text size="xl" weight={700} mb="lg">Bookings</Text>
      <Text mb="md">
        The session timings are following your local timezone Europe/London{' '}
        <Button variant="subtle" compact>Update</Button>
      </Text>
      
      <Alert icon={<IconInfoCircle size="1rem" />} color="blue" mb="xl">
        <Group position="apart">
          <Text size="sm">Keep track of the quality of sessions as you go.</Text>
          <Button variant="subtle" compact>View Quality</Button>
        </Group>
      </Alert>
      
      <Tabs defaultValue="history">
        <Tabs.List>
          <Tabs.Tab value="upcoming">Upcoming</Tabs.Tab>
          <Tabs.Tab value="pending">Pending</Tabs.Tab>
          <Tabs.Tab value="history">History</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="history">
          <Paper withBorder p="md" mt="md">
            <Group position="apart">
              <div>
                <Text weight={500}>Cancelled session with Nick Reev</Text>
                <Group spacing="xs">
                  <IconCalendar size={14} />
                  <Text size="sm">Mon, Jun 03</Text>
                  <Text size="sm">10:00 AM - 11:00 AM</Text>
                </Group>
              </div>
              <Button variant="subtle" rightIcon={<IconChevronRight size={14} />}>
                Details
              </Button>
            </Group>
            <Button variant="outline" mt="md">Send message</Button>
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );

  const TimeZoneForm = () => (
    <Paper shadow="sm" p="md" withBorder className="mt-4">
      <Text size="lg" weight={700} mb="md">Time zone & availability</Text>
      <Text size="sm" mb="md">If you'd like to meet your mentors via video calls, let them know when you're usually available!</Text>
      
      <Select
        label="Time zone"
        placeholder="Please select..."
        data={['GMT', 'EST', 'PST', 'CET']}
        className="mb-4"
        rightSection={<IconChevronDown size={14} />}
      />
      
      <Text size="sm" weight={500} mb="xs">In general, when do you prefer to meet your mentor?</Text>
      <Radio.Group>
        <Radio label="Early mornings (before 9am)" value="early" className="mb-2" />
        <Radio label="During the day (between 9am and 5pm)" value="day" className="mb-2" />
        <Radio label="In the evenings (after 5pm)" value="evening" className="mb-2" />
        <Radio label="I'm flexible" value="flexible" className="mb-2" />
        <Radio label="Other" value="other" className="mb-2" />
      </Radio.Group>
      
      <Button className="mt-4">Save Changes</Button>
    </Paper>
  );

  const EmailPreferences = () => (
    <Paper shadow="sm" p="md" withBorder className="mt-4">
      <Text size="lg" weight={700} mb="md">Email preferences</Text>
      <Text size="sm" mb="md">Configure your email notifications so you can focus on what's really important.</Text>
      
      <Checkbox label="Important updates about your account, mentorship, messages and billing" className="mb-2" />
      <Checkbox label="Regular reminders of your ongoing mentorships" className="mb-2" />
      <Checkbox label="Notifications of mentors on your wishlist" className="mb-2" />
      
      <Button className="mt-4">Save Changes</Button>
    </Paper>
  );

  const CloseAccount = () => (
    <Paper shadow="sm" p="md" withBorder className="mt-4">
      <Text size="lg" weight={700} mb="md">Close your account</Text>
      <Text size="sm" mb="md">Once you delete your account, there's no going back. Please be certain!</Text>
      
      <Button color="red">Delete account</Button>
    </Paper>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 mt-12">
      <Tabs defaultValue="profile">
        <Tabs.List>
          <Tabs.Tab value="profile" leftSection={<IconUserCircle style={iconStyle} />}>
            Profile
          </Tabs.Tab>
          <Tabs.Tab value="bookings" leftSection={<IconBoxMultiple style={iconStyle} />}>
            Bookings
          </Tabs.Tab>
          <Tabs.Tab value="balance" leftSection={<IconCoin style={iconStyle} />}>
            Balance
          </Tabs.Tab>
          <Tabs.Tab value="password" leftSection={<IconLock style={iconStyle} />}>
            Password
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile" pt="xs">
          {loading ? (
            <>
              <AccountFormSkeleton />
              <TimeZoneFormSkeleton />
              <EmailPreferencesSkeleton />
              <CloseAccountSkeleton />
            </>
          ) : (
            <>
              <AccountForm />
              <TimeZoneForm />
              <EmailPreferences />
              <CloseAccount />
            </>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="bookings" pt="xs">
          {loading ? <BookingsContentSkeleton /> : <BookingsContent />}
        </Tabs.Panel>

        <Tabs.Panel value="balance" pt="xs">
          {loading ? (
            <Skeleton height={200} />
          ) : (
            <Text size="xl" weight={700} my="lg">Balance</Text>
            // Add balance content here
          )}
        </Tabs.Panel>

        <Tabs.Panel value="password" pt="xs">
          {loading ? (
            <Skeleton height={200} />
          ) : (
            <>
              <Text size="xl" weight={700} my="lg">Password</Text>
              {/* Add password change content here */}
            </>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}