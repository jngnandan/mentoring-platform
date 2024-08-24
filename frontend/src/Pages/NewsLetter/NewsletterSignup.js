import React, { useState } from 'react';
import { TextInput, Button, Container, Title, Text, Paper, Grid } from '@mantine/core';
import axios from 'axios'; // For sending HTTP requests
import '@mantine/core/styles.css';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure the URL matches your backend route
      await axios.post('/newsletter/subscribe', { email });
      setMessage('Thank you for subscribing to our newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error); // Log error for debugging
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container my={40} size="sm">
      <Title align="center" mb="md">Subscribe to our Newsletter</Title>
      <Grid justify="center">
        <Grid.Col span={8} md={8} lg={6}>
          <Paper withBorder shadow="md" p={30} radius="md">
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb="md"
              />
              <Button type="submit" fullWidth mt="xl" disabled={loading}>
                {loading ? 'Submitting...' : 'Subscribe'}
              </Button>
              {message && <Text mt="md" align="center">{message}</Text>}
            </form>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
