import React from 'react';
import { Card, Image, Text, Badge, Group, Button, Stack, Flex } from '@mantine/core';
import { IconStar, IconGift } from '@tabler/icons-react';
import { Link } from 'react-router-dom'; // Make sure to import Link

interface ProfileCardProps {
  id: string;
  profilepic: string;
  linkUrl: string;
  summary: string;
  first_name: string;
  last_name: string;
  job: string;
  bio: string;
  company: string;
  hobbies: string;
  achievements: string;
  contributions: string;
  created_at: string;
  social_media_links: string;
  bookings: string;
  badgeText: string;
  badgeGradient: { from: string; to: string };
  experience: string;
}

export default function ProfileCard({
  id,
  profilepic,
  linkUrl,
  summary,
  first_name,
  last_name,
  job,
  bio,
  company,
  hobbies,
  achievements,
  contributions,
  created_at,
  social_media_links,
  bookings,
  badgeText,
  badgeGradient,
  experience,
}: ProfileCardProps) {
  const name = `${first_name} ${last_name}`;


  return (
    <Link to={`/mentors/${id}`}>
    <Card withBorder radius="md" p="md" className="relative m-3">
      <Text className="absolute top-2 right-2 text-gray-500 text-sm">Only 3 Spots Left</Text>
      <Flex gap="md">
        {profilepic && (
        <Link to={`/mentors/${id}`}>
          <Image
            src={profilepic}
            height={180}
            fit="cover"
            radius='md'
            className="rounded-md"
            alt={`${name}'s profile picture`} // Add alt attribute for better accessibility
          />
          </Link>
        )}
        <Stack spacing="xs">
          <Group position="apart" align="flex-start">
            <div>
              <Text size="xl" weight={700}>
                {name}
              </Text>
              {/* Uncomment if you want to use the badge
              <Badge color="blue" variant="light" gradient={badgeGradient}>
                {badgeText}
              </Badge>
              */}
            </div>
          </Group>
          <Text size="sm" color="dimmed">
            {job} at {company}
          </Text>
          <Text size="sm" color="teal">
            {bio}
          </Text>
          <Group spacing="xs">
            <IconStar size={16} color="gold" fill="gold" />
            <Text size="xs" color="dimmed">
              {bookings}
            </Text>
          </Group>
        </Stack>
      </Flex>
      <Text size="sm" mt="md">
        <IconGift size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
        FREE INTRO CALL: Set up a free 20 minute introductory call here:{' '}
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          {linkUrl}
        </a>
      </Text>
      <Group mt="md" spacing="xs">
        {[hobbies, achievements, contributions].filter(Boolean).map((item, index) => (
          <Badge key={index} variant="light">
            {item}
          </Badge>
        ))}
      </Group>
      <Flex justify="space-between" align="center" mt="xl">
        <div>
          <Text size="xs" color="dimmed">
            Experience
          </Text>
          <Text size="xl" weight={700}>
            {experience}
            <Text span size="sm" weight={400}>
              {' '}
              years
            </Text>
          </Text>
        </div>
        <Button
          component={Link}
          to={`/mentors/${id}`}
          variant="light"
          color="blue"
          size="md"
        >
          View Profile
        </Button>
      </Flex>
    </Card>
    </Link>
  );
}