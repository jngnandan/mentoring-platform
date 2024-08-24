import React from 'react';
import { IconBookmark, IconBriefcase, IconBuilding } from '@tabler/icons-react';
import { Card, Image, Text, ActionIcon, Badge, Group, useMantineTheme, rem, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './ArticleCard.module.css';

interface ArticleCardProps {
  profilepic: string;
  id: string; // Add an id field to create dynamic links
  summary: string;
  first_name: string;
  last_name: string;
  job: string;
  bio?: string;
  company?: string;
  companyLogo?: string;  // Add a companyLogo field to display the company logo
  experience: string;
  badgeText?: string;
  badgeGradient?: { from: string; to: string };
}

export default function ArticleCard({
  profilepic,
  id,
  summary,
  first_name,
  last_name,
  job,
  bio = 'No bio available',
  company = 'No company available',
  companyLogo,  // Destructure the companyLogo prop
  experience,
  badgeText = 'Featured',
  badgeGradient = { from: 'blue', to: 'cyan' },
}: ArticleCardProps) {
  const theme = useMantineTheme();

  return (
    <Card withBorder radius="md" className={classes.card} shadow='sm' my={7}>
      <Card.Section>
        <Link to={`/mentors/${id}`}>
          <Image src={profilepic} height={180} fit="cover" />
        </Link>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={badgeGradient}>
        {badgeText}
      </Badge>

      <Text className={classes.title} fw={500} component={Link} to={`/article/${id}`}>
        {`${first_name} ${last_name}`}
      </Text>

      <div className='text-gray-400 flex justify-start items-center gap-2 mt-2'>
        <IconBriefcase stroke={1.5} style={{ paddingRight: '2px' }} />
        <Text fz="sm" c="dimmed" lineClamp={4}>
          {`${job} at `}
          {/* <span style={{ color: '' }}>{company}</span> */}
        </Text>
      </div>

      <div className='text-gray-400 flex justify-start items-center gap-2 mt-2'>
        <IconBuilding stroke={1.5} style={{ paddingRight: '2px' }} />
        <Text fz="sm" c="dimmed" lineClamp={4}>
          {company}
        </Text>
      </div>

      {companyLogo && (
        <div className='flex justify-start items-center gap-2 mt-2'>
          <Image src={companyLogo} alt={`${company} logo`} width={50} height={50} fit="contain" />
        </div>
      )}

      <Group position="apart" className='space-between' mt="md">
        <Group spacing="xs">
          <Box>
            <Text fz="xs" c="dimmed">Experience</Text>
            <Text fz="sm" fw={500}>{`${experience} years`}</Text>
          </Box>
        </Group>
        <ActionIcon className={classes.action}>
          <IconBookmark style={{ width: rem(20), height: rem(20) }} color={theme.colors.yellow[7]} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
