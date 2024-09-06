import React, { useContext, useEffect, useState } from 'react';
import { Text, Container, Title, Anchor, Group, rem } from '@mantine/core';
import { IconPalette, IconHome2, IconActivity, IconUsersGroup, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Helmet } from 'react-helmet';
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

import { ContentContext } from '../../context/ContentContext.tsx';
import ProductCard from './ProductCard/ProductCard.tsx';
import SmallCard from './SmallCard/SmallCard.tsx';
import { Link } from 'react-router-dom';
import FooterLink from '../Footer/FooterLinks.tsx';
import { HeroText } from './HeroText/HeroText.tsx';
import { FaqSimple } from '../FAQ/FaqSimple.tsx';
import { IconTextCard } from '../Components/CardWithCheckbox/CheckboxCard.tsx';
import { BigCard } from '../Components/BigCard/BigCard.tsx';
import ArticleCard from '../Components/ArticleCard/ArticleCard.tsx';
import ProfileCard from '../Components/ProfileCard/ProfileCard.tsx';
import NewsletterSignup from '../NewsLetter/NewsletterSignup.js';

import classes from '../Home/HomePage.module.css';
import { Dots } from './HeroText/Dots.tsx';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL// Your Supabase URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const fields = [
  { icon: IconPalette, title: 'Design' },
  { icon: IconHome2, title: 'Engineering' },
  { icon: IconActivity, title: 'Marketing' },
  { icon: IconUsersGroup, title: 'Product' },
  { icon: IconHome2, title: 'UI/UX' },
  { icon: IconActivity, title: 'HR' },
  { icon: IconPalette, title: 'Sales' },
  { icon: IconUsersGroup, title: 'Communications' },
  { icon: IconActivity, title: 'Video Editing' },
  { icon: IconPalette, title: 'Finance' },
  { icon: IconHome2, title: 'Operations' },
  { icon: IconActivity, title: 'Content' },
];

const Categories = [
  { icon: IconUsersGroup, title: 'Group Mentoring' },
  { icon: IconActivity, title: 'One-on-One Mentoring' },
];

