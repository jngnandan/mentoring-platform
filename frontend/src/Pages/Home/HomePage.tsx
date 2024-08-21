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
import { IconPalette, IconHome2, IconCircleOff, IconActivity, IconUsersGroup } from '@tabler/icons-react';

import { ContentContext } from '../../context/ContentContext.tsx';

import ProductCard from './ProductCard/ProductCard.tsx';
import SmallCard from './SmallCard/SmallCard.tsx';
import { Link } from 'react-router-dom';
import FooterLink from '../Footer/FooterLinks.tsx';
import { HeroText } from './HeroText/HeroText.tsx';
import { FaqSimple } from '../FAQ/FaqSimple.tsx';
import { IconTextCard } from '../Components/CardWithCheckbox/CheckboxCard.tsx';
import { BigCard } from '../Components/BigCard/BigCard.tsx';

import classes from '../Home/HomePage.module.css'
import { ArticleCard } from '../Components/ArticleCard/ArticleCard.tsx';

const icons = [
  <SiAmazon key="amazon" size={44} />,
  <SiFlipkart key="flipkart" size={44} />,
  <SiApple key="apple" size={44} />,
  <SiSamsung key="samsung" size={44} />,
  <SiOneplus key="oneplus" size={44} />,
];

const categories = [
  { label: 'Design', icon: <MdOutlineDesignServices size={28} />, link: '/deals' },
  { label: 'Engineering', icon: <LiaToolsSolid size={28} />, link: '/news' },
  { label: 'Marketing', icon: <FaRegHandshake size={28} />, link: '/mobiles' },
  { label: 'Product', icon: <AiOutlineBuild size={28} />, link: '/tablets' },
  { label: 'Sales', icon: <BsLaptop size={28} />, link: '/laptops' },
  { label: 'Soft Skills', icon: <MdPeopleOutline size={28} />, link: '/tvs' },
  { label: 'Content Marketing', icon: <SlSpeech size={28} />, link: '/cameras' },
  { label: 'Video Editing', icon: <LiaPhotoVideoSolid size={28} />, link: '/acs' },
];

// New list of fields with icons and titles
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

// New list of fields with icons and titles
const Categories = [
  { icon: IconUsersGroup, title: 'Group Mentoring' },
  { icon: LiaToolsSolid, title: 'One-on-One Mentoring' },
];

const members = [
  {
    title: "John Doe",
    description: "Senior Software Engineer at TechCorp",
    authorName: "10 years experience",
    numberOfSessions: 35,
    attendanceRate: "98%",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg", // John Doe
    linkUrl: "https://mantine.dev",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
    badgeText: "Outstanding",
    badgeGradient: { from: 'yellow', to: 'red' },
  },
  {
    title: "Jane Smith",
    description: "Lead Data Scientist at DataHub",
    authorName: "8 years experience",
    numberOfSessions: 50,
    attendanceRate: "95%",
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg", // Jane Smith
    linkUrl: "https://example.com",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/women/1.jpg",
    badgeText: "Featured",
    badgeGradient: { from: 'blue', to: 'cyan' },
  },
  {
    title: "Michael Johnson",
    description: "Product Manager at InnovateX",
    authorName: "12 years experience",
    numberOfSessions: 20,
    attendanceRate: "92%",
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg", // Michael Johnson
    linkUrl: "https://innovatex.com",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/men/2.jpg",
    badgeText: "Expert",
    badgeGradient: { from: 'green', to: 'blue' },
  },
  {
    title: "Emily Davis",
    description: "UX/UI Designer at CreativeStudio",
    authorName: "7 years experience",
    numberOfSessions: 28,
    attendanceRate: "99%",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg", // Emily Davis
    linkUrl: "https://creativestudio.com",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/women/2.jpg",
    badgeText: "Top Performer",
    badgeGradient: { from: 'purple', to: 'pink' },
  },
  {
    title: "Robert Brown",
    description: "CTO at NextGenTech",
    authorName: "15 years experience",
    numberOfSessions: 60,
    attendanceRate: "100%",
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg", // Robert Brown
    linkUrl: "https://nextgentech.com",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
    badgeText: "Innovator",
    badgeGradient: { from: 'orange', to: 'red' },
  },
  {
    title: "Sophia White",
    description: "Digital Marketing Specialist at MarketPro",
    authorName: "5 years experience",
    numberOfSessions: 40,
    attendanceRate: "97%",
    imageUrl: "https://randomuser.me/api/portraits/women/3.jpg", // Sophia White
    linkUrl: "https://marketpro.com",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/women/3.jpg",
    badgeText: "Rising Star",
    badgeGradient: { from: 'teal', to: 'lime' },
  },
  {
    title: "Liam Scott",
    description: "Data Analyst at InsightLabs",
    authorName: "4 years experience",
    numberOfSessions: 25,
    attendanceRate: "91%",
    imageUrl: "https://randomuser.me/api/portraits/men/4.jpg", // Liam Scott
    linkUrl: "https://insightlabs.com",
    authorAvatar: "https://randomuser.me/api/portraits/thumb/men/4.jpg",
    badgeText: "New Talent",
    badgeGradient: { from: 'lightblue', to: 'blue' },
  },
];





