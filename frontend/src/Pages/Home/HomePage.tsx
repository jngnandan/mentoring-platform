import React, { useContext } from 'react';
import { Text, Paper, Button, Anchor, Container, Title } from '@mantine/core';
import { SiAmazon, SiFlipkart, SiSamsung, SiOneplus, SiApple } from 'react-icons/si';
import { MdOutlineDesignServices, MdPeopleOutline } from "react-icons/md";
import { LiaToolsSolid } from "react-icons/lia";
import { FaRegHandshake } from "react-icons/fa6";
import { AiOutlineBuild } from "react-icons/ai";
import { BsLaptop } from "react-icons/bs";
import { SlSpeech } from "react-icons/sl";
import { LiaPhotoVideoSolid } from "react-icons/lia";
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
  { icon: LiaToolsSolid, title: 'Engineering' },
  { icon: FaRegHandshake, title: 'Marketing' },
  { icon: AiOutlineBuild, title: 'Product' },
  { icon: MdOutlineDesignServices, title: 'UI/UX' },
  { icon: MdPeopleOutline, title: 'HR' },
  { icon: BsLaptop, title: 'Sales' },
  { icon: SlSpeech, title: 'Communications' },
  { icon: LiaPhotoVideoSolid, title: 'Video Editing' },
  { icon: FaRegHandshake, title: 'Finance' },
  { icon: IconHome2, title: 'Operations' },
  { icon: IconActivity, title: 'Content Creation' },
];

const Categories = [
  { icon: IconUsersGroup, title: 'Group Mentoring' },
  { icon: LiaToolsSolid, title: 'One-on-One Mentoring' },
];

const members = [
  {
    title: "John Doe",
    description: "Senior Software Engineer at TechCorp",
    authorName: "10 years",
    numberOfSessions: 35,
    attendanceRate: "98%",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    linkUrl: "https://mantine.dev",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
    badgeText: "Outstanding",
    badgeGradient: { from: 'yellow', to: 'red' },
  },
  {
    title: "Jane Smith",
    description: "Lead Data Scientist at DataHub",
    authorName: "8 years",
    numberOfSessions: 50,
    attendanceRate: "95%",
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    linkUrl: "https://example.com",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/women/1.jpg",
    badgeText: "Featured",
    badgeGradient: { from: 'blue', to: 'cyan' },
  },
  {
    title: "Michael Johnson",
    description: "Product Manager at InnovateX",
    authorName: "12 years",
    numberOfSessions: 20,
    attendanceRate: "92%",
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    linkUrl: "https://innovatex.com",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/men/2.jpg",
    badgeText: "Expert",
    badgeGradient: { from: 'green', to: 'blue' },
  },
  {
    title: "Emily Davis",
    description: "UX/UI Designer at CreativeStudio",
    authorName: "7 years",
    numberOfSessions: 28,
    attendanceRate: "99%",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    linkUrl: "https://creativestudio.com",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/women/2.jpg",
    badgeText: "Top Performer",
    badgeGradient: { from: 'purple', to: 'pink' },
  },
  {
    title: "Robert Brown",
    description: "CTO at NextGenTech",
    authorName: "15 years",
    numberOfSessions: 60,
    attendanceRate: "100%",
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    linkUrl: "https://nextgentech.com",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
    badgeText: "Innovator",
    badgeGradient: { from: 'orange', to: 'red' },
  },
  {
    title: "Sophia White",
    description: "Digital Marketing Specialist at MarketPro",
    authorName: "5 years",
    numberOfSessions: 40,
    attendanceRate: "97%",
    imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    linkUrl: "https://marketpro.com",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/women/3.jpg",
    badgeText: "Rising Star",
    badgeGradient: { from: 'teal', to: 'lime' },
  },
  // {
  //   title: "Liam Scott",
  //   description: "Data Analyst at InsightLabs",
  //   authorName: "4 years experience",
  //   numberOfSessions: 25,
  //   attendanceRate: "91%",
  //   imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
  //   linkUrl: "https://insightlabs.com",
  //   authorAvatar: "https://randomuser.me/api/portraits/thumb/men/4.jpg",
  //   badgeText: "New Talent",
  //   badgeGradient: { from: 'lightblue', to: 'blue' },
  // },
];

function HomePage() {
  const { dataFromBackend, profilesData } = useContext(ContentContext);
  const selectedProfiles = profilesData.slice(0, 8);
  const selectedRange = dataFromBackend.slice(8, 15);
  const newRange = dataFromBackend.slice(16, 23);

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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 mx-12">
              {members.map((member, index) => (
                <ArticleCard
                  key={index}
                  title={member.title}
                  description={member.description}
                  authorName={member.authorName}
                  numberOfSessions={member.numberOfSessions}
                  attendanceRate={member.attendanceRate}
                  imageUrl={member.imageUrl}
                  linkUrl={member.linkUrl}
                  authorAvatar={member.authorAvatar}
                  badgeText={member.badgeText}
                  badgeGradient={member.badgeGradient}
                />
              ))}
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
