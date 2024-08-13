
import React, { useContext } from 'react';
import { Text, Paper, Box, Container, Grid, SimpleGrid, rem, NavLink, Badge, Flex, Button, Anchor, Chip } from '@mantine/core';
import { loremIpsum } from 'lorem-ipsum';
import { Link } from 'react-router-dom';
import { ContentContext, ContentProvider } from '../../../context/ContentContext.tsx';
import ProductCard from '../../Home/ProductCard/ProductCard.tsx';
import FooterLinks from '../../Footer/FooterLinks.tsx';

import { PageHeader } from '../../Components/PageHeader.tsx';


export default function News() {
    const {dataFromBackend, products} = useContext(ContentContext)

    const selectedRange = dataFromBackend.slice(8, 15 + 1);

     // Generate Lorem Ipsum text
  const loremText = loremIpsum({
    count: 4,                      // Number of paragraphs to generate
    units: 'sentences',           // Generating paragraphs of text
    // format: 'html'                 // HTML format (you can use 'plain' for plain text)
  });

    return (
        <div>
            <PageHeader title="News" description={loremText} page="News" />

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

       
       <FooterLinks />
        </div>
    );
}