function HomePage() {
  const { dataFromBackend, profilesData } = useContext(ContentContext);
  const selectedProfiles = profilesData.slice(0, 8);
  const selectedRange = dataFromBackend.slice(8, 15 + 1);
  const newRange = dataFromBackend.slice(16, 23 + 1);

  return (
    <div>
      <HeroText />

      {/* Grid with circular icons as a row */}
      {/* <div className="mx-8 md:px-66 md:mx-16">
        <div className="border p-4">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8">
            {categories.map((category, index) => (
              <Link to={category.link} key={index}>
                <div className="text-center">
                  <Button variant="default" size="sm" style={{ borderRadius: '50%', width: '70px', height: '70px' }}>
                    {category.icon}
                  </Button>
                  <p className="mt-2 text-sm">{category.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div> */}

      {/* Featured Products */}
      {/* <Paper withBorder shadow="xs" px="xl" py='md' mx='md' my='xl'>
        <div className='flex flex-row justify-between items-center my-3'>
          <Text my={8} fz={22} fw={500} size='xl'>Featured Products</Text>
          <Link to='/products'>
            <div className="flex flex-row items-center">
              <Anchor href="/products" target="_blank" underline="hover" size='sm'>
                View More
              </Anchor>
            </div>
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mb-6'>
          {selectedRange.map((product, index) => (
            <div key={index}>
              <Paper shadow="xs" style={{ height: '100%' }}>
                <SmallCard data={product} />
              </Paper>
            </div>
          ))}
        </div>
      </Paper> */}



      <Container className={classes.wrapper} size={1400} my={80}>

<div className={classes.inner}>
  {/* <Title className={classes.title}>
    Mentorship{' '}
    <Text component="span" className={classes.highlight} inherit>
      to your interests
    </Text>
  </Title> */}

  {/* <Container p={0} size={600}>
    <Text size="lg" c="dimmed" className={classes.description}>
    Empowering growth through personalized mentorship – connect, learn, and succeed with our tailored mentoring platform.          </Text>
  </Container> */}

        {/* Using IconTextCard for fields */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6 lg:mx-12 mt-4">
        {fields.map((field, index) => (
          <IconTextCard
            key={index}
            icon={field.icon}
            title={field.title}
          />
        ))}
      </div>

  
</div>
</Container>

        {/* Using IconTextCard for fields */}
   
<div className='bg-gray-100 py-1 shadow-sm'>

      <Container className={classes.wrapper} size={1400} my={80}>

      <div className={classes.inner}>
        <Title className={classes.title}>
          We offer services{' '}
          <Text component="span" className={classes.highlight} inherit>
            to your needs
          </Text>
          {/* for any stack */}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
          Empowering growth through personalized mentorship – connect, learn, and succeed with our tailored mentoring platform.          </Text>
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

{/* Discover Mentorship */}
<div className='py-0 shadow-sm'>
  <Container className={classes.wrapper} size={1400} my={80}>
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

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto space-x-4 mb-6 lg:mx-36 mt-8 py-4">
        {members.map((member, index) => (
          <div key={index} className="min-w-[300px]"> {/* Set a minimum width for each card */}
            <ArticleCard
              imageUrl={member.imageUrl}
              linkUrl={member.linkUrl}
              title={member.title}
              description={`${member.description}\n${member.authorName}\nSessions: ${member.numberOfSessions}\nAttendance Rate: ${member.attendanceRate}`}
              authorName={member.authorName}
              authorAvatar={member.authorAvatar}
              badgeText={member.badgeText}
              badgeGradient={member.badgeGradient}
            />
          </div>
        ))}
      </div>
    </div>
  </Container>
</div>



     







      {/* Product Cards */}
      {/* <Paper withBorder shadow="xs" px="xl" py='md' m='md' mt='xl'>
        <div className='flex flex-row justify-between items-center my-3'>
          <Text my={8} fz={22} fw={500} size='xl'>Products</Text>
          <Link to='/products'>
            <div className="flex flex-row items-center">
              <Anchor href="/products" target="_blank" underline="hover" size='sm'>
                View More
              </Anchor>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 justify-center items-center mb-8">
          {selectedRange.map((product, index) => (
            <div key={index} className="w-full h-full">
              <ProductCard data={product} />
            </div>
          ))}
        </div>
      </Paper> */}

      <div className='bg-gray-100'>
      <FaqSimple />

      </div>
      <FooterLink />
    </div>
  );
}

export default HomePage;
