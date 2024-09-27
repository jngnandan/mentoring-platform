import React, { useEffect, useState, useCallback } from 'react';
import {
  Paper, Text, Alert, Group, Button, TextInput, Select, Textarea,
  Notification, MultiSelect, Box, Grid, Skeleton, Modal,
  PillsInput, Pill, Combobox, CheckIcon, useCombobox, Loader
} from '@mantine/core';
import { IconInfoCircle, IconUpload, IconChevronDown, IconBrandLinkedin, IconBrandTwitter, IconTrash } from '@tabler/icons-react';
import { createClient } from '@supabase/supabase-js';
import { getAuth, deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cloudinary configuration
// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//   cloud_name: 'dgcfly5zo',
//   api_key: '176928181688396',
//   api_secret: 'K5nDfwF7QFPLbhKxs8XqUwNgYAk'
// });

const PillsInputField = ({ value = [], onChange, placeholder }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');

  const handleValueSelect = (val) => {
    if (val.trim() !== '' && !value.includes(val.trim())) {
      onChange([...value, val.trim()]);
    }
    setSearch('');
  };

  const handleValueRemove = (val) => {
    onChange(value.filter((v) => v !== val));
  };

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = value
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}
            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder={placeholder}
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && search.trim() !== '') {
                    event.preventDefault();
                    handleValueSelect(search.trim());
                  } else if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>
      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>Type to add new items</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

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
    employment: [],
    profilepic: ''
  });
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setError('No authenticated user found.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', currentUser.email)
        .single();

      if (error) {
        setError('Error fetching profile: ' + error.message);
      } else if (data) {
        setProfile({
          ...data,
          skills: Array.isArray(data.skills) ? data.skills : [],
          hobbies: Array.isArray(data.hobbies) ? data.hobbies : [],
          achievements: Array.isArray(data.achievements) ? data.achievements : [],
          contributions: Array.isArray(data.contributions) ? data.contributions : [],
          employment: Array.isArray(data.employment) ? data.employment : []
        });
      } else {
        setError('No profile data found for the current user.');
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

  const handleInputChange = (name, value) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'protocon');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        handleInputChange('profilepic', data.secure_url);
        setSuccessMessage('Profile picture updated successfully!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        // Delete user data from Supabase
        const { error: supabaseError } = await supabase
          .from('profiles')
          .delete()
          .eq('id', profile.id);

        if (supabaseError) throw supabaseError;

        // Delete user from Firebase
        await deleteUser(user);

        // Navigate to home page or login page
        navigate('/');
      } catch (error) {
        console.error('Error deleting account:', error);
        setError('Failed to delete account. Please try again.');
      } finally {
        setDeleteModalOpen(false);
      }
    } else {
      setError('No authenticated user found.');
    }
  };

  if (loading) {
    return (
      <Paper shadow="sm" p="xl" withBorder mt={56}>
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
    <Paper shadow="sm" p="xl" withBorder mt={56}>
      <Text size="xl" weight={700} mb="lg">Personal Information</Text>

      <Alert icon={<IconInfoCircle size="1.5rem" />} title="Tips" color="blue" mb="lg" radius="md">
        <Text size="sm">
          • Adding your photo and social media profiles helps mentors feel confident that you're a real person.
          <br />
          • Your profile is only visible to mentors that you send applications to. It is not indexed on search engines.
        </Text>
      </Alert>

      <Group mb="lg" align="center">
        <div style={{ position: 'relative', width: '100px', height: '100px' }}>
          {uploadingImage ? (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.7)' }}>
              <Loader size="sm" />
            </div>
          ) : null}
          <img
            src={profile.profilepic || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
            alt="Profile"
            style={{ borderRadius: '4%', width: '100px', height: '100px', objectFit: 'cover' }}
          />
        </div>
        <input
          type="file"
          id="profilePicUpload"
          style={{ display: 'none' }}
          onChange={handlePhotoUpload}
          accept="image/*"
        />
        <label htmlFor="profilePicUpload">
          <Button component="span" leftIcon={<IconUpload size={18} />} variant="outline" size="md">
            Upload Photo
          </Button>
        </label>
      </Group>

      <Grid gutter="md">
        <Grid.Col span={6}>
          <TextInput
            label="First Name"
            placeholder="First Name"
            value={profile.first_name}
            onChange={(e) => handleInputChange('first_name', e.target.value)}
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            value={profile.last_name}
            onChange={(e) => handleInputChange('last_name', e.target.value)}
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Location"
            placeholder="Select Location"
            data={['United Kingdom', 'United States', 'Canada', 'Australia']}
            value={profile.location}
            onChange={(value) => handleInputChange('location', value)}
            rightSection={<IconChevronDown size={14} />}
          />
        </Grid.Col>
      </Grid>

      <TextInput
        label="Job Title"
        placeholder="Job Title"
        value={profile.job}
        onChange={(e) => handleInputChange('job', e.target.value)}
        mt="md"
      />

      <Grid gutter="md" mt="md">
        <Grid.Col span={6}>
          <TextInput
            label="LinkedIn"
            placeholder="LinkedIn URL"
            value={profile.linkedin_url}
            onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
            icon={<IconBrandLinkedin size={18} />}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Twitter"
            placeholder="Twitter URL"
            value={profile.twitter_url}
            onChange={(e) => handleInputChange('twitter_url', e.target.value)}
            icon={<IconBrandTwitter size={18} />}
          />
        </Grid.Col>
      </Grid>

      <Textarea
        label="Profile Summary"
        placeholder="Write a brief summary about yourself"
        value={profile.summary}
        onChange={(e) => handleInputChange('summary', e.target.value)}
        minRows={4}
        mt="md"
        autosize
      />

      <Text size="lg" weight={700} mt="xl" mb="md">Skills</Text>

<Text size="lg" weight={700} mt="xl" mb="md">Skills</Text>
<PillsInputField
  value={profile.skills || []} // Ensure it's an array
  onChange={(value) => handleInputChange('skills', value)}
  placeholder="Add skills"
/>

      <Text size="lg" weight={700} mt="xl" mb="md">Hobbies</Text>
      <PillsInputField
        value={profile.hobbies}
        onChange={(value) => handleInputChange('hobbies', value)}
        placeholder="Add hobbies"
      />

      <Text size="lg" weight={700} mt="xl" mb="md">Achievements</Text>
      <PillsInputField
        value={profile.achievements}
        onChange={(value) => handleInputChange('achievements', value)}
        placeholder="Add achievements"
      />
      <Text size="lg" weight={700} mt="xl" mb="md">Contributions</Text>
      <PillsInputField
        value={profile.contributions}
        onChange={(value) => handleInputChange('contributions', value)}
        placeholder="Add contributions"
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
              handleInputChange('employment', updatedEmployment);
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
              handleInputChange('employment', updatedEmployment);
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
                handleInputChange('employment', updatedEmployment);
              }}
            />
            <TextInput
              label="End Date"
              placeholder="End Date"
              value={job.end_date}
              onChange={(e) => {
                const updatedEmployment = [...profile.employment];
                updatedEmployment[index].end_date = e.target.value;
                handleInputChange('employment', updatedEmployment);
              }}
            />
          </Group>
        </Box>
      ))}
      <Button
        onClick={() => handleInputChange('employment', [...profile.employment, { job: '', company: '', start_date: '', end_date: '' }])}
        variant="outline"
        mb="lg"
      >
        Add Employment
      </Button>

      <Group position="apart" mt="xl">
        <Button onClick={handleUpdateProfile} size="lg">Update Profile</Button>
        <Button 
          color="red" 
          variant='outline'
          leftIcon={<IconTrash size={14} />}
          onClick={() => setDeleteModalOpen(true)}
        >
          Close Account
        </Button>
      </Group>

      {successMessage && (
        <Notification color="green" mt="md" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Notification>
      )}

      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Close your account"
        size="md"
      >
        <Text size="sm" mb="xl">
          Once you delete your account, there's no going back. Please be certain!
        </Text>
        <Button 
          color="red" 
          fullWidth 
          onClick={handleDeleteAccount}
        >
          Delete account
        </Button>
      </Modal>
    </Paper>
  );
}