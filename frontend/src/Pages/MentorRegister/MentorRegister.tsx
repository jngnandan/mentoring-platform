import React, { useState } from 'react';
import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Image,
  FileInput,
  Radio,
  Grid,
  
} from '@mantine/core';
import { DateInput, DatePicker } from '@mantine/dates';
// import DatePicker from 'react-datepicker';

import { IconPhoto } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './MentorRegister.module.css';

export default function MentorRegister() {
  const [selectedOption, setSelectedOption] = useState<string>('option1');

  const [value, setValue] = useState<Date[]>([]);

  const handleNextClick = () => {
    const options = ['option1', 'option2', 'option3', 'option4'];
    const currentIndex = options.indexOf(selectedOption);
    const nextIndex = (currentIndex + 1) % options.length;
    setSelectedOption(options[nextIndex]);
  };

  return (
    <Container size={700} my={70}>
      <Title ta="center" className={classes.title}>
        Tell us about yourself!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Link to='/signup'>
          <Button variant="subtle" size="sm">
            Create account
          </Button>
        </Link>
      </Text>

      <div className="flex flex-row justify-center items-center">
        <Group mt="md" position="center" align="center">
          <Radio 
            // label="Option 1" 
            value="option1" 
            checked={selectedOption === 'option1'} 
            onChange={() => setSelectedOption('option1')} 
          />
          <Radio 
            // label="Option 2" 
            value="option2" 
            checked={selectedOption === 'option2'} 
            onChange={() => setSelectedOption('option2')} 
          />
          <Radio 
            // label="Option 3" 
            value="option3" 
            checked={selectedOption === 'option3'} 
            onChange={() => setSelectedOption('option3')} 
          />
          <Radio 
            // label="Option 4" 
            value="option4" 
            checked={selectedOption === 'option4'} 
            onChange={() => setSelectedOption('option4')} 
          />
        </Group>
      </div>

      {/* Option 1: Paper */}
      {selectedOption === 'option1' && (
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Grid gutter="lg">
            <Grid.Col span={4}>
              <Group position="center">
                <Image
                  radius="md"
                  mb={18}
                  h={160}
                  w={140}
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
                />
                <FileInput
                  leftSection={<IconPhoto size={14} />}
                  variant="default"
                  label="Upload Profile Picture"
                  withAsterisk
                  placeholder="Upload"
                />
              </Group>
            </Grid.Col>
            <Grid.Col span={8}>
              <TextInput label="Full Name" placeholder="Your Full Name" required />
              <TextInput label="Email" placeholder="you@email.com" required mt="md" />
              <TextInput label="Profession" placeholder="Your Profession" required mt="md" />
              <Button fullWidth mt="xl" onClick={handleNextClick}>
                Next
              </Button>
            </Grid.Col>
          </Grid>
        </Paper>
      )}

      {/* Option 2: Paper */}
      {selectedOption === 'option2' && (
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Grid gutter="lg">
            <Grid.Col span={4}>
              <Group position="center">
                <Image
                  radius="md"
                  mb={18}
                  h={160}
                  w={140}
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
                />
                <FileInput
                  leftSection={<IconPhoto size={14} />}
                  variant="default"
                  label="Upload Avatar"
                  withAsterisk
                  placeholder="Upload"
                />            
            </Group>
            </Grid.Col>
            <Grid.Col span={8}>
              <TextInput label="Company Name" placeholder="Your Company" required />
              <TextInput label="Email Address" placeholder="email@example.com" required mt="md" />
              <DatePicker type="multiple" value={value} onChange={setValue} />
              <TextInput label="Email Address" placeholder="email@example.com" required mt="md" />
              <TextInput label="Job Title" placeholder="Your Job Title" required mt="md" />
              <Button fullWidth mt="xl" onClick={handleNextClick}>
                Next
              </Button>
            </Grid.Col>
          </Grid>
        </Paper>
      )}

      {/* Option 3: Paper */}
      {selectedOption === 'option3' && (
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Grid gutter="lg">
            <Grid.Col span={4}>
              <Group position="center">
                <Image
                  radius="md"
                  mb={18}
                  h={160}
                  w={140}
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
                />
                <FileInput
                  leftSection={<IconPhoto size={14} />}
                  variant="default"
                  label="Upload Image"
                  withAsterisk
                  placeholder="Upload"
                />
              </Group>
            </Grid.Col>
            <Grid.Col span={8}>
              <TextInput label="First Name" placeholder="Your First Name" required />
              <TextInput label="Email ID" placeholder="you@example.com" required mt="md" />
              {/* <DateInput clearable defaultValue={new Date()} label="Date input" placeholder="Date input" /> */}
              <TextInput label="Your Role" placeholder="Your Role" required mt="md" />
              <Button fullWidth mt="xl" onClick={handleNextClick}>
                Next
              </Button>
            </Grid.Col>
          </Grid>
        </Paper>
      )}

      {/* Option 4: Paper */}
      {selectedOption === 'option4' && (
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Grid gutter="lg">
            <Grid.Col span={4}>
              <Group position="center">
                <Image
                  radius="md"
                  mb={18}
                  h={160}
                  w={140}
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
                />
                <FileInput
                  leftSection={<IconPhoto size={14} />}
                  variant="default"
                  label="Upload Photo"
                  withAsterisk
                  placeholder="Upload"
                />
              </Group>
            </Grid.Col>
            <Grid.Col span={8}>
              <TextInput label="Your Name" placeholder="Enter Your Name" required />
              <TextInput label="Contact Email" placeholder="contact@example.com" required mt="md" />
              <TextInput label="Position" placeholder="Your Position" required mt="md" />
              <Button fullWidth mt="xl" onClick={handleNextClick}>
                Next
              </Button>
            </Grid.Col>
          </Grid>
        </Paper>
      )}
    </Container>
  );
}
