import React, { useContext, useEffect, useState } from 'react';
import {
  Container, Card, Text, Badge, Button, Group, Stack, Avatar, Box,
  Anchor, Tabs, List, Grid, Paper, ActionIcon, rem, Loader
} from '@mantine/core';
import { IconBrandLinkedin, IconBrandTwitter, IconChevronLeft, IconMapPin, IconCalendarStats, IconClock } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import { ContentContext } from '../../context/ContentContext.tsx';

const ProfilePage = () => {
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

  const profileData = {
    name: profile.first_name + ' ' + profile.last_name,
    title: profile.title || 'Mentor',
    location: profile.location || 'Location not specified',
    activeLastWeek: 'Active last week', // You can update this if you have last activity data
    skills: profile.skills || [],
    advancedSkills: profile.advancedSkills || [],
    about: profile.about || 'No description available.',
    services: profile.services || {
      price: 0,
      period: 'month',
      features: []
    },
    experience: profile.experience || []
  };

  const similarMentors = [
    { name: 'Katie Kutters', title: 'Senior UX Designer @ The Home Depot', price: 150, reviews: 12 },
    { name: 'Lyudmord Matveev', title: 'Principal UX Designer @ SAP', price: 220, reviews: 9 }
  ];

  return (
    <Container size="lg">
      <Group position="apart" mb="xl">
        <Anchor href="/mentors" size="sm">
          <Group spacing="xs">
            <IconChevronLeft size={rem(12)} />
            <Text>Find a Mentor</Text>
          </Group>
        </Anchor>
        <Text size="sm" color="dimmed">
          {profile.first_name} {profile.last_name}
        </Text>
      </Group>

      <Grid>
        <Grid.Col span={8}>
          <Card withBorder p="lg">
            <Group position="apart" align="flex-start">
              <Box>
                <Group>
                <Avatar
  src={profile.avatar || 'https://example.com/profileData-pic.jpg'}
  size={100}
  radius={100}
  onError={(e) => {
    e.target.src = 'https://example.com/profileData-pic.jpg'; // Fallback image
  }}
/>                  <Box>
                    <Text size="xl" weight={700}>{profileData.name}</Text>
                    <Text color="dimmed">{profileData.title}</Text>
                    <Group spacing="xs" mt={4}>
                      <IconMapPin size={rem(14)} />
                      <Text size="sm" color="dimmed">{profileData.location}</Text>
                    </Group>
                    <Group spacing="xs" mt={4}>
                      <IconCalendarStats size={rem(14)} />
                      <Text size="sm" color="dimmed">{profileData.activeLastWeek}</Text>
                    </Group>
                  </Box>
                </Group>
              </Box>
              <Button variant="outline">View Mentor</Button>
            </Group>

            <Group mt="md" mb="xs">
              {profileData.skills.map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </Group>

            <Tabs defaultValue="services">
              <Tabs.List>
                <Tabs.Tab value="services">Services</Tabs.Tab>
                <Tabs.Tab value="about">About</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="services" pt="xs">
                <Card withBorder mt="md">
                  <Text size="lg" weight={700}>${profileData.services.price} <Text span size="sm" color="dimmed">/ {profileData.services.period}</Text></Text>
                  <Text size="sm" color="dimmed" mb="sm">The most popular way to get mentored, let's work towards your goals!</Text>
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ActionIcon color="teal" size={20} radius="xl">
                        <IconClock size="1rem" />
                      </ActionIcon>
                    }
                  >
                    {profileData.services.features.map((feature, index) => (
                      <List.Item key={index}>{feature}</List.Item>
                    ))}
                  </List>
                  <Button fullWidth color="teal" mt="md">Apply now</Button>
                </Card>
              </Tabs.Panel>

              <Tabs.Panel value="about" pt="xs">
                <Text>{profileData.about}</Text>
              </Tabs.Panel>
            </Tabs>
          </Card>

          <Card withBorder mt="xl">
            <Text size="lg" weight={700} mb="md">Get to know {profileData.name.split(' ')[0]}</Text>
            {profileData.experience.map((exp, index) => (
              <Box key={index} mb="md">
                <Text weight={500}>{exp.title}</Text>
                <Text size="sm" color="dimmed">{exp.company}</Text>
                <Text size="sm" mt={4}>{exp.description}</Text>
              </Box>
            ))}
          </Card>

          <Card withBorder mt="xl">
            <Text size="lg" weight={700} mb="md">Skills</Text>
            <Group spacing={8}>
              {profileData.advancedSkills.map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <Card withBorder p="lg">
            <Text size="lg" weight={700} mb="md">Similar mentors</Text>
            <Stack>
              {similarMentors.map((mentor, index) => (
                <Paper key={index} withBorder p="md">
                  <Group>
                    <Avatar size="md" />
                    <Box>
                      <Text weight={500}>{mentor.name}</Text>
                      <Text size="xs" color="dimmed">{mentor.title}</Text>
                    </Box>
                  </Group>
                  <Group position="apart" mt="xs">
                    <Text size="sm" color="dimmed">from ${mentor.price} / hour</Text>
                    <Badge size="sm" variant="outline">{mentor.reviews} reviews</Badge>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      <Box component="footer" mt="xl" pb="xl">
        <Text align="center" size="sm" color="dimmed">
          Your trusted source to find highly-vetted mentors & industry professionals to move your career ahead.
        </Text>
        <Group position="center" spacing="xs" mt="md">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandLinkedin size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Box>
    </Container>
  );
};

export default ProfilePage;