function HomePage() {
  const { profilesData } = useContext(ContentContext);
  const [profiles, setProfiles] = useState([]); // State for articles
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch articles from Supabase
  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('profiles') // Replace with your Supabase table name
        .select('*');
      if (error) {
        console.error('Error fetching articles:', error);
      } else {
        setProfiles(data);
        console.log(data)
      }
      setLoading(false); // Set loading to false after fetching
    };

    fetchProfiles();
  }, []);

  const selectedProfiles = profilesData ? profilesData.slice(0, 8) : [];
  const selectedRange = profilesData ? profilesData.slice(8, 15) : [];
  const newRange = profilesData ? profilesData.slice(16, 23) : [];

  return (
    <div className="relative">
      <Helmet>
        <title>Protocon Mentorship Platform | Empowering Growth Through Mentorship</title>
        <meta name="description" content="Protocon is a mentorship platform offering personalized growth opportunities. Connect with mentors across various fields and boost your career." />
        <meta name="keywords" content="mentorship, protocon, career growth, professional development, mentoring platform" />
        <meta property="og:title" content="Protocon Mentorship Platform" />
        <meta property="og:description" content="Empower your career with Protocon's mentorship platform. Connect with experienced mentors and achieve your professional goals." />
        <meta property="og:image" content="URL_to_image_for_open_graph" />
        <meta property="og:url" content="URL_to_your_page" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Protocon Mentorship Platform" />
        <meta name="twitter:description" content="Empower your career with Protocon's mentorship platform. Connect with experienced mentors and achieve your professional goals." />
        <meta name="twitter:image" content="URL_to_image_for_twitter" />
      </Helmet>

      <HeroText />

      <section className="relative py-20 bg-gradient-to-b from-white via-blue-100 to-white">
        <Dots className="absolute left-0 top-0 text-blue-100 opacity-50" />
        <Dots className="absolute right-0 top-20 text-blue-100 opacity-50" />
        <Container className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6 lg:mx-12 mt-4">
            {fields.map((field, index) => (
              <Link to='/mentors' key={index}>
                <IconTextCard
                  icon={field.icon}
                  title={field.title}
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-white via-white to-blue-100">
        <Dots className="absolute left-0 bottom-0 text-blue-200 opacity-50" />
        <Dots className="absolute right-0 top-0 text-blue-200 opacity-50" />
        <Container className="relative z-10 max-w-7xl mx-auto px-4 ">
          <Title className="text-center text-3xl font-bold mb-4">
            We offer services{' '}
            <Text component="span" className="text-blue-600" inherit>
              to your needs
            </Text>
          </Title>
          <div className='flex items-center justify-center mt-4'>
            <Text className="text-center text-lg text-gray-600 max-w-xl mx-auto mb-8">
              Empowering growth through personalized mentorship – connect, learn, and succeed with our tailored mentoring platform.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 lg:mx-36 mt-8">
            {Categories.map((field, index) => (
              <BigCard
                key={index}
                icon={field.icon}
                title={field.title}
                description='lorem ipsum'
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-blue-100 via-blue-100 to-gray-50">
        <Dots className="absolute left-0 top-1/4 text-blue-200 opacity-50" />
        <Dots className="absolute right-0 bottom-1/4 text-blue-200 opacity-50" />
        <Dots className="absolute right-0 top-20 text-blue-200 opacity-50" />
        <Container className="relative z-10 max-w-7xl mx-auto px-4">
          <Title className="text-center text-3xl font-bold mb-4 ">
            Meet our{' '}
            <Text component="span" className="text-blue-600" inherit>
              Mentors
            </Text>
          </Title>
          <div className='flex items-center justify-center mt-3'>
            <Text className="text-center text-lg text-gray-600 max-w-xl mx-auto mb-8">
              Empowering growth through personalized mentorship – connect, learn, and succeed with our tailored mentoring platform.
            </Text>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {profiles.slice(0, 4).map((profile) => (
            <ArticleCard
              key={profile.id}
              id={profile.id}  // Pass the id here to the ArticleCard component
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
          ))}

          </div>
          <Anchor href="/mentors" size="sm" mt={4}>
          <Group>
            <Text>Find a Mentor</Text>
            <IconChevronRight size={rem(12)} />
          </Group>
        </Anchor>
        </Container>
      </section>

 {/* New Section for Profiles from Supabase */}
{/* <section className="relative py-20 bg-gradient-to-b from-white to-gray-100">
  <Container className="relative z-10 max-w-7xl mx-auto px-4">
    <Title className="text-center text-3xl font-bold mb-4 ">
      Recent <Text component="span" className="text-blue-600" inherit>Profiles</Text>
    </Title>

    {loading ? (
      <Text className="text-center">Loading profiles...</Text>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              id={profile.id} // Dynamic link identifier
              profilepic={profile.profile_picture || 'https://via.placeholder.com/150'} // Fallback image
              summary={profile.bio || 'No summary available'} // Use bio or a fallback message
              first_name={profile.first_name}
              last_name={profile.last_name}
              job={profile.job} // Add job title
              company={profile.company} // Company name
              hobbies={profile.hobbies || []} // Array of hobbies
              achievements={profile.achievements || []} // Array of achievements
              contributions={profile.contributions || []} // Array of contributions
              companyLogo={profile.companyLogo} // Company logo
              experience={profile.experience} // Experience in years
              badgeText={profile.badgeText} // Badge text
              badgeGradient={profile.badgeGradient} // Badge gradient
              x_url={profile.x_url} // URL for external reference
              linkedin_url={profile.linkedin_url} // LinkedIn profile URL
            />
          ))
        ) : (
          <Text className="text-center">No profiles found.</Text>
        )}
      </div>
    )}
  </Container>
</section> */}

      <section className="relative py-20 bg-gradient-to-b from-blue-100 to-white">
        <Container className="relative z-10 max-w-7xl mx-auto px-4">
          <NewsletterSignup />
        </Container>
      </section>

      <FaqSimple />
      <FooterLink />
    </div>
  );
}

export default HomePage;