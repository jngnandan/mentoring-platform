import React, { useContext } from 'react';
import { Text, Container, Title } from '@mantine/core';
import { IconPalette, IconHome2, IconActivity, IconUsersGroup } from '@tabler/icons-react';
import { Helmet } from 'react-helmet'; // Import React Helmet

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
import NewsletterSignup from '../NewsLetter/NewsletterSignup.js';

import classes from '../Home/HomePage.module.css';
import { Dots } from './HeroText/Dots.tsx';

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

  // Handle case where profilesData might be empty or undefined
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {selectedProfiles.map((profile) => (
              <ArticleCard
                key={profile.id}
                id={profile.id}
                profilepic={profile.profile_picture || 'https://via.placeholder.com/150'}
                summary={profile.bio || profile.summary || 'No description available'}
                first_name={profile.first_name || 'Unknown'}
                last_name={profile.last_name || 'User'}
                job={profile.job_title || 'No job title'}
                bio={profile.bio || 'No bio available'}
                company={profile.company || 'No company available'}
                companyLogo={profile.company_logo || null}
                experience={profile.experience || '5'}
                badgeText={profile.badgeText || 'Default Badge'}
                badgeGradient={profile.badgeGradient || { from: 'gray', to: 'white' }}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-gray-50 via-white to-blue-100">
        <Dots className="absolute left-0 top-0 text-blue-200 opacity-50" />
        <Dots className="absolute right-0 bottom-0 text-blue-200 opacity-50" />
        <Container className="relative z-10 max-w-7xl mx-auto px-4">
          <FaqSimple />
        </Container>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-blue-100 to-white">
        <Dots className="absolute left-0 top-0 text-blue-200 opacity-50" />
        <Container className="relative z-10 max-w-7xl mx-auto px-4">
          <NewsletterSignup />
        </Container>
        <Dots className="absolute right-0 bottom-0 text-blue-200 opacity-50" />
      </section>

      <FooterLink />
    </div>
  );
}

export default HomePage;
