import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Anchor,
  Alert,
  Skeleton,
  rem,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { IconUser, IconMail, IconLock } from '@tabler/icons-react';
import GoogleButton from './GoogleButton.tsx';
import TwitterButton from './TwitterButton.tsx';
import classes from './AuthenticationTitle.module.css';
import { useContent } from '../../../context/ContentContext.tsx'; // Adjust the import path as needed

const auth = getAuth();

export default function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  const { addNotification } = useContent();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
  
      await sendEmailVerification(firebaseUser);
      console.log('User signed up:', { displayName: `${firstName} ${lastName}`, email: firebaseUser.email });
  
      // Send push notification
      addNotification({
        type: 'announcement',
        title: 'Account Created Successfully',
        link: '/profile',
      });

      setError('Verification email sent! Please check your inbox to confirm your account.');
  
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please try logging in.');
      } else {
        setError(error.message || 'An error occurred during signup. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = "Sign Up | Protocon";
  const pageDescription = "Create an account on Protocon to connect with mentors and start your learning journey.";

  const iconStyle = { width: rem(18), height: rem(18) };
  const userIcon = <IconUser style={iconStyle} />;
  const emailIcon = <IconMail style={iconStyle} />;
  const lockIcon = <IconLock style={iconStyle} />;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://protocon.co.uk/signup" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href="https://protocon.co.uk/signup" />
      </Helmet>

      <Container size={420} my={96}>
        <Title ta="center" className={classes.title}>
          Create an account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Link to="/login">
            <Anchor size="sm" component="button">
              Login
            </Anchor>
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {initialLoading ? (
            <>
              <Skeleton height={36} radius="xl" mb="md" />
              <Skeleton height={36} radius="xl" mb="md" />
              <Skeleton height={36} radius="xl" mb="md" />
              <Skeleton height={36} radius="xl" mb="md" />
              <Skeleton height={50} width="100%" mb="md" />
            </>
          ) : (
            <>
              <Group grow mb="md" mt="md">
                <GoogleButton radius="xl">Google</GoogleButton>
                <TwitterButton radius="xl">Twitter</TwitterButton>
              </Group>

              {error && <Alert color="red" mb="md">{error}</Alert>}

              <form onSubmit={handleSignup}>
                <TextInput
                  label="First Name"
                  placeholder="Your First Name"
                  required
                  leftSection={userIcon}
                  leftSectionPointerEvents="none"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  mb="md"
                />
                <TextInput
                  label="Last Name"
                  placeholder="Your Last Name"
                  required
                  leftSection={userIcon}
                  leftSectionPointerEvents="none"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  mb="md"
                />
                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  required
                  leftSection={emailIcon}
                  leftSectionPointerEvents="none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  mb="md"
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  required
                  leftSection={lockIcon}
                  leftSectionPointerEvents="none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  mb="md"
                />
                <Button type="submit" fullWidth mt="xl" loading={loading}>
                  Sign up
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
}