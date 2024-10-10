import React from 'react';
import { Container, Title, Text, ThemeIcon, Paper, Stack, Group, Image, Card, Box } from '@mantine/core';
import { IconBulb, IconUsers, IconBook, IconChartBar, IconNetwork } from '@tabler/icons-react';

export default function AboutProtocon() {
  const offerings = [
    { icon: IconUsers, title: "Personalized Mentorship Matching", description: "Based on skills, goals, and industry" },
    { icon: IconBulb, title: "Virtual Meeting Spaces", description: "For seamless mentor-mentee interactions" },
    { icon: IconBook, title: "Resource Libraries", description: "Curated by industry experts" },
    { icon: IconChartBar, title: "Progress Tracking Tools", description: "To measure and celebrate growth" },
    { icon: IconNetwork, title: "Networking Opportunities", description: "With professionals across various fields" },
  ];

  return (
    <Container size="lg" py="xl" className="my-12">
      <Paper withBorder shadow="md" p="xl" radius="sm">
        <Stack spacing="xl">
          <Group position="center" spacing="lg">
            {/* <Image
              src="/protocon-logo.png"  // Replace with actual logo path
              alt="Protocon Logo"
              width={60}
              height={60}
            /> */}
            <Title order={1} align="center" sx={(theme) => ({
              fontSize: theme.fontSizes.xl * 2,
              fontWeight: 700,
              color: theme.colors.blue[7],
            })}>
              About Protocon
            </Title>
          </Group>

          <Box p="lg" >
            <Title order={2} size="h3" mb="md" color="blue">Welcome to Protocon</Title>
            <Text size="md">
              Founded in 2024, Protocon is on a mission to revolutionize mentorship across various professional fields.
              We believe that knowledge sharing and guided learning are key to personal and professional development.
            </Text>
          </Box>
          <hr/>
          
          <Box p="lg" radius="sm" withBorder>
            <Title order={3} size="h4" mb="md" color="blue">Our Mission</Title>
            <Text size="md">
              At Protocon, we're committed to fostering a community where knowledge flows freely and every interaction
              opens doors to new possibilities. Join us in shaping the future of professional development through
              meaningful mentorship connections.
            </Text>
          </Box>
          <hr/>


          <Box p="lg" radius="sm" withBorder>
            <Title order={3} size="h4" mb="md" color="blue">What We Do</Title>
            <Text size="md">
              Our platform connects aspiring professionals with experienced mentors, creating a dynamic ecosystem of
              learning and collaboration. Whether you're looking to advance in tech, business, arts, or any other field,
              Protocon provides the tools and connections you need to thrive.
            </Text>
          </Box>
          <hr/>


          <Box p="lg" radius="sm" withBorder>
            <Title order={3} size="h4" mb="md" color="blue">What We Offer</Title>
            <Stack spacing="md">
              {offerings.map((item, index) => (
                <Group key={index} noWrap align="flex-start" spacing="md">
                  <ThemeIcon size={40} radius="sm" variant="light" color="blue">
                    <item.icon size={24} />
                  </ThemeIcon>
                  <div>
                    <Text weight={600} size="md">{item.title}</Text>
                    <Text size="sm" color="dimmed">{item.description}</Text>
                  </div>
                </Group>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}