import React, { useRef, useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Button,
  Stack,
  Flex,
} from "@mantine/core";
import { IconStar, IconGift } from "@tabler/icons-react";
import { Link } from "react-router-dom";

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
  skills?: string; // Change this to string
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
  skills = "[]", // Default to an empty array as a string
}: ProfileCardProps) {
  const name = `${first_name} ${last_name}`;
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0% 0px 0% 0px",
        threshold: 0,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Parse skills string into an array
  const skillArray = JSON.parse(skills); // Parse the skills string

  return (
    <Link to={`/mentors/${id}`}>
      <Card
        withBorder
        radius="md"
        p="md"
        className={`relative m-3 transition-all duration-500 ease-out opacity-100 scale-100`}
        ref={cardRef}
      >
        <Flex gap="md">
          {profilepic && (
            <Link to={`/mentors/${id}`}>
              <Image
                src={profilepic}
                height={180}
                fit="cover"
                radius="md"
                className="rounded-md transition-transform duration-100 active:scale-95"
                alt={`${name}'s profile picture`}
                styles={{
                  image: {
                    transition: "transform 0.1s ease-in-out",
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                  },
                }}
              />
            </Link>
          )}
          <Stack spacing="xs">
            <Group position="apart" align="flex-start">
              <div>
                <Text size="xl" weight={700}>
                  {name}
                </Text>
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
          <IconGift
            size={16}
            style={{ verticalAlign: "middle", marginRight: "5px" }}
          />
          FREE INTRO CALL: Set up a free 20 minute introductory call here:{" "}
          <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkUrl}
          </a>
        </Text>
        {skillArray.length > 0 && (
          <Group mt="md" spacing="xs">
            {skillArray
              .slice(0, 5)
              .map((skill, index) => (
                <Badge key={index} variant="light" size="sm">
                  {skill}
                </Badge>
              ))}
            {skillArray.length > 5 && (
              <Text size="md" color="dimmed">
                +{skillArray.length - 5} more
              </Text>
            )}
          </Group>
        )}
        <Flex justify="space-between" align="center" mt="xl">
          <div>
            <Text size="xs" color="dimmed">
              Experience
            </Text>
            <Text size="xl" weight={700}>
              {experience}
              <Text span size="sm" weight={400}>
                {" "}
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