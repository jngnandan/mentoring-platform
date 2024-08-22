import React, { useState } from 'react';
import { Title, Text, Container, Tabs, TextInput, Button, Group } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './HeroText.module.css';
import { Link } from 'react-router-dom';
import { Dots } from './Dots.tsx';

export function HeroText() {
  const [activeTab, setActiveTab] = useState('mentee');

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 160 }} />


      <Tabs value={activeTab} onChange={setActiveTab} className={classes.tabs}>
        <Tabs.List>
          <Tabs.Tab value="mentee">Mentee</Tabs.Tab>
          <Tabs.Tab value="mentor">Mentor</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {activeTab === 'mentee' && (
        <div className={classes.inner}>
          <Title className={classes.title}>
            Reach your goals faster with expert mentors
          </Title>

          <Text className={classes.description}>
            Accelerate your professional growth with 1:1 expert guidance or group mentorship in our community.
          </Text>

          {/* <TextInput
            icon={<IconSearch size="1.1rem" stroke={1.5} />}
            radius="xl"
            size="md"
            placeholder="What do you want to get better at?"
            rightSection={<Button radius="xl">Search</Button>}
            rightSectionWidth={100}
            className={classes.search}
          /> */}

          <Group justify="center" mt="xl" className={classes.controls}>
            <Button component={Link} to="/mentors" size="md" variant="outline" color="gray">
              View Mentors
            </Button>
            <Button component={Link} to="/about" size="md">
              Know More
            </Button>
          </Group>
        </div>
      )}

      {activeTab === 'mentor' && (
        <div className={classes.inner}>
          <Title className={classes.title}>
            Your next chapter, made possible by mentoring
          </Title>

          <Text className={classes.description}>
            Build confidence as a leader, grow your network, and define your legacy.
          </Text>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button
              component={Link}
              to="/mentor-register"
              size="md"
              // style={{
              //   background: 'linear-gradient(90deg, rgba(255,83,83,1) 0%, rgba(255,61,137,1) 100%)',
              //   color: 'white'
              // }}
            >
              Become a Mentor
            </Button>
          </div>
        </div>

      )}

      <Text size="sm" className={classes.footer}>
        Proven success with our top mentors
      </Text>
    </Container>
  );
}
