import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  TextInput,
  Textarea,
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
  Accordion,
  PillsInput,
  Pill,
  Combobox,
  CheckIcon,
  useCombobox,
  Stack,
  ActionIcon,
  Loader,
  Select,
  Autocomplete,
  AutocompleteProps,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconBrandAngular, IconBrandReact, IconBrandVue, IconBriefcase, IconTools,  IconChartBar, IconCode, IconLoader, IconPhoto, IconRocket, IconTrash, IconUser, IconCurrencyDollar, IconUserPlus, IconChartPie, IconHeartbeat, IconGavel, IconSchool, IconHome, IconHeadset, IconTruck, IconClipboardList, IconMicroscope, IconDeviceLaptop, IconPhone, IconCheck, IconUpload } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import { getAuth } from 'firebase/auth';
import { debounce } from 'lodash';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
// const cloudinary = require('cloudinary').v2;


// import React, { useState } from 'react';
// import { PillsInput, Pill, Combobox, Group, useCombobox, Text, Stack } from '@mantine/core';
// import { IconCheck } from '@tabler/icons-react';

const PillsInputField = ({ value = [], onChange, placeholder, description }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');

  const handleValueSelect = (val: string) => {
    if (val.trim() !== '' && !value.includes(val.trim())) {
      onChange([...value, val.trim()]);
    }
    setSearch('');
  };

  const handleValueRemove = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  const values = Array.isArray(value) ? value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  )) : [];

  const options = Array.isArray(value) ? value
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item}>
        <Group gap="sm">
          {value.includes(item) ? <IconCheck size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    )) : [];

  return (
    <Stack >
            {description && <Text size="xs" color="dimmed">{description}</Text>}
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
    </Stack>
  );
};

// export default PillsInputField;

const careerFields = [
  { value: 'Engineering', label: 'Engineering', icon: IconBriefcase },
  { value: 'Design', label: 'Design', icon: IconTools },
  { value: 'Marketing', label: 'Marketing', icon: IconChartBar },
  { value: 'Sales', label: 'Sales', icon: IconUser },
  { value: 'Product Management', label: 'Product Management', icon: IconRocket },
  { value: 'Finance', label: 'Finance', icon: IconCurrencyDollar }, // Finance-related careers
  { value: 'Human Resources', label: 'Human Resources', icon: IconUserPlus }, // HR roles
  { value: 'Data Science', label: 'Data Science', icon: IconChartPie }, // Data science field
  { value: 'Information Technology', label: 'Information Technology', icon: IconDeviceLaptop }, // IT careers
  { value: 'Healthcare', label: 'Healthcare', icon: IconHeartbeat }, // Healthcare professions
  { value: 'Legal', label: 'Legal', icon: IconGavel }, // Legal careers
  { value: 'Education', label: 'Education', icon: IconSchool }, // Educational roles
  { value: 'Real Estate', label: 'Real Estate', icon: IconHome }, // Real estate field
  { value: 'Customer Service', label: 'Customer Service', icon: IconHeadset }, // Customer service roles
  { value: 'Logistics', label: 'Logistics', icon: IconTruck }, // Logistics and supply chain
  { value: 'Administration', label: 'Administration', icon: IconClipboardList }, // Administrative roles
  { value: 'Public Relations', label: 'Public Relations', icon: IconPhone }, // PR field
  { value: 'Research', label: 'Research', icon: IconMicroscope }, // Research careers
];


// Render each option in the autocomplete dropdown
const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
  const Icon = option.icon; // Get the icon for the current option
  return (
    <Group gap="sm">
      <Icon size={18} style={{ marginRight: 10 }} /> {/* Career field icon */}
      <Text size="sm">{option.label}</Text> {/* Display only the career field name */}
    </Group>
  );
};

