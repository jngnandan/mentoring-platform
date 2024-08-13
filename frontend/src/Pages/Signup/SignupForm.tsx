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
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';

import GoogleButton  from './GoogleButton.tsx';
import TwitterButton  from './TwitterButton.tsx';

import { Link } from 'react-router-dom';

export default function SignupForm() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Signup your account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do you already have an account?{' '}
        
        <Link to='/login'>
        <Anchor size="sm" component="button">
          Login
        </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>
      <TextInput label="First Name" placeholder="Your First Name" required />
      <TextInput label="Last Name" placeholder="Your Last Name" required mt="md"/>


        <TextInput label="Email" placeholder="you@mantine.dev" required mt="md"/>
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />

          {/* <Link to='/forgot-password'>
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
          </Link> */}
        </Group>
        <Link to='/'>
        <Button fullWidth mt="xl">
          Sign up
        </Button>
        </Link>
      </Paper>
    </Container>
  );
}