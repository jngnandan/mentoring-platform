import React from 'react';
import { IconBookmark, IconBriefcase, IconBuilding } from '@tabler/icons-react';
import { Card, Image, Text, ActionIcon, Badge, Group, useMantineTheme, rem, Box } from '@mantine/core';
import { Link } from 'react-router-dom';

interface ProfileCardProps {
  profilepic: string;
  id: string; // Use this field to create dynamic links
  summary: string;
  first_name: string;
  last_name: string;
  job: string;
  bio?: string;
  company: string;
  hobbies?: string[]; // Add hobbies as an array
  achievements?: string[]; // Add achievements as an array
  contributions?: string[]; // Add contributions as an array
  companyLogo?: string;  // Add a companyLogo field to display the company logo
  experience: string; // Add experience in years
  badgeText?: string;
  badgeGradient?: { from: string; to: string };
  x_url?: string; // URL for external reference
  linkedin_url?: string; // LinkedIn profile URL
}

export default function ProfileCard({
  profilepic,
  id,
  summary,
  first_name,
  last_name,
  job,
  bio = 'No bio available',
  company,
  hobbies = [],
  achievements = [],
  contributions = [],
  companyLogo,  // Destructure the companyLogo prop
  experience,
  badgeText = 'Featured',
  badgeGradient = { from: 'blue', to: 'cyan' },
  x_url,
  linkedin_url,
}: ProfileCardProps) {
  const theme = useMantineTheme();

  return (
    <Card
      withBorder
      radius="md"
      className="relative bg-white/30 backdrop-blur-lg shadow-lg my-2 p-4 border border-white/20"
      shadow='sm'
    >
      <Card.Section>
        <Link to={`/mentors/${id}`}>
          <Image
            src={profilepic || 'https://via.placeholder.com/150'} // Fallback image
            height={180}
            fit="cover"
            className="rounded-t-md"
            alt={`${first_name} ${last_name}`} // Add alt text for accessibility
          />
        </Link>
      </Card.Section>

      <Badge className="absolute top-2 right-3 pointer-events-none" variant="gradient" gradient={badgeGradient}>
        {badgeText}
      </Badge>

      <Text className="block mt-4 mb-1 font-medium text-lg" fw={500} component={Link} to={`/article/${id}`}>
        {`${first_name} ${last_name}`}
      </Text>

      <div className="text-gray-400 flex justify-start items-center gap-2 mt-2">
        <IconBriefcase stroke={1.5} style={{ paddingRight: '2px' }} />
        <Text fz="sm" c="dimmed" lineClamp={4}>
          {`${job} at `}
        </Text>
      </div>

      <div className="text-gray-400 flex justify-start items-center gap-2 mt-2">
        <IconBuilding stroke={1.5} style={{ paddingRight: '2px' }} />
        <Text fz="sm" c="dimmed" lineClamp={4}>
          {company}
        </Text>
      </div>

      {companyLogo && (
        <div className="flex justify-start items-center gap-2 mt-2">
          <Image
            src={companyLogo}
            alt={`${company} logo`} // Use alt text for accessibility
            width={50}
            height={50}
            fit="contain"
          />
        </div>
      )}

      <Group position="apart" className="flex justify-between mt-4">
        <Group spacing="xs">
          <Box>
            <Text fz="xs" c="dimmed">Experience</Text>
            <Text fz="sm" fw={500}>{`${experience} years`}</Text>
          </Box>
        </Group>
        <ActionIcon className="bg-gray-100 hover:bg-gray-200">
          <IconBookmark color='white' style={{ width: rem(20), height: rem(20) }} />
        </ActionIcon>
      </Group>

      <Text fz="sm" c="dimmed" mt={10}>{summary}</Text>

      {hobbies.length > 0 && (
        <div className="mt-2">
          <Text fz="xs" c="dimmed">Hobbies</Text>
          <Text fz="sm">{hobbies.join(', ')}</Text>
        </div>
      )}

      {achievements.length > 0 && (
        <div className="mt-2">
          <Text fz="xs" c="dimmed">Achievements</Text>
          <Text fz="sm">{achievements.join(', ')}</Text>
        </div>
      )}

      {contributions.length > 0 && (
        <div className="mt-2">
          <Text fz="xs" c="dimmed">Contributions</Text>
          <Text fz="sm">{contributions.join(', ')}</Text>
        </div>
      )}

      {x_url && (
        <Text fz="sm" c="blue" mt={10}>
          <Link to={x_url}>Personal Website</Link>
        </Text>
      )}

      {linkedin_url && (
        <Text fz="sm" c="blue" mt={10}>
          <Link to={linkedin_url}>LinkedIn Profile</Link>
        </Text>
      )}
    </Card>
  );
}