export default function MentorRegister() {
  const [selectedOption, setSelectedOption] = useState('option1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    job: '',
    summary: '',
    company: '',
    profilepic: null,
    hobbies: [],
    achievements: [],
    contributions: [],
    x_url: '',
    linkedin_url: '',
    employment: [],
    skills: [],
    availability: {
      weekly: {
        Monday: { times: [], enabled: false },
        Tuesday: { times: [], enabled: false },
        Wednesday: { times: [], enabled: false },
        Thursday: { times: [], enabled: false },
        Friday: { times: [], enabled: false },
        Saturday: { times: [], enabled: false },
        Sunday: { times: [], enabled: false },
      },
      specificDates: [],
      category: [],
    },
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const user = auth.currentUser;
      if (user) {
        setFormData(prevData => ({
          ...prevData,
          email: user.email || ''
        }));
      } else {
        navigate('/login');
      }
      setLoading(false);
    };

    fetchUserEmail();
  }, [auth, navigate]);

  const checkUsernameAvailability = useCallback(
    debounce(async (username) => {
      if (username.length > 0) {
        setIsCheckingUsername(true);
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('username', username)
            .single();

          if (error && error.code !== 'PGRST116') {
            throw error;
          }

          if (data) {
            setErrors(prev => ({ ...prev, username: 'This username is already taken' }));
          } else {
            setErrors(prev => ({ ...prev, username: '' }));
          }
        } catch (error) {
          console.error('Error checking username:', error);
        } finally {
          setIsCheckingUsername(false);
        }
      }
    }, 300),
    []
  );

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));

    if (name === 'username') {
      checkUsernameAvailability(value);
    }
  };

  const validateCurrentStep = async () => {
    const newErrors = {};
    const requiredFields = {
      option1: ['username', 'first_name', 'last_name'],
      option2: ['category','job', 'company', 'summary'],
      option3: ['skills'],
      option4: []
    };

    for (const field of requiredFields[selectedOption]) {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        newErrors[field] = `Please enter your ${field.replace('_', ' ')}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      const options = ['option1', 'option2', 'option3', 'option4'];
      const currentIndex = options.indexOf(selectedOption);
      const nextIndex = (currentIndex + 1) % options.length;
      setSelectedOption(options[nextIndex]);
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setIsSubmitting(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .insert([formData]);

        if (error) throw error;
        console.log('Profile created successfully:', data);
        navigate('/mentor-dashboard');
      } catch (error) {
        console.error('Error creating profile:', error);
        setErrors(prev => ({ ...prev, submit: 'Failed to create profile. Please try again.' }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleEmploymentAdd = () => {
    setFormData(prev => ({
      ...prev,
      employment: [...prev.employment, {job: '', company: '', start_date: '', end_date: '' }]
    }));
  };

  const handleEmploymentRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      employment: prev.employment.filter((_, i) => i !== index)
    }));
  };

  const handleEmploymentChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      employment: prev.employment.map((emp, i) => 
        i === index ? { ...emp, [field]: value } : emp
      )
    }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        weekly: {
          ...prev.availability.weekly,
          [day]: { ...prev.availability.weekly[day], [field]: value }
        }
      }
    }));
  };

  const handleSpecificDateAdd = () => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        specificDates: [...prev.availability.specificDates, { date: '', start: '', end: '' }]
      }
    }));
  };

  const handleSpecificDateRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        specificDates: prev.availability.specificDates.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSpecificDateChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        specificDates: prev.availability.specificDates.map((date, i) => 
          i === index ? { ...date, [field]: value } : date
        )
      }
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }


// cloudinary.config({
//     cloud_name: 'your_cloud_name',
//     api_key: 'your_api_key',
//     api_secret: 'your_api_secret',
// });

// const generateSignature = (fileName) => {
//     const timestamp = Math.floor(Date.now() / 1000);
//     const signature = cloudinary.utils.sign_request(
//         {
//             timestamp,
//             folder: 'your_folder',
//             upload_preset: 'protocon',
//         },
//         cloudinary.config().api_secret
//     );

//     return { signature, timestamp };
// };


const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'protocon'); // Ensure this is your correct preset

  try {
      setUploading(true);
      setError(null);
      const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dgcfly5zo/image/upload`, // Your actual cloud name
          formData
      );
      return response.data.secure_url; // Return the URL if upload is successful
  } catch (err) {
      console.error('Error uploading to Cloudinary:', err.response ? err.response.data : err);
      setError('Failed to upload image. Please try again.');
      return null;
  } finally {
      setUploading(false);
  }
};

  const handleFileUpload = async (file) => {
    if (file) {
      const cloudinaryUrl = await uploadToCloudinary(file);
      if (cloudinaryUrl) {
        handleInputChange('profilepic', cloudinaryUrl);
      }
    }
  };

  return (
    <Container size={800} my={96}>
      <Title ta="center">Tell us about yourself!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Link to="/login">
          <Button variant="subtle" size="sm">
            Log in
          </Button>
        </Link>
      </Text>

      <div className="flex justify-center items-center min-w-screen mt-4"> {/* Minimum height to center vertically */}
      <Group className="flex justify-center"> {/* Centering the Group */}
        {['option1', 'option2', 'option3', 'option4'].map((option) => (
          <div key={option} className='flex items-center'> {/* Added margin for spacing */}
            <Radio
              value={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
            />
          </div>
        ))}
      </Group>
    </div>


      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Grid gutter="lg">
          <Grid.Col span={4}>
          <Group position="center" direction="column">
      <Image
        radius="md"
        h={160}
        w={140}
        src={formData.profilepic || "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"}
        alt="Profile picture"
      />
      <FileInput
        icon={<IconUpload size={14} />}
        label="Upload Profile Picture"
        placeholder="Upload"
        accept="image/*"
        onChange={handleFileUpload}
        disabled={uploading}
        styles={{
          input: {
            '&[data-disabled]': {
              backgroundColor: '#f1f3f5',
              color: '#adb5bd',
              opacity: 0.6,
            },
          },
        }}
      />
      {uploading && <Loader size="sm" />}
      {error && <Text color="red" size="xs">{error}</Text>}
    </Group>
          </Grid.Col>
          <Grid.Col span={8}>
            {selectedOption === 'option1' && (
              <>
                <TextInput
                  label="Username"
                  description="Username should be unique"
                  placeholder="Your username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                  error={errors.username}
                  rightSection={isCheckingUsername ? <Loader size="xs" /> : null}
                  styles={{
                    input: {
                      color: 'gray', // Set the input text color to gray.
                    },
                  }}
                />

                <TextInput
                  label="Email"
                  value={formData.email}
                  readOnly
                  mt="md"
                  disabled
                />
                <TextInput
                  label="First Name"
                  placeholder="Your first name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  required
                  mt="md"
                  error={errors.first_name}
                  styles={{
                    input: {
                      color: 'gray', // Set the input text color to gray.
                    },
                  }}
                />
                <TextInput
                  label="Last Name"
                  placeholder="Your last name"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  required
                  mt="md"
                  error={errors.last_name}
                  styles={{
                    input: {
                      color: 'gray', // Set the input text color to gray.
                    },
                  }}
                />
              </>
            )}

            {selectedOption === 'option2' && (
              <>
              
              <Autocomplete
                data={careerFields}
                renderOption={renderAutocompleteOption}
                maxDropdownHeight={300}
                label="Select Career Field"
                placeholder="Search for a career"
                styles={{
                  input: {
                    color: 'gray',
                  },
                }}
                error={errors.category}
                value={formData.category}
                onChange={(value) => handleInputChange('category', value)}
                required
              />
                <TextInput
                  className='mt-4'
                  label="Job Title"
                  placeholder="Your job title"
                  value={formData.job}
                  onChange={(e) => handleInputChange('job', e.target.value)}
                  required
                  error={errors.job}
                  styles={{
                    input: {
                      color: 'gray', // Set the input text color to gray.
                    },
                  }}
                />



                <TextInput
                  label="Company"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  required
                  mt="md"
                  error={errors.company}
                  styles={{
                    input: {
                      color: 'gray', // Set the input text color to gray.
                    },
                  }}
                />
                <Textarea
                  label="Summary"
                  placeholder="Tell us about yourself"
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  required
                  mt="md"
                  minRows={4}
                  error={errors.summary}
                  styles={{
                    input: {
                      color: 'gray', // Set the input text color to gray.
                    },
                  }}
                />
              </>
            )}

{selectedOption === 'option3' && (
  <div className='grid grid-cols-1 gap-3'>
    <PillsInputField
      value={formData.skills}
      onChange={(value) => handleInputChange('skills', value)}
      placeholder="Add skills"
      category="skills"
      description="Press Enter or Return key"
    />
    {errors.skills && <Text color="red" size="sm">{errors.skills}</Text>}
    <PillsInputField
      value={formData.hobbies}
      onChange={(value) => handleInputChange('hobbies', value)}
      placeholder="Add hobbies"
      category="hobbies"
      // description="Share your personal interests and hobbies"
    />
    <PillsInputField
      value={formData.achievements}
      onChange={(value) => handleInputChange('achievements', value)}
      placeholder="Add achievements"
      category="achievements"
      // description="List your notable accomplishments"
    />
    <PillsInputField
      value={formData.contributions}
      onChange={(value) => handleInputChange('contributions', value)}
      placeholder="Add contributions"
      category="contributions"
      // description="Mention your contributions to projects or communities"
    />
  </div>
)}

            {selectedOption === 'option4' && (
              <>
                <TextInput
                  label="X (Twitter) URL"
                  placeholder="https://x.com/yourusername"
                  value={formData.x_url}
                  onChange={(e) => handleInputChange('x_url', e.target.value)}
                  mt="md"
                />
                <TextInput
                  label="LinkedIn URL"
                  placeholder="https://www.linkedin.com/in/yourusername"
                  value={formData.linkedin_url}
                  onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                  mt="md"
                />
                <Accordion mt="md">
                  <Accordion.Item value="employment">
                    <Accordion.Control>Employment History</Accordion.Control>
                    <Accordion.Panel>
                      {formData.employment.map((emp, index) => (
                        <Group key={index} mt="xs">
                          <TextInput
                            placeholder="Job Title"
                            value={emp.job}
                            onChange={(e) => handleEmploymentChange(index, 'job', e.target.value)}
                            style={{ flex: 1 }}
                          />
                          <TextInput
                            placeholder="Company"
                            value={emp.company}
                            onChange={(e) => handleEmploymentChange(index, 'company', e.target.value)}
                            style={{ flex: 1 }}
                          />
                          <DateInput
                            placeholder="Start Date"
                            value={emp.start_date ? new Date(emp.start_date) : null}
                            onChange={(date) => handleEmploymentChange(index, 'start_date', date?.toISOString().split('T')[0])}
                            style={{ flex: 1 }}
                          />
                          <DateInput
                            placeholder="End Date"
                            value={emp.end_date ? new Date(emp.end_date) : null}
                            onChange={(date) => handleEmploymentChange(index, 'end_date', date?.toISOString().split('T')[0])}
                            style={{ flex: 1 }}
                          />
                          <ActionIcon color="red" onClick={() => handleEmploymentRemove(index)}>
                            <IconTrash size="1rem" />
                          </ActionIcon>
                        </Group>
                      ))}
                      <Button onClick={handleEmploymentAdd} mt="sm">Add Employment</Button>
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="availability">
                    <Accordion.Control>Availability</Accordion.Control>
                    <Accordion.Panel>
                      <Stack>
                        {Object.entries(formData.availability.weekly).map(([day, { enabled, times }]) => (
                          <Group key={day}>
                            <TextInput value={day} readOnly style={{ flex: 1 }} />
                            <PillsInputField
                              value={times}
                              onChange={(value) => handleAvailabilityChange(day, 'times', value)}
                              placeholder="Add times (e.g., 09:00-17:00)"
                              style={{ flex: 2 }}
                            />
                            <Radio
                              checked={enabled}
                              onChange={(event) => handleAvailabilityChange(day, 'enabled', event.currentTarget.checked)}
                            />
                          </Group>
                        ))}
                        <Title order={4} mt="md">Specific Dates</Title>
                        {formData.availability.specificDates.map((date, index) => (
                          <Group key={index} mt="xs">
                            <DateInput
                              placeholder="Date"
                              value={date.date ? new Date(date.date) : null}
                              onChange={(value) => handleSpecificDateChange(index, 'date', value?.toISOString().split('T')[0])}
                              style={{ flex: 1 }}
                            />
                            <TextInput
                              placeholder="Start Time"
                              value={date.start}
                              onChange={(e) => handleSpecificDateChange(index, 'start', e.target.value)}
                              style={{ flex: 1 }}
                            />
                            <TextInput
                              placeholder="End Time"
                              value={date.end}
                              onChange={(e) => handleSpecificDateChange(index, 'end', e.target.value)}
                              style={{ flex: 1 }}
                            />
                            <ActionIcon color="red" onClick={() => handleSpecificDateRemove(index)}>
                              <IconTrash size="1rem" />
                            </ActionIcon>
                          </Group>
                        ))}
                        <Button onClick={handleSpecificDateAdd} mt="sm">Add Specific Date</Button>
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </>
            )}

            <Group position="apart" mt="xl">
              <Button 
                variant="default" 
                onClick={() => setSelectedOption(prev => {
                  const options = ['option1', 'option2', 'option3', 'option4'];
                  const currentIndex = options.indexOf(prev);
                  return options[(currentIndex - 1 + options.length) % options.length];
                })}
                disabled={selectedOption === 'option1'}
              >
                Back
              </Button>
              {selectedOption !== 'option4' ? (
                <Button onClick={handleNextClick}>Next</Button>
              ) : (
                <Button onClick={handleSubmit} loading={isSubmitting} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              )}
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>
      {errors.submit && <Text color="red" size="sm" mt="sm">{errors.submit}</Text>}
    </Container>
  );
}