import React from 'react';
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
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
}

export function ArticleCard({
  imageUrl,
  linkUrl,
  title,
  description,
  authorName,
  authorAvatar,
  badgeText = 'Featured',
  badgeGradient = { from: 'blue', to: 'cyan' },
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

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {description}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Avatar src={authorAvatar} size={24} radius="xl" mr="xs" />
          <Text fz="sm" inline>
            {authorName}
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          <ActionIcon className={classes.action}>
            <IconHeart style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconBookmark
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[7]}
            />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconShare style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
