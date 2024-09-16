import React, { useState, useEffect } from 'react';
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
  Loader,
  Skeleton,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle, signInWithTwitter } from '../../../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
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
  const [authChecking, setAuthChecking] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/mentors');
      }
      setAuthChecking(false);
    });

    // Simulate initial loading
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 400);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        console.log('User signed up:', { displayName: `${firstName} ${lastName}`, email: firebaseUser.email });
        navigate('/mentors');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setError('This email is already registered. Please try logging in.');
        } else {
          setError(error.message || 'An error occurred during signup. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timeout);
  };

  if (authChecking) {
    return (
      <div className='flex flex-row justify-center items-center'>
        <Container size={420} my={40}>
          <Loader size="lg" variant="dots" />
        </Container>
      </div>
    );
  }

  const FormContent = () => (
    <>
      {error && <Alert color="red" mb="md">{error}</Alert>}
      <form onSubmit={handleSignup}>
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl" onClick={signInWithGoogle}>Google</GoogleButton>
          <TwitterButton radius="xl" onClick={signInWithTwitter}>Twitter</TwitterButton>
        </Group>
        <TextInput label="First Name" placeholder="Your First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextInput label="Last Name" placeholder="Your Last Name" required mt="md" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <TextInput label="Email" placeholder="you@example.com" required mt="md" value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" fullWidth mt="xl" loading={loading}>Sign up</Button>
      </form>
    </>
  );

  const FormSkeleton = () => (
    <>
      <Skeleton height={36} radius="sm" mb="md" />
      <Skeleton height={36} radius="sm" mb="md" />
      <Skeleton height={50} radius="sm" mb="md" />
      <Skeleton height={50} radius="sm" mb="md" />
      <Skeleton height={50} radius="sm" mb="md" />
      <Skeleton height={50} radius="sm" mb="md" />
      <Skeleton height={36} radius="sm" mt="xl" />
    </>
  );

  return (
    <Container size={420} my={96}>
      <Title ta="center" className={classes.title}>Sign up for an account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Link to='/login'>
          <Anchor size="sm" component="button">Login</Anchor>
        </Link>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {initialLoading ? <FormSkeleton /> : <FormContent />}
      </Paper>
    </Container>
  );
}