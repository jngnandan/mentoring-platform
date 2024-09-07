import React, { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Alert,
  Group,
  Anchor,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle, signInWithTwitter } from '../../firebase'; // Import Firebase methods
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase email/password signup
import classes from './AuthenticationTitle.module.css';
import GoogleButton from './GoogleButton.tsx';
import TwitterButton from './TwitterButton.tsx';

export default function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Delay the signup process for half a second
    const timeout = setTimeout(async () => {
      try {
        // Try to create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Optionally, save additional user info to Firebase Firestore (if needed)
        console.log('User signed up:', {
          displayName: `${firstName} ${lastName}`,
          email: firebaseUser.email,
          firebase_uid: firebaseUser.uid,
          created_at: new Date(),
        });

        navigate('/mentors'); // Redirect to home page after successful signup
      } catch (error) {
        // If Firebase says the email is already in use
        if (error.code === 'auth/email-already-in-use') {
          setError('This email is already registered. Please try logging in.');
        } else {
          console.error('Error during signup:', error);
          setError(error.message || 'An error occurred during signup. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }, 500); // Half a second delay

    // Cleanup the timeout on unmount
    return () => clearTimeout(timeout);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Sign up for an account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Link to='/login'>
          <Anchor size="sm" component="button">
            Login
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error && (
          <Alert color="red" mb="md">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSignup}>
          <Group grow mb="md" mt="md">
              <GoogleButton radius="xl" onClick={signInWithGoogle}>Google</GoogleButton>
              <TwitterButton radius="xl" onClick={signInWithTwitter}>Twitter</TwitterButton>
          </Group>
          <TextInput
            label="First Name"
            placeholder="Your First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            label="Last Name"
            placeholder="Your Last Name"
            required
            mt="md"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            mt="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth mt="xl" loading={loading}>
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
