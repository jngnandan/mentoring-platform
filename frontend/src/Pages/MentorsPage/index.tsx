import React, { useContext, useEffect, useState } from 'react';
import {
  Container, Card, Text, Badge, Button, Group, Divider, Stack,
  Avatar, Box, Loader, rem, List, Anchor, Breadcrumbs
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { ContentContext } from '../../context/ContentContext.tsx';

const iconStyle = { width: rem(16), height: rem(16) };

const sampleMentorshipPlans = [
  { name: 'Basic', price: 100, sessions: 2, support: 'Email Support' },
  { name: 'Pro', price: 200, sessions: 4, support: 'Email and Chat Support' },
  { name: 'Premium', price: 300, sessions: 6, support: 'Email, Chat, and Phone Support' },
];

function UserInfo({ profile }) {
  return (
    <Box align="center" my="md">
      <Avatar
        src={profile.profilepic || 'path/to/fallback/image.jpg'}
        size={150}
        radius="50%"
        onError={(e) => { e.target.src = 'path/to/fallback/image.jpg'; }}
      />
      <Text align="center" size="lg" weight={500} mt="md">
        {profile.first_name} {profile.last_name}
      </Text>
      <Text align="center" color="dimmed">
        {profile.job} at {profile.company}
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

function AdditionalDetails({ profile }) {
  return (
    <Stack spacing="md">
      <Divider my="lg" />
      <Text weight={500} size="lg" mb="xs">Summary</Text>
      <Text color="dimmed">{profile.summary || 'No summary available.'}</Text>

      <Divider my="lg" />
      <Text weight={500} size="lg" mb="xs">Achievements</Text>
      <List spacing="sm" size="sm" color="dimmed">
        {profile.achievements.length > 0 ? (
          profile.achievements.map((achievement, index) => (
            <List.Item key={index}>{achievement}</List.Item>
          ))
        ) : (
          <Text color="dimmed">No achievements available.</Text>
        )}
      </List>

      <Divider my="lg" />
      <Text weight={500} size="lg" mb="xs">Contributions</Text>
      <List spacing="sm" size="sm" color="dimmed">
        {profile.contributions.length > 0 ? (
          profile.contributions.map((contribution, index) => (
            <List.Item key={index}>{contribution}</List.Item>
          ))
        ) : (
          <Text color="dimmed">No contributions available.</Text>
        )}
      </List>

      <Divider my="lg" />
      <Text weight={500} size="lg" mb="xs">Hobbies</Text>
      <Group spacing="xs">
        {profile.hobbies.length > 0 ? (
          profile.hobbies.map((hobby, index) => (
            <Badge key={index} color="blue">{hobby}</Badge>
          ))
        ) : (
          <Text color="dimmed">No hobbies available.</Text>
        )}
      </Group>

      <Divider my="lg" />
      <Text weight={500} size="lg" mb="xs">Social Links</Text>
      <Group position="center" spacing="md">
        {profile.linkedin_url && (
          <Anchor href={profile.linkedin_url} target="_blank" color="blue">LinkedIn</Anchor>
        )}
        {profile.x_url && (
          <Anchor href={profile.x_url} target="_blank" color="blue">External Profile</Anchor>
        )}
      </Group>
    </Stack>
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
  const { superProfiles } = useContext(ContentContext);
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const foundProfile = superProfiles.find((profile) => profile.id === parseInt(id));
    setProfile(foundProfile);
  }, [id, superProfiles]);

  if (!profile) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size={30} />
      </div>
    );
  }

  return (
    <Container size="sm" my="md">
      {/* Breadcrumbs Component */}
      <Breadcrumbs>
        <Anchor href="/">Home</Anchor>
        <Anchor href="/mentors">Profiles</Anchor>
        <Text>{profile.first_name} {profile.last_name}</Text>
      </Breadcrumbs>

      <Card withBorder radius="md" shadow="sm" p="xl" mt="md">
        <UserInfo profile={profile} />

        <AdditionalDetails profile={profile} />

        <Divider my="lg" />

        <Text weight={500} size="lg" mb="xs">Mentorship Plans</Text>
        <MentorshipPlans />
      </Card>
    </Container>
  );
}

export default ProfilePage;