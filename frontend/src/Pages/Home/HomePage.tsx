import React, { useContext } from 'react';
import { Text, Paper, Button, Anchor } from '@mantine/core';
import { SiAmazon, SiFlipkart, SiSamsung, SiOneplus, SiApple } from 'react-icons/si';
import { MdOutlineDesignServices, MdPeopleOutline } from "react-icons/md";
import { LiaToolsSolid } from "react-icons/lia";
import { FaRegHandshake } from "react-icons/fa6";
import { AiOutlineBuild } from "react-icons/ai";
import { BsLaptop } from "react-icons/bs";
import { SlSpeech } from "react-icons/sl";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { IconPalette, IconHome2, IconCircleOff, IconActivity } from '@tabler/icons-react';

import { ContentContext } from '../../context/ContentContext.tsx';

import ProductCard from './ProductCard/ProductCard.tsx';
import SmallCard from './SmallCard/SmallCard.tsx';
import { Link } from 'react-router-dom';
import FooterLink from '../Footer/FooterLinks.tsx';
import { HeroText } from './HeroText/HeroText.tsx';
import { FaqSimple } from '../FAQ/FaqSimple.tsx';
import { IconTextCard } from '../Components/CardWithCheckbox/CheckboxCard.tsx';
import { BigCard } from '../Components/BigCard/BigCard.tsx';

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
  { icon: MdPeopleOutline, title: 'Human Resources' },
  { icon: BsLaptop, title: 'Sales' },
  { icon: SlSpeech, title: 'Communications' },
  { icon: LiaPhotoVideoSolid, title: 'Video Editing' },
  { icon: FaRegHandshake, title: 'Finance' },
  { icon: IconHome2, title: 'Operations' },
  { icon: IconActivity, title: 'Content Creation' },
];

// New list of fields with icons and titles
const Categories = [
  { icon: IconPalette, title: 'Group Mentoring' },
  { icon: LiaToolsSolid, title: 'One-on-One Mentoring' },
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
      <div className="mx-8 md:px-66 md:mx-16">
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
      </div>

      {/* Featured Products */}
      <Paper withBorder shadow="xs" px="xl" py='md' mx='md' my='xl'>
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
      </Paper>

      {/* Using IconTextCard for fields */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6 mx-12">
        {fields.map((field, index) => (
          <IconTextCard
            key={index}
            icon={field.icon}
            title={field.title}
          />
        ))}
      </div>

        {/* Using IconTextCard for fields */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6 mx-12">
        {Categories.map((field, index) => (
          <BigCard
            key={index}
            icon={field.icon}
            title={field.title}
            description='lorem ipsum'
          />
        ))}
      </div>







      {/* Product Cards */}
      <Paper withBorder shadow="xs" px="xl" py='md' m='md' mt='xl'>
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
      </Paper>

      <FaqSimple />
      <FooterLink />
    </div>
  );
}

export default HomePage;
