import React, { useEffect, useState } from 'react';

import { useContext } from 'react';

import { ContentContext } from '../../context/ContentContext.tsx';
import { Card, Text } from '@mantine/core';

function About() {
  const { loading, setLoading, compareProducts, setCompareProducts, appleData} = useContext(ContentContext);



  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:${backendPort}/About`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const data = await response.json();
  //     setDataFromBackend(data);
  //     setLoading(false);
  //     // setFilteredData(data)
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };



  // useEffect(() => {
  //   // Fetch data only if dataFromBackend is empty
  //   if (dataFromBackend.length === 0) {
  //     fetchData();
  //   }
  // }, [dataFromBackend]);

  // console.log(appleData)

  return (
    <div>
            <Card withBorder radius="md" mx={40} py={30} px={30} mt={10}>
              <Text size="xl"fw={600} className='text-center pb-10'>About</Text>

              <Text>
              Welcome to [Your Company Name], where innovation meets excellence. Since our inception in [year], we've been on a mission to [briefly describe your company's mission, e.g., revolutionize the [industry] industry, provide cutting-edge solutions, deliver unmatched services]. Our commitment to quality and customer satisfaction drives everything we do.
              </Text>

              <Text mt={8}>
              At [Your Company Name], it's not just business; it's a passion. Our team of dedicated professionals works relentlessly to [briefly mention what your team does, e.g., push the boundaries of innovation, meet your unique needs, ensure your success]. We take pride in [mention something unique or an accomplishment of your company, e.g., our track record of success, industry leadership, commitment to sustainability].
              </Text>

            </Card>
    </div>
  );
}

export default About;
