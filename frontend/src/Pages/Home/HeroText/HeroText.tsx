import React, { useState } from 'react';
import { Title, Text, Container, Tabs, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Dots } from './Dots.tsx';

export function HeroText() {
  const [activeTab, setActiveTab] = useState('mentee');

  return (
    // <section className="relative py-20 bg-gradient-to-b from-black-300 to-white">
      <section className="relative py-20 bg-gradient-to-b from-white to-white flex items-center justify-center">

      <Dots className="absolute left-0 top-0 text-blue-200 opacity-50" />
      {/* <Dots className="absolute left-60 top-0 text-blue-200 opacity-50" /> */}
      {/* <Dots className="absolute left-0 top-300 text-blue-200 opacity-50" /> */}
      {/* <Dots className="absolute right-0 top-60 text-blue-200 opacity-50" /> */}
      <Dots className="absolute right-0 top-160 text-blue-200 opacity-50" />
      
      <Container className="relative z-10 max-w-7xl mx-auto px-4">
      <Tabs value={activeTab} onChange={setActiveTab} className="mb-8 flex justify-center max-w-[165px] mx-auto">          <Tabs.List>
            <Tabs.Tab value="mentee" className="px-4 py-2 text-lg font-medium">Mentee</Tabs.Tab>
            <Tabs.Tab value="mentor" className="px-4 py-2 text-lg font-medium">Mentor</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        {/* <Tabs value={activeTab} onChange={setActiveTab} className={classes.tabs}>
        <Tabs.List>
          <Tabs.Tab value="mentee">Mentee</Tabs.Tab>
          <Tabs.Tab value="mentor">Mentor</Tabs.Tab>
        </Tabs.List>
      </Tabs> */}
        
        {activeTab === 'mentee' && (
          <div className="text-center">
            <Title className="text-4xl font-bold mb-4">
              Reach your goals faster with expert mentors
            </Title>
            <div className='mt-4'>
            <Text className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Accelerate your professional growth with 1:1 expert guidance or group mentorship in our community.
            </Text>
            </div>

            <Group justify="center" className="mt-8">
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
          <div className="text-center">
            <Title className="text-4xl font-bold mb-4">
              Your next chapter, made possible by mentoring
            </Title>
            <Text className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Build confidence as a leader, grow your network, and define your legacy.
            </Text>
            <Group justify="center" className="mt-8">
              <Button
                component={Link}
                to="/mentor-register"
                size="md"
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white"
              >
                Become a Mentor
              </Button>
            </Group>
          </div>
        )}
        
        <Text size="sm" mt={8} className="text-center text-gray-500 mt-4">
          Proven success with our top mentors
        </Text>
      </Container>
    </section>
  );
}