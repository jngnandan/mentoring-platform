import React, { useContext, useEffect, useState } from 'react';
import { ContentContext } from '../../context/ContentContext.tsx';
import { Box, Flex, Loader, Button, Input, Breadcrumbs, Anchor, ScrollArea, Paper } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { IconSmartHome, IconWorld, IconSearch, IconAdjustments, IconClock, IconStar, IconBulb, IconPencil, IconChartBar, IconPalette, IconCode } from '@tabler/icons-react';
import { createClient } from '@supabase/supabase-js';
import { Helmet } from 'react-helmet';
import FilterSearch from './FilterSearch/FilterSearch.tsx';
import ProfileCard from '../Components/ProfileCard/ProfileCard.tsx';
import axios from 'axios';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const categories = [
  { value: 'all', label: 'All', icon: IconWorld },
  { value: 'available', label: 'Available ASAP', icon: IconClock },
  { value: 'recommended', label: 'Recommended', icon: IconStar },
  { value: 'softSkills', label: 'Soft Skills', icon: IconBulb },
  { value: 'contentWriting', label: 'Content Writing', icon: IconPencil },
  { value: 'dataScience', label: 'Data Science', icon: IconChartBar },
  { value: 'design', label: 'Design', icon: IconPalette },
  { value: 'engineering', label: 'Engineering', icon: IconCode },
];

function Mentors() {
  const { superProfiles, setSuperProfiles } = useContext(ContentContext);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchSuperProfiles();
  }, []);

  const fetchSuperProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw error;
      console.log('Fetched profiles:', data);
      setSuperProfiles(data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    const value = event.currentTarget.value;
    setSearchQuery(value);

    // Filter suggestions based on current data
    if (value) {
      const localMatches = superProfiles.flatMap(profile => {
        const nameMatches = [
          profile.first_name || '',
          profile.last_name || '',
          profile.job_title || '',
          ...(profile.skills || [])
        ];

        return nameMatches.filter(item => item.toLowerCase().includes(value.toLowerCase()));
      });

      if (localMatches.length > 0) {
        setSuggestions(localMatches);
      } else {
        // If no local matches, call the ChatGPT API
        try {
          const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo", // Using the cheapest GPT model
            messages: [
              { role: "user", content: `Suggest names, skills, or job titles based on: ${value}` }
            ],
            max_tokens: 40 // Adjust this as necessary
          }, {
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Use environment variable
              'Content-Type': 'application/json'
            }
          });

          const suggestionTexts = response.data.choices[0].message.content.trim().split('\n');
          setSuggestions(suggestionTexts.map(s => s.replace(/^\d+\.\s*/, '')));
        } catch (error) {
          console.error('Error fetching suggestions from ChatGPT:', error);
          setSuggestions([]);
        }
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleCategorySelect = (categoryValue) => {
    setSelectedCategory(categoryValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const handleBlur = () => {
    setSuggestions([]);
  };

  const filteredProfiles = superProfiles.filter((profile) => {
    const matchesCategory = selectedCategory === 'all' || profile.category === selectedCategory;

    if (!searchQuery) return matchesCategory;

    const firstName = String(profile.first_name || '').toLowerCase();
    const lastName = String(profile.last_name || '').toLowerCase();
    const jobTitle = String(profile.job_title || '').toLowerCase();
    const bio = String(profile.bio || '').toLowerCase();
    const company = String(profile.company || '').toLowerCase();

    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesSearch =
      firstName.includes(lowerCaseQuery) ||
      lastName.includes(lowerCaseQuery) ||
      jobTitle.includes(lowerCaseQuery) ||
      bio.includes(lowerCaseQuery) ||
      company.includes(lowerCaseQuery);

    return matchesCategory && matchesSearch;
  });

  const renderProfiles = () =>
    filteredProfiles.map((profile) => (
      <ProfileCard
        key={profile.id}
        id={profile.id}
        profilepic={profile.profilepic || 'https://via.placeholder.com/150'}
        linkUrl={profile.linkUrl || '#'}
        summary={profile.bio || 'No description available'}
        first_name={profile.first_name || 'Unknown'}
        last_name={profile.last_name || 'User'}
        job={profile.job_title || 'No job title'}
        bio={profile.bio || 'No bio available'}
        company={profile.company || 'No company available'}
        hobbies={profile.hobbies || 'No hobbies listed'}
        achievements={profile.achievements || 'No achievements listed'}
        contributions={profile.contributions || 'No contributions listed'}
        created_at={profile.last_updated || 'Date not available'}
        social_media_links={profile.social_media_links || 'No social media links available'}
        bookings={profile.bookings || 'No bookings available'}
        badgeText={profile.badgeText || 'Default Badge'}
        badgeGradient={profile.badgeGradient || { from: 'gray', to: 'white' }}
        experience={profile.experience || '5'}
      />
    ));

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>Find Mentors | Your Website Name</title>
        <meta name="description" content="Explore our curated list of mentors with diverse expertise. Find the perfect mentor to guide you on your journey." />
      </Helmet>
      {loading ? (
        <div className='flex flex-col justify-center items-center h-full'>
          <Loader size={30} color="blue" />
        </div>
      ) : (
        <Flex style={{ height: '100%' }}>
          {!isMobile && (
            <Box style={{ width: '250px', padding: '20px', borderRight: '1px solid #eaeaea' }}>
              <FilterSearch />
            </Box>
          )}
          <Box style={{ flex: '1', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <Box style={{ padding: '20px' }}>
              <Breadcrumbs mb={20}>
                <Link to="/"><IconSmartHome /></Link>
                <Anchor>Mentors</Anchor>
              </Breadcrumbs>

              <Flex mb={20}>
                <Input
                  placeholder="Search profiles"
                  leftSection={<IconSearch size={16} />}
                  value={searchQuery}
                  onChange={handleSearch}
                  onBlur={handleBlur}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                <Button
                  leftSection={<IconAdjustments size={16} />}
                  variant="default"
                  color="gray"
                >
                  Filter
                </Button>
              </Flex>

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <Paper padding="md" style={{ position: 'absolute', zIndex: 10 }}>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{
                        padding: '5px',
                        cursor: 'pointer',
                        background: '#fff',
                        borderBottom: '1px solid #eaeaea',
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </Paper>
              )}

              <ScrollArea
                style={{
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  marginBottom: '20px',
                }}
                scrollbarSize={0}
                type="hover"
                offsetScrollbars
              >
                <Flex gap="sm" style={{ display: 'inline-flex' }}>
                  {categories.map((cat) => (
                    <Button
                      key={cat.value}
                      color='gray'
                      leftSection={<cat.icon size={16} />}
                      variant={selectedCategory === cat.value ? "filled" : "default"}
                      onClick={() => handleCategorySelect(cat.value)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </Flex>
              </ScrollArea>
            </Box>

            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-3 mx-4 mt-0'>
              {renderProfiles()}
            </div>
          </Box>
        </Flex>
      )}
      <Box style={{ padding: '20px', borderTop: '1px solid #eaeaea' }}>
        {/* Footer Links Component */}
      </Box>
    </div>
  );
}

export default Mentors;