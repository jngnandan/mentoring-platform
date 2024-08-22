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
  imageUrl: string;
  linkUrl: string;
  title: string;
  description: string;
  authorName: string;
  authorAvatar: string;
  badgeText?: string;
  badgeGradient?: { from: string; to: string };
  job: string;
}

export default function ArticleCard({
  imageUrl,
  linkUrl,
  title,
  description,
  authorName,
  authorAvatar,
  badgeText = 'Featured',
  badgeGradient = { from: 'blue', to: 'cyan' },
  job,
}: ArticleCardProps) {
  const linkProps = { href: linkUrl, target: '_blank', rel: 'noopener noreferrer' };
  const theme = useMantineTheme();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <a {...linkProps}>
          <Image src={imageUrl} height={180} />
        </a>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={badgeGradient}>
        {badgeText}
      </Badge>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {title}
      </Text>

      <div className='flex flex-row justify-start items-start mt-1'>
        <IconBriefcase stroke={1} size={30}/>
        <Text fz="sm" c="dimmed" lineClamp={4} ml={4}>
          {description}
        </Text>
      </div>

      <Group justify="space-between" className={classes.footer}>
        <Box pl={0}>
          <Text fz="xs" c="dimmed">
            Experience
          </Text>
          <Text fz="sm">
            {authorName}
          </Text>
        </Box>
        <Group mr={0}>
          <ActionIcon className={classes.action}>
            <IconBookmark
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[7]}
            />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}