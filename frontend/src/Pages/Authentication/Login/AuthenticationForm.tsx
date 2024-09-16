import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
  Skeleton,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from './GoogleButton.tsx';
import TwitterButton from './TwitterButton.tsx';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
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

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();

export default function AuthenticationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in with Firebase:', user);
      navigate('/mentors');
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      console.error('Error during login:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Account does not exist. Please sign up.');
      } else {
        setError(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = "Login | Protocon";
  const pageDescription = "Sign in to Protocon to connect with mentors and start your learning journey.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://protocon.co.uk/login" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href="https://protocon.co.uk/login" />
      </Helmet>

      <Container size={420} my={96}>
        <header>
          <Title ta="center" className={classes.title}>
            Sign in to your account
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{' '}
            <Link to='/signup'>
              <Anchor size="sm" component="button">
                Create account
              </Anchor>
            </Link>
          </Text>
        </header>

        <main>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            {initialLoading ? (
              <>
                <Skeleton height={36} radius="xl" mb="md" />
                <Skeleton height={36} radius="xl" mb="md" />
                <Skeleton height={50} width="100%" mb="md" />
                <Skeleton height={50} width="100%" mb="md" />
                <Group justify="space-between" mt="lg">
                  <Skeleton height={24} width={120} />
                  <Skeleton height={24} width={120} />
                </Group>
                <Skeleton height={36} mt="xl" width="100%" />
              </>
            ) : (
              <>
                <Group grow mb="md" mt="md">
                  <GoogleButton radius="xl">Google</GoogleButton>
                  <TwitterButton radius="xl">Twitter</TwitterButton>
                </Group>

                {error && <Text color="red" size="sm" ta="center" role="alert">{error}</Text>}

                <form onSubmit={handleSubmit}>
                  <TextInput
                    label="Email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    mb="md"
                    aria-label="Email"
                  />
                  <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    mb="md"
                    aria-label="Password"
                  />
                  <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" aria-label="Remember me" />
                    <Link to='/forgot-password'>
                      <Anchor component="button" size="sm">
                        Forgot password?
                      </Anchor>
                    </Link>
                  </Group>
                  <Button type="submit" fullWidth mt="xl" disabled={loading}>
                    Sign in
                  </Button>
                </form>
              </>
            )}
          </Paper>
        </main>
      </Container>
    </>
  );
}