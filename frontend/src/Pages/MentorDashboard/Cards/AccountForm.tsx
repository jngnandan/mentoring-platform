import React, { useEffect, useState } from 'react';
import {
  Paper, Text, Alert, Group, Button, Image, TextInput, Select, Textarea,
  Checkbox, Notification, MultiSelect, Chip, ActionIcon, Box, Grid, Skeleton
} from '@mantine/core';
import { IconInfoCircle, IconUpload, IconChevronDown, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AccountForm() {
  const [profile, setProfile] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    location: '',
    job: '',
    linkedin_url: '',
    twitter_url: '',
    summary: '',
    skills: [],
    hobbies: [],
    achievements: [],
    contributions: [],
    employment: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);

      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 400));

      if (error) {
        setError('Error fetching profile: ' + error.message);
      } else if (data.length > 0) {
        const fetchedProfile = data[0];
        setProfile({
          ...fetchedProfile,
          skills: Array.isArray(fetchedProfile.skills) ? fetchedProfile.skills : [],
          hobbies: Array.isArray(fetchedProfile.hobbies) ? fetchedProfile.hobbies : [],
          achievements: Array.isArray(fetchedProfile.achievements) ? fetchedProfile.achievements : [],
          contributions: Array.isArray(fetchedProfile.contributions) ? fetchedProfile.contributions : [],
          employment: Array.isArray(fetchedProfile.employment) ? fetchedProfile.employment : []
        });
      } else {
        setError('No profile data found.');
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', profile.id);

    if (error) {
      setError('Error updating profile: ' + error.message);
      setSuccessMessage('');
    } else {
      setSuccessMessage('Profile updated successfully!');
      setError('');
    }
  };

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
  };

  if (loading) {
    return (
      <Paper shadow="sm" p="xl" withBorder>
        <Skeleton height={30} width="50%" mb="xl" />
        <Skeleton height={100} mb="xl" />
        <Group mb="lg" align="center">
          <Skeleton circle height={100} />
          <Skeleton height={36} width={120} />
        </Group>
        <Grid gutter="md">
          {[...Array(4)].map((_, index) => (
            <Grid.Col span={6} key={index}>
              <Skeleton height={36} mb="md" />
            </Grid.Col>
          ))}
        </Grid>
        <Skeleton height={36} mt="md" mb="md" />
        <Skeleton height={120} mb="xl" />
        <Skeleton height={30} width="30%" mb="md" />
        <Skeleton height={36} mb="xl" />
        <Skeleton height={30} width="30%" mb="md" />
        <Skeleton height={36} mb="xl" />
        <Skeleton height={30} width="30%" mb="md" />
        <Skeleton height={100} mb="xl" />
        <Skeleton height={30} width="30%" mb="md" />
        <Skeleton height={100} mb="xl" />
        <Skeleton height={36} width={120} ml="auto" />
      </Paper>
    );
  }

  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data found.</div>;

  return (
    <Paper shadow="sm" p="xl" withBorder>
      <Text size="xl" weight={700} mb="lg">Personal Information</Text>

      <Alert icon={<IconInfoCircle size="1.5rem" />} title="Tips" color="blue" mb="lg" radius="md">
        <Text size="sm">
          • Adding your photo and social media profiles helps mentors feel confident that you're a real person.
          <br />
          • Your profile is only visible to mentors that you send applications to. It is not indexed on search engines.
        </Text>
      </Alert>

      <Group mb="lg" align="center">
  <img
    src={profile.profilepic || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
    alt="Profile"
    style={{ borderRadius: '4%'}}
    withBoarder
    sizes='lg'
  />
  <Button leftIcon={<IconUpload size={18} />} variant="outline" size="md">
    Upload Photo
  </Button>
</Group>

      <Grid gutter="md">
        <Grid.Col span={6}>
          <TextInput
            label="First Name"
            placeholder="First Name"
            value={profile.first_name}
            onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            value={profile.last_name}
            onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Location"
            placeholder="Select Location"
            data={['United Kingdom', 'United States', 'Canada', 'Australia']}
            value={profile.location}
            onChange={(value) => setProfile({ ...profile, location: value })}
            rightSection={<IconChevronDown size={14} />}
          />
        </Grid.Col>
      </Grid>

      <TextInput
        label="Job Title"
        placeholder="Job Title"
        value={profile.job}
        onChange={(e) => setProfile({ ...profile, job: e.target.value })}
        mt="md"
      />

      <Grid gutter="md" mt="md">
        <Grid.Col span={6}>
          <TextInput
            label="LinkedIn"
            placeholder="LinkedIn URL"
            value={profile.linkedin_url}
            onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
            icon={<IconBrandLinkedin size={18} />}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Twitter"
            placeholder="Twitter URL"
            value={profile.twitter_url}
            onChange={(e) => setProfile({ ...profile, twitter_url: e.target.value })}
            icon={<IconBrandTwitter size={18} />}
          />
        </Grid.Col>
      </Grid>

      <Textarea
        label="Profile Summary"
        placeholder="Write a brief summary about yourself"
        value={profile.summary}
        onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
        minRows={4}
        mt="md"
        autosize
      />

      <Text size="lg" weight={700} mt="xl" mb="md">Skills</Text>
      <Group spacing={5} mb="sm">
        {profile.skills.map((skill, index) => (
          <Chip
            key={index}
            checked={true}
            variant="filled"
            onDelete={() => removeSkill(skill)}
          >
            {skill}
          </Chip>
        ))}
      </Group>
      <Group>
        <TextInput
          placeholder="Add a new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          style={{ flex: 1 }}
        />
        <Button onClick={addSkill}>Add Skill</Button>
      </Group>

      <Text size="lg" weight={700} mt="xl" mb="md">Hobbies</Text>
      <MultiSelect
        data={profile.hobbies}
        placeholder="Select or add hobbies"
        searchable
        creatable
        getCreateLabel={(query) => `+ Add ${query}`}
        onCreate={(query) => {
          const item = { value: query, label: query };
          setProfile({ ...profile, hobbies: [...profile.hobbies, query] });
          return item;
        }}
        value={profile.hobbies}
        onChange={(value) => setProfile({ ...profile, hobbies: value })}
      />

      <Text size="lg" weight={700} mt="xl" mb="md">Achievements</Text>
      <Textarea
        placeholder="List your achievements"
        value={profile.achievements.join('\n')}
        onChange={(e) => setProfile({ ...profile, achievements: e.target.value.split('\n') })}
        minRows={3}
      />

      <Text size="lg" weight={700} mt="xl" mb="md">Contributions</Text>
      <Textarea
        placeholder="List your contributions"
        value={profile.contributions.join('\n')}
        onChange={(e) => setProfile({ ...profile, contributions: e.target.value.split('\n') })}
        minRows={3}
      />

      <Text size="lg" weight={700} mt="xl" mb="md">Employment History</Text>
      {profile.employment.map((job, index) => (
        <Box key={index} mb="lg" p="md" style={{ border: '1px solid #eee', borderRadius: '4px' }}>
          <TextInput
            label="Job Title"
            placeholder="Job Title"
            value={job.job}
            onChange={(e) => {
              const updatedEmployment = [...profile.employment];
              updatedEmployment[index].job = e.target.value;
              setProfile({ ...profile, employment: updatedEmployment });
            }}
            mb="sm"
          />
          <TextInput
            label="Company"
            placeholder="Company"
            value={job.company}
            onChange={(e) => {
              const updatedEmployment = [...profile.employment];
              updatedEmployment[index].company = e.target.value;
              setProfile({ ...profile, employment: updatedEmployment });
            }}
            mb="sm"
          />
          <Group grow>
            <TextInput
              label="Start Date"
              placeholder="Start Date"
              value={job.start_date}
              onChange={(e) => {
                const updatedEmployment = [...profile.employment];
                updatedEmployment[index].start_date = e.target.value;
                setProfile({ ...profile, employment: updatedEmployment });
              }}
            />
            <TextInput
              label="End Date"
              placeholder="End Date"
              value={job.end_date}
              onChange={(e) => {
                const updatedEmployment = [...profile.employment];
                updatedEmployment[index].end_date = e.target.value;
                setProfile({ ...profile, employment: updatedEmployment });
              }}
            />
          </Group>
        </Box>
      ))}
      <Button
        onClick={() => setProfile({
          ...profile,
          employment: [...profile.employment, { job: '', company: '', start_date: '', end_date: '' }]
        })}
        variant="outline"
        mb="lg"
      >
        Add Employment
      </Button>

      <Group position="right" mt="xl">
        <Button onClick={handleUpdateProfile} size="lg">Update Profile</Button>
      </Group>

      {successMessage && (
        <Notification color="green" mt="md" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Notification>
      )}
    </Paper>
  );
}