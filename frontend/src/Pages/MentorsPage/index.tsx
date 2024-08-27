import React, { useContext, useEffect, useState } from 'react';
import {
  Container, Card, Text, Badge, Button, Group, Title, Divider, Stack,
  Avatar, Box, Grid, Tabs, rem, Loader
} from '@mantine/core';
import {
  IconMapPin, IconClock,
} from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import { ContentContext } from '../../context/ContentContext.tsx';

const iconStyle = { width: rem(16), height: rem(16) };

const sampleExpertise = ['Career Advice', 'Tech Industry', 'Product Management', 'Marketing'];
const sampleMentorshipPlans = [
  { name: 'Basic', price: 100, sessions: 2, support: 'Email Support' },
  { name: 'Pro', price: 200, sessions: 4, support: 'Email and Chat Support' },
  { name: 'Premium', price: 300, sessions: 6, support: 'Email, Chat, and Phone Support' },
];

function UserInfo({ profile }) {
  return (
    <Box align="center" my="md">
      <Avatar src={profile.profile_picture} size={150} radius="50%" />
      <Text align="center" size="lg" weight={500} mt="md">
        {profile.first_name} {profile.last_name}
      </Text>
      <Text align="center" color="dimmed">
        {profile.job_title} at {profile.company}
      </Text>
      <Text align="center" color="dimmed" mt="xs">
        {profile.location}
      </Text>
      <Group position="center" mt="md" spacing="xs">
        <Button variant="outline" color="blue">Connect</Button>
        <Button color="blue">Subscribe</Button>
      </Group>
    </Box>
  );
}

function MentorshipPlans() {
  return (
    <Stack spacing="md">
      {sampleMentorshipPlans.map((plan, index) => (
        <Card key={index} withBorder radius="md" shadow="sm" p="md">
          <Text weight={500} size="lg">{plan.name}</Text>
          <Text size="sm" color="dimmed">${plan.price} / month</Text>
          <Text size="sm" color="dimmed">{plan.sessions} sessions</Text>
          <Text size="sm" color="dimmed">{plan.support}</Text>
        </Card>
      ))}
      <Button fullWidth color="blue" mt="xl">Choose Plan</Button>
    </Stack>
  );
}

function ProfilePage() {
  const { profilesData } = useContext(ContentContext);
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const foundProfile = profilesData.find((profile) => profile.id === parseInt(id));
    setProfile(foundProfile);
  }, [id, profilesData]);

  if (!profile) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size={30} />
      </div>
    );
  }

  return (
    <Container size="sm" my="md">
      <Card withBorder radius="md" shadow="sm" p="xl">
        <UserInfo profile={profile} />

        <Divider my="lg" />

        <Text weight={500} size="lg" mb="xs">Bio</Text>
        <Text color="dimmed">{profile.bio}</Text>

        <Divider my="lg" />

        <Text weight={500} size="lg" mb="xs">Expertise</Text>
        <Group spacing="xs">
          {sampleExpertise.map((skill, index) => (
            <Badge key={index} color="blue">{skill}</Badge>
          ))}
        </Group>

        <Divider my="lg" />

        <Text weight={500} size="lg" mb="xs">Mentorship Availability</Text>
        <Stack spacing="sm">
          <Group spacing="xs"><IconClock size={20} /><Text color="dimmed">Availability: 1-2 hours per week</Text></Group>
          <Group spacing="xs"><IconClock size={20} /><Text color="dimmed">Response Time: 1-2 days</Text></Group>
          <Group spacing="xs"><IconMapPin size={20} /><Text color="dimmed">Location: {profile.location}</Text></Group>
        </Stack>

        <Divider my="lg" />

        <Text weight={500} size="lg" mb="xs">Mentorship Plans</Text>
        <MentorshipPlans />
      </Card>
    </Container>
  );
}

export default ProfilePage;
