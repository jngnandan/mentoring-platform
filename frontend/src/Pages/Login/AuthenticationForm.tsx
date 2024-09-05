import React, { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Loader,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import GoogleButton from './GoogleButton.tsx';
import TwitterButton from './TwitterButton.tsx';
import { createClient } from '@supabase/supabase-js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth
import { initializeApp, getApps } from 'firebase/app'; // Check for initialized Firebase apps
import classes from './AuthenticationTitle.module.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoY2fik2B0taRXfxOQys8s0RdZt1LQutM",
  authDomain: "mentor-platform-b5786.firebaseapp.com",
  projectId: "mentor-platform-b5786",
  storageBucket: "mentor-platform-b5786.appspot.com",
  messagingSenderId: "910214703887",
  appId: "1:910214703887:web:314fe4329fa49858c4ac7a",
  measurementId: "G-NRTRCXHBSC"
};

// Initialize Firebase app only if there are no apps already initialized
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Initialize Supabase client
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);
const auth = getAuth(); // Get Firebase Auth instance

export default function AuthenticationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign in with Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User signed in with Firebase:', user);

      // Check if the user exists in the Supabase users table
      const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email) // Check by email
        .single();

      if (userError && userError.code !== 'PGRST116') {
        console.error('Error checking user in Supabase:', userError);
        throw userError; // If any unexpected error occurs
      }

      // If user doesn't exist in Supabase, insert them into the users table
      if (!existingUser) {
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([
            {
              email: user.email,
              name: user.displayName || '', // Use Firebase user metadata
              image: user.photoURL || '', // Use Firebase user profile picture if available
              provider: 'firebase', // Specify the provider as Firebase
            },
          ]);

        if (insertError) {
          console.error('Error inserting new user into Supabase:', insertError);
          throw insertError;
        }

        console.log('New user inserted into Supabase:', newUser);
      } else {
        console.log('User already exists in Supabase:', existingUser);
      }

      // Clear form fields after successful login
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      console.error('Error during login:', err);

      // Specific handling for operation-not-allowed Firebase auth error
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/password authentication is not enabled.');
      } else {
        setError(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Link to='/signup'>
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        {error && <Text color="red" size="sm" ta="center">{error}</Text>}

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mb="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Link to='/forgot-password'>
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Link>
          </Group>
          <Button type="submit" fullWidth mt="xl" disabled={loading}>
            {loading ? <Loader size="sm" /> : 'Sign in'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}