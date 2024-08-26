import React, { useContext, useEffect, useState } from 'react';
import {
  Container, Card, Text, Badge, Button, Group, Title, Divider, Stack,
  Anchor, Grid, Avatar, Loader, ActionIcon, Box, Tabs, rem, Breadcrumbs,
} from '@mantine/core';
import {
  IconMapPin, IconStar, IconClock, IconBookmark, IconBrandLinkedin,
  IconBrandX, IconUserCheck, IconUserPlus,
} from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';
import { ContentContext } from '../../context/ContentContext.tsx';

const iconStyle = { width: rem(16), height: rem(16) };

const sampleSkills = ['JavaScript', 'React', 'Node.js', 'UX Design', 'Mentorship'];
const sampleMentorshipPlans = [
  { name: 'Introductory Call', duration: '20 minutes', price: 39 },
  { name: 'Portfolio + CV Review', duration: '30 minutes', price: 65 },
  { name: 'Career Guidance', duration: '1 hour', price: 100 },
];
const sampleMembershipPlans = [
  { price: 90, description: 'Lite Plan - Suitable for beginners', features: ['2 calls per month', 'Unlimited Q&A via chat', 'Expect responses in 2 days'] },
  { price: 150, description: 'Standard Plan - Best for ongoing support', features: ['4 calls per month', 'Priority Q&A via chat', 'Expect responses within 24 hours', 'Hands-on support'] },
  { price: 250, description: 'Pro Plan - Ideal for intensive mentoring', features: ['8 calls per month', 'Direct phone support', 'Personalized project reviews', 'Instant response via chat'] },
];

function UserInfo({ profile }) {
  return (
    <>
      <Avatar src={profile.profile_picture} size={150} radius="4%" mx="auto" />
      <Text align="center" size="lg" weight={500} mt="md">
        {profile.first_name} {profile.last_name}
      </Text>
      <Text align="center" color="dimmed">
        {profile.job_title} @ {profile.company}
      </Text>
      {profile.is_top_mentor && <Badge color="green" fullWidth mt="xs">Top Mentor</Badge>}
      <Group position="center" mt="md">
        {profile.social_links?.linkedin && <Anchor href={profile.social_links.linkedin}><IconBrandLinkedin size={20} /></Anchor>}
        {profile.social_links?.twitter && <Anchor href={profile.social_links.twitter}><IconBrandX size={20} /></Anchor>}
      </Group>
    </>
  );
}

function MentorshipPlans() {
  return (
    <Tabs.Panel value="mentorship" pt="lg">
      <Stack spacing="sm">
        {sampleMentorshipPlans.map((plan, index) => (
          <Box key={index}>
            <Text weight={500}>{plan.name}</Text>
            <Text size="sm" color="dimmed">{plan.duration}, ${plan.price} per session</Text>
          </Box>
        ))}
      </Stack>
      <Link to={'/login'}>
        <Button fullWidth color="teal" mt="xl">Book now</Button>
      </Link>
      <Anchor href="#" size="sm" color="teal" mt="xs" display="block" textAlign="center">View all sessions</Anchor>
      <Divider my="lg" />
      <Badge color="teal" size="lg" fullWidth>Free intro call. No credit card required</Badge>
    </Tabs.Panel>
  );
}

function MembershipPlans() {
  return (
    <Tabs.Panel value="membership" pt="lg">
      <Grid mt="sm">
        {sampleMembershipPlans.map((plan, index) => (
          <Grid.Col key={index} span={4}>
            <Card withBorder radius="md" shadow="sm" p="md">
              <Text weight={500} size="lg">${plan.price} / month</Text>
              <Text size="sm" color="dimmed">{plan.description}</Text>
              <Group mt="sm">
                {plan.features.map((feature, featureIndex) => (
                  <Text key={featureIndex} size="xs" color="dimmed">• {feature}</Text>
                ))}
              </Group>
              <Button fullWidth color="teal" mt="md">Select Plan</Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Tabs.Panel>
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

  // Breadcrumbs items
  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Mentors', href: '/mentors' },
    { title: `${profile.first_name} ${profile.last_name}`, href: `/profile/${id}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Container size="xl" my="md">
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <Card withBorder radius="md" shadow="sm" p="xl" mt="md">
        <Grid>
          <Grid.Col span={4}><UserInfo profile={profile} /></Grid.Col>
          <Grid.Col span={4}>
            <Stack spacing="xs">
              <Text color="dimmed">{profile.experience_summary}</Text>
              <Group spacing="xs"><IconMapPin size={20} /><Text color="dimmed">{profile.location}</Text></Group>
              <Group spacing="xs"><IconStar size={20} /><Text color="dimmed">5.0 ({profile.reviews_count} reviews)</Text></Group>
              <Group spacing="xs"><IconClock size={20} /><Text color="dimmed">{profile.active_status}</Text></Group>
              <Group spacing="xs"><IconClock size={20} /><Text color="dimmed">Usually responds in a few hours</Text></Group>
              <Group spacing="xs" mt="sm">
                <Button variant="outline" color="blue" leftIcon={<IconBrandX size={20} />}>Play Intro</Button>
                <ActionIcon color="yellow"><IconBookmark size={20} /></ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Hide this column on small and medium screens */}
          <Grid.Col span={4} className="hidden lg:block">
            <Card withBorder radius="sm" shadow="sm" p="xl" mt="lg">
              <Tabs defaultValue="mentorship" className='w-360'>
                <Tabs.List>
                  <Tabs.Tab value="mentorship" leftSection={<IconUserCheck style={iconStyle} />}>Mentorship Plans</Tabs.Tab>
                  <Tabs.Tab value="membership" leftSection={<IconUserPlus style={iconStyle} />}>Membership Plans</Tabs.Tab>
                </Tabs.List>
                <MentorshipPlans />
                <MembershipPlans />
              </Tabs>
            </Card>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Skills Section */}
      <Card withBorder radius="sm" shadow="sm" p="xl" mt="lg">
        <Title order={3}>Skills</Title>
        <Group mt="sm" spacing="xs">
          {sampleSkills.map((skill, index) => (
            <Badge key={index} color="blue">{skill}</Badge>
          ))}
          <Anchor href="#" size="xs" ml="xs">+ more</Anchor>
        </Group>
      </Card>

      {/* Mentorship and Membership Plans with Tabs for Small and Medium Screens */}
      <Grid className="block lg:hidden">
        <Grid.Col span={6}>
          <Card withBorder radius="sm" shadow="sm" p="xl" mt="lg">
            <Tabs defaultValue="mentorship">
              <Tabs.List>
                <Tabs.Tab value="mentorship" leftSection={<IconUserCheck style={iconStyle} />}>Mentorship Plans</Tabs.Tab>
                <Tabs.Tab value="membership" leftSection={<IconUserPlus style={iconStyle} />}>Membership Plans</Tabs.Tab>
              </Tabs.List>
              <MentorshipPlans />
              <MembershipPlans />
            </Tabs>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default ProfilePage;
