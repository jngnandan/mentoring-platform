import React from 'react';
import { Text, Paper, Box, Container, Grid, SimpleGrid, rem, NavLink, Badge, Flex, Button, Anchor, Chip } from '@mantine/core';
import { SiAmazon, SiFlipkart, SiSamsung, SiOneplus, SiApple } from 'react-icons/si';
import { FaMoneyBill, FaNewspaper, FaMobile, FaTablet, FaLaptop, FaTv, FaCamera, FaSnowflake, FaHeadphones } from 'react-icons/fa';
import { MdOutlineDesignServices, MdPeopleOutline } from "react-icons/md";
import { LiaToolsSolid } from "react-icons/lia";
import { SlSpeech } from "react-icons/sl";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuFileVideo } from "react-icons/lu";
import { AiOutlineBuild } from "react-icons/ai";
import { FaRegHandshake } from "react-icons/fa6";
import { BsLaptop } from "react-icons/bs";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { IconHome2, IconChevronRight, IconActivity, IconCircleOff, IconPhoto, IconArrowRight } from '@tabler/icons-react';


import { useContext } from 'react';

import { ContentContext, ContentProvider } from '../../context/ContentContext.tsx';

import ProductCard from './ProductCard/ProductCard.tsx';
import SmallCard from './SmallCard/SmallCard.tsx';

import { Link } from 'react-router-dom';

import FooterLink from '../Footer/FooterLinks.tsx'
import CompareCard from './CompareCard/CompareCard.tsx';
import { HeroText } from './HeroText/HeroText.tsx';

  // Create an array of icon components
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
  // { label: 'Fridge', icon: <FaSnowflake size={28} />, link: '/fridge' },
  // { label: 'Earphones', icon: <FaHeadphones size={28} />, link: '/earphones' },
];



function HomePage() {

  const {dataFromBackend, products} = useContext(ContentContext)

  // console.log(dataFromBackend)

  const selectedRange = dataFromBackend.slice(8, 15 + 1);

  const newRange = dataFromBackend.slice(16, 23 + 1);

  // console.log('cool',dataFromBackend)

  const SECONDARY_COL_HEIGHT = `calc(${400} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <div>
      <HeroText/>

      {/* <Paper radius="md" p="md" variant='filled' className='w-screen'>
        <Button.Group className='justify-center w-screen'>
          {icons.map((icon, index) => (
            <Button key={icon.key} variant="light" p='3%' size='7%'>
              {icon}
            </Button>
          ))}
        </Button.Group>
      </Paper> */}

            {/* The Grid with circular icons as a row */}
      <div className="mx-8 md:px-66 md:mx-16">
  <div className="border p-4 ">
    <div className="grid grid-cols-4 gap-6 md:grid-cols-8">
      {categories.map((category, index) => (
        <Link to={category.link}>
        <div
          className="text-center"
          key={index}
        >
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

      {/* The Grid with Unsplash images */}
      {/* <Container my="md" >
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <img
            src="https://source.unsplash.com/random/800x800/?nature"
            alt="Image 1"
            style={{ width: '100%', height: '360px', borderRadius: '6px', objectFit: 'fill' }}
          />
          <Grid gutter="md">
            <Grid.Col>
              <img
                src="https://source.unsplash.com/random/800x400/?city"
                alt="Image 2"
                style={{ width: '100%', height: '200px', borderRadius: '6px', objectFit: 'fill' }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <img
                src="https://source.unsplash.com/random/800x800/?event"
                alt="Image 3"
                style={{ width: '100%', height: '100%', borderRadius: '6px', objectFit: 'fill' }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <img
                src="https://source.unsplash.com/random/800x800/?technology"
                alt="Image 4"
                style={{ width: '100%', height: '100%', borderRadius: '6px', objectFit: 'fill' }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <img
                src="https://source.unsplash.com/random/800x800/?ai"
                alt="Image 4"
                style={{ width: '100%', height: '100%', borderRadius: '6px', objectFit: 'fill' }}
              />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container> */}

      
       {/* Product Cards */}
       <Paper withBorder shadow="xs" px="xl" py='md' m='md' mt='xl'>
       <div
        className='flex flex-row justify-between items-center my-3'
      >

        <Text my={8} fz={22} fw={500} size='xl'>Products</Text>
        <Link to='/products'>
        <div className="flex flex-row items-center">
        <Anchor href="/products" target="_blank" underline="hover" size='sm'>
          View More
        </Anchor>
        {/* <IconArrowRight size={22} /> */}
      </div>
        </Link>
          
        </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 justify-center items-center mb-8">
              {selectedRange.map((product, index) => (
                <div
                  key={index}
                  className="w-full h-full"
                >
                  <ProductCard data={product} />
                </div>
              ))}
            </div>
       </Paper>

        {/* Popular Product Cards */}
        <Paper withBorder shadow="xs" px="xl" py='md' mx='md' my='xl'>
       <div
        className='flex flex-row justify-between items-center my-3'
      >

        <Text my={8} fz={22} fw={500} size='xl'>Popular Products</Text>
        <Link to='/products'>
        <div className="flex flex-row items-center">
        <Anchor href="/products" target="_blank" underline="hover" size='sm'>
          View More
        </Anchor>
        {/* <IconArrowRight size={22} /> */}
      </div>
        </Link>
        </div>
        
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  mb-6'>
                {(newRange).map((product, index) => (
                  <div
                    key={index}>
                    <Paper shadow="xs"  style={{ height: '100%' }}>
                      <SmallCard data={product} />
                    </Paper>
                  </div>
                ))}
              </div>
       </Paper>


        {/* Realted Compare Product Cards */}
        <Paper withBorder shadow="xs" px="xl" py='md' mx='md' my='xl'>
       <div
        className='flex flex-row justify-between items-center my-3'
      >

        <Text my={8} fz={22} fw={500} size='xl'>Compare Products</Text>
        <Link to='/products'>
        <div className="flex flex-row items-center">
        <Anchor href="/products" target="_blank" underline="hover" size='sm'>
          View More
        </Anchor>
        {/* <IconArrowRight size={22} /> */}
      </div>
        </Link>
        </div>
        
       <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  mb-6'>
                {(newRange).map((product, index) => {
                  return (
                  <div
                    key={index}>
                    <Paper shadow="xs"  style={{ height: '100%' }}>
                      <CompareCard data={product} data2={selectedRange}/>
                    </Paper>
                  </div>
                )})}
        </div>

       </Paper>

 


    
        {/* Footer */}
        <FooterLink/>

  

      

    </div>
  );
}

export default HomePage;
