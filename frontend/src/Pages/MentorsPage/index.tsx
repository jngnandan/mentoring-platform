import React, { useContext, useEffect, useState } from 'react';
import {
  Container, Card, Text, Badge, Button, Group, Stack, Avatar, Box,
  Anchor, Tabs, List, ActionIcon, Loader, rem, Modal, Textarea
} from '@mantine/core';
import { IconBrandLinkedin, IconBrandTwitter, IconChevronLeft, IconBriefcase, IconCalendarStats, IconClock, IconMessage } from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';
import { ContentContext } from '../../context/ContentContext.tsx';
import MentorshipPlans from './MentorshipPlans.tsx';

const ProfilePage = () => {
  const { superProfiles } = useContext(ContentContext);
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');

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

  const skillsArray = profile.skills.replace(/[\[\]"]/g, '').split(',').map(skill => skill.trim());

  const handleSendMessage = () => {
    console.log("Sending message:", messageText);
    setMessageModalOpen(false);
    setMessageText('');
  };

  return (
    <Container size="lg">
      <Group position="apart" mb="xl">
        <Anchor component={Link} to="/mentors" size="sm">
          <Group spacing="xs">
            <IconChevronLeft size={rem(12)} />
            <Text>Find a Mentor</Text>
          </Group>
        </Anchor>
        <Text size="sm" color="dimmed">
          {profile.first_name} {profile.last_name}
        </Text>
      </Group>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <Card withBorder p="lg">
            <Group className='flex flex-row justify-between'>
              <Box>
                <Group>
                  
                  <Avatar
                    src={profile.profilepic}
                    size={120}
                    radius={100}
                    onError={(e) => {
                      e.target.src = 'https://example.com/default-profile-pic.jpg';
                    }}
                  />
                  <Box>
                    <Text size="xl" weight={700}>{profile.first_name} {profile.last_name}</Text>
                    <Text color="dimmed">{profile.job}</Text>
                    <Group spacing="xs" mt={4}>
                      <IconBriefcase size={rem(15)} />
                      <Text size="sm" color="dimmed">{profile.company}</Text>
                    </Group>
                    <Group spacing="xs" mt={4}>
                      <IconCalendarStats size={rem(15)} />
                      <Text size="sm" color="dimmed">Active last week</Text>
                    </Group>
                  </Box>
                </Group>
              </Box>

              <ActionIcon 
                color="gray" 
                variant="default" 
                size="xl" 
                ml={30} 
                onClick={() => setMessageModalOpen(true)}
              >
                <IconMessage size={24} />
              </ActionIcon>      
            </Group>
            
            <div className='flex flex-row justify-between mt-1'>
              <Group mt="md" mb="xs">
                <Group mt="md" spacing="xs">
                  {profile.hobbies.map((hobby, index) => (
                    <Badge key={index} variant="light">
                      {hobby}
                    </Badge>
                  ))}
                </Group>
              </Group>

              <Group position="center" spacing="xs" mt="md">
                <ActionIcon component="a" href={profile.x_url} target="_blank" rel="noopener noreferrer" size="lg" variant="default" radius="xl">
                  <IconBrandTwitter size="1.05rem" stroke={1.5} />
                </ActionIcon>
                <ActionIcon component="a" href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" size="lg" variant="default" radius="xl">
                  <IconBrandLinkedin size="1.05rem" stroke={1.5} />
                </ActionIcon>
              </Group>
            </div>
            
            <Tabs defaultValue="overview">
              <Tabs.List>
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="services">Services</Tabs.Tab>
                <Tabs.Tab value="group">Group Sessions</Tabs.Tab>
              </Tabs.List>
              
              <Tabs.Panel value="overview" pt="xs">
                <Text>{profile.summary}</Text>
              </Tabs.Panel>

              <Tabs.Panel value="services" pt="xs">
                <Card withBorder mt="md">
                  <Text size="lg" weight={700}>$150 <Text span size="sm" color="dimmed">/ month</Text></Text>
                  <Text size="sm" color="dimmed" mb="sm">The most popular way to get mentored, let's work towards your goals!</Text>
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ActionIcon color="blue" size={20} radius="xl">
                        <IconClock size="1rem" />
                      </ActionIcon>
                    }
                  >
                    <List.Item>1-on-1 mentorship sessions</List.Item>
                    <List.Item>Career guidance</List.Item>
                    <List.Item>Code reviews</List.Item>
                  </List>
                  <Button fullWidth color="blue" mt="md">Apply now</Button>
                </Card>
              </Tabs.Panel>

              <Tabs.Panel value="group" pt="xs">
                <Text>Group sessions information not available.</Text>
              </Tabs.Panel>
            </Tabs>
          </Card>

          <Card withBorder mt="xl">
            <Text size="lg" weight={700} mb="md">Skills</Text>
            <Group spacing={8}>
              {skillsArray.map((skill, index) => (
                <Badge key={index} variant="light">{skill}</Badge> 
              ))}
            </Group>
          </Card>

          <Card withBorder mt="xl">
            <Text size="lg" weight={700} mb="md">Achievements</Text>
            <List>
              {profile.achievements.map((achievement, index) => (
                <List.Item key={index}>{achievement}</List.Item> 
              ))}
            </List>
          </Card>

          <Card withBorder mt="xl">
            <Text size="lg" weight={700} mb="md">Contributions</Text>
            <List>
              {profile.contributions.map((contribution, index) => (
                <List.Item key={index}>{contribution}</List.Item> 
              ))}
            </List>
          </Card>
        </div>

        <MentorshipPlans />
      </div>

      <Modal
        opened={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        title={<Text size="xl" weight={700}>Message request</Text>}
        size="lg"
      >
        <Text mb="md">
          This is the beginning of your conversation with {profile.first_name}. 
          This first message will be treated as a request, until the mentor accepts, 
          you won't be able to send any more messages. Here are <Anchor>some tips to help 
          you introduce yourself best to the mentor</Anchor>.
        </Text>
        <Text weight={500} mb="xs">Your message</Text>
        <Textarea
          placeholder="Introduce yourself and give a reason for your request"
          minRows={8}
          value={messageText}
          onChange={(event) => setMessageText(event.currentTarget.value)}
          mb="lg"
        />
        <Button 
          fullWidth 
          color="blue"
          variant='default' 
          onClick={handleSendMessage}
          disabled={!messageText.trim()}
        >
          Send message
        </Button>
      </Modal>

      <Box component="footer" mt="xl" pb="xl">
        <Text align="center" size="sm" color="dimmed">
          Your trusted source to find highly-vetted mentors & industry professionals to move your career ahead.
        </Text>
      </Box>
    </Container>
  );
};

export default ProfilePage;