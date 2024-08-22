import React from 'react';
import { IconBookmark, IconBriefcase } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  useMantineTheme,
  rem,
  Box,
} from '@mantine/core';
import classes from './ArticleCard.module.css';

interface ArticleCardProps {
  profilepic: string; // Maps to the profilepic column
  linkUrl: string;    // URL for the article link
  summary: string;    // Maps to the summary column (used for both title and description)
  first_name: string; // Maps to the first_name column
  last_name: string;  // Maps to the last_name column
  job: string;        // Maps to the job column
  bio?: string;       // Maps to the bio column
  company?: string;   // Maps to the company column
  hobbies?: string;   // Maps to the hobbies column
  achievements?: string; // Maps to the achievements column
  contributions?: string; // Maps to the contributions column
  created_at?: string;    // Maps to the created_at column
  social_media_links?: string; // Maps to the social_media_links column
  bookings?: string;  // Maps to the bookings column
  badgeText?: string;
  experience: string;
  badgeGradient?: { from: string; to: string };
}

export default function ArticleCard({
  profilepic,
  linkUrl,
  summary,
  first_name,
  last_name,
  job,
  bio = 'No bio available', // Default values if not provided
  company = 'No company available',
  hobbies = 'No hobbies listed',
  achievements = 'No achievements listed',
  contributions = 'No contributions listed',
  created_at = 'Date not available',
  social_media_links = 'No social media links available',
  bookings = 'No bookings available',
  badgeText = 'Featured',
  badgeGradient = { from: 'blue', to: 'cyan' },
  experience
}: ArticleCardProps) {
  const linkProps = { href: linkUrl, target: '_blank', rel: 'noopener noreferrer' };
  const theme = useMantineTheme();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <a {...linkProps}>
          <Image src={profilepic} height={180} fit="cover" />
        </a>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={badgeGradient}>
        {badgeText}
      </Badge>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {/* {summary} */}
        {`${first_name} ${last_name}`}
      </Text>

      <Text className={classes.description} fz="sm" c="dimmed" lineClamp={4} mt={4}>
  {`${job} at `}
  <span style={{ color: '' }}>{company}</span>
</Text>


      <Group position="apart"  className='space-between' mt="md">
        <Group spacing="xs">
          {/* <img src={profilepic} alt={`${first_name} ${last_name}`} style={{ width: rem(32), height: rem(32), borderRadius: '50%' }} /> */}
          <Box>
            <Text fz="xs" c="dimmed">
              Experience
            </Text>
            <Text fz="sm" fw={500}>
              {/* {`${first_name} ${last_name}`} */}
              {`${experience} years`}

            </Text>
          </Box>
        </Group>
        <ActionIcon className={classes.action}>
          <IconBookmark
            style={{ width: rem(20), height: rem(20) }}
            color={theme.colors.yellow[7]}
          />
        </ActionIcon>
      </Group>
    </Card>
  );
}
