import React, { useContext } from 'react';
import { Text, Container, Title } from '@mantine/core';
import { IconPalette, IconHome2, IconActivity, IconUsersGroup } from '@tabler/icons-react';

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

import classes from '../Home/HomePage.module.css';

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
  { icon: IconActivity, title: 'Content Creation' },
];

const Categories = [
  { icon: IconUsersGroup, title: 'Group Mentoring' },
  { icon: IconActivity, title: 'One-on-One Mentoring' },
];

function HomePage() {
  const { profilesData } = useContext(ContentContext);

  // Handle case where profilesData might be empty or undefined
  const selectedProfiles = profilesData ? profilesData.slice(0, 8) : [];
  const selectedRange = profilesData ? profilesData.slice(8, 15) : [];
  const newRange = profilesData ? profilesData.slice(16, 23) : [];

  return (
    <div>
      <HeroText />

      <Container className={classes.wrapper} size={1400} my={80}>
        <div className={classes.inner}>
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
        </div>
      </Container>

      <div className='bg-gray-100 py-1 shadow-sm'>
        <Container className={classes.wrapper} size={1400} my={80}>
          <div className={classes.inner}>
            <Title className={classes.title}>
              We offer services{' '}
              <Text component="span" className={classes.highlight} inherit>
                to your needs
              </Text>
            </Title>

            <Container p={0} size={600}>
              <Text size="lg" c="dimmed" className={classes.description}>
                Empowering growth through personalized mentorship – connect, learn, and succeed with our tailored mentoring platform.
              </Text>
            </Container>

            <div className="grid grid-cols-2 gap-6 mb-6 lg:mx-36 mt-8">
              {Categories.map((field, index) => (
                <BigCard
                  key={index}
                  icon={field.icon}
                  title={field.title}
                  description='lorem ipsum'
                />
              ))}
            </div>
          </div>
        </Container>
      </div>

      <div className='py-0 shadow-sm'>
        <Container className={classes.wrapper} size={3000} my={80}>
          <div className={classes.inner}>
            <Title className={classes.title}>
              Meet our{' '}
              <Text component="span" className={classes.highlight} inherit>
                Mentors
              </Text>
            </Title>

            <Container p={0} size={600}>
              <Text size="lg" c="dimmed" className={classes.description}>
                Empowering growth through personalized mentorship – connect, learn, and succeed with our tailored mentoring platform.
              </Text>
            </Container>

<<<<<<< HEAD
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 lg:mx-12">
              {renderProfiles()}
=======
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 mx-12">
              {selectedProfiles.map((profile, index) => (
                <ArticleCard
                  key={profile.id}
                  profilepic={profile.profile_picture || 'https://via.placeholder.com/150'} // Default image if none
                  linkUrl={profile.linkUrl || '#'}
                  summary={profile.bio || profile.summary || 'No description available'}
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
>>>>>>> parent of 346ad03 (apis updated for mobile)
            </div>
          </div>
        </Container>
      </div>

      <div className='bg-gray-100'>
        <FaqSimple />
      </div>

      <FooterLink />
    </div>
  );
}

export default HomePage;
