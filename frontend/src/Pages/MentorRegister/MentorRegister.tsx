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
  Textarea,
  Image,
  FileInput,
  Radio
} from '@mantine/core';
import classes from './MentorRegister.module.css';
import { IconPhoto, IconDownload, IconArrowRight } from '@tabler/icons-react';

import GoogleButton  from './GoogleButton.tsx';
import TwitterButton  from './TwitterButton.tsx';

import { Link } from 'react-router-dom';

export default function MentorRegister() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Tell us about yourself!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Link to='/signup'>
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
        </Link>
      </Text>


   <Group mt="md" position="center" align="center">
      <Group mt="md" position="center" align="center">
      <Radio label="" value="option1" checked />
      <Radio label="" value="option2" />
      <Radio label="" value="option3" />
      <Radio label="" value="option4" />
    </Group>
  </Group>




      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      {/* <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group> */}

      <Group>
      <Image
      radius="md"
      mb={18}
      h={160}
      w={140}
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
    />

{/* <Button leftSection={<IconPhoto size={14} />} variant="default">
        Upload
      </Button> */}

      <FileInput
      leftSection={<IconPhoto size={14} />}
      variant="default"
      label="Upload Image"
      withAsterisk
      // description="Input description"
      // error="Invalid name"
      placeholder="Upload"
    />
      </Group>

      <TextInput label="Name" placeholder="Your Name" required />

        <TextInput label="Email" placeholder="you@email.com" required mt='md'/>
        {/* <PasswordInput label="Password" placeholder="Your password" required mt="md" /> */}
        <TextInput label="Profession" placeholder="Your Profession" required mt='md'/>

        {/* <Textarea
              mt="md"
              label="About yourself"
              placeholder="Please include all relevant information"
              minRows={4}
            /> */}
       
        {/* <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />

          <Link to='/forgot-password'>
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
          </Link>
        </Group> */}
        <Link to='/'>
        <Button fullWidth mt="xl">
          Next
        </Button>
        </Link>
      </Paper>
    </Container>
  );
}