import React, { useContext, useEffect, useState } from 'react';
import { Text, Container, Title, Anchor, Group, rem } from '@mantine/core';
import { IconPalette, IconHome2, IconActivity, IconUsersGroup, IconChevronRight } from '@tabler/icons-react';
import { Helmet } from 'react-helmet';
import { createClient } from '@supabase/supabase-js';

import { ContentContext } from '../../context/ContentContext.tsx';
import { Link } from 'react-router-dom';
import FooterLink from '../Components/Footer/FooterLinks.tsx';
import { HeroText } from './HeroText/HeroText.tsx';
import { FaqSimple } from '../Components/FAQ/FaqSimple.tsx';
import { IconTextCard } from '../Components/IconTextCard/IconTextCard.tsx';
import { BigCard } from '../Components/BigCard/BigCard.tsx';
import ArticleCard from '../Components/ArticleCard/ArticleCard.tsx';
import NewsletterSignup from './NewsLetter/NewsletterSignup.js';

import classes from '../Home/HomePage.module.css';
import { Dots } from './HeroText/Dots.tsx';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

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
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      if (error) {
        console.error('Error fetching articles:', error);
      } else {
        setProfiles(data);
        console.log(data);
      }
      setLoading(false);
    };

    fetchProfiles();
  }, []);

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

      <section className="relative py-2">
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

      <section className="relative py-2">
        <Container className="relative z-10 max-w-7xl mx-auto px-4">
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

      <section className="relative py-20 ">
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

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 ">
            {profiles.slice(0, 4).map((profile) => (
              <ArticleCard
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


      

      

      

      {/* <section className="relative py-20 bg-white">
        <Container className="relative z-10 max-w-7xl mx-auto px-4">
          <NewsletterSignup />
        </Container>
      </section> */}
      <NewsletterSignup />


      <FaqSimple />
      <FooterLink />
    </div>
  );
}

export default HomePage;
