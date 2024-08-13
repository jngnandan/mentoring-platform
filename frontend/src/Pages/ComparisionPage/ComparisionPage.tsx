import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Image, Text, Badge, Button, Loader, Breadcrumbs, Anchor, Grid } from '@mantine/core';
import classes from './FeaturesCard.module.css';
import { ContentContext } from '../../context/ContentContext.tsx';
import { IconSmartHome } from '@tabler/icons-react';


const sectionData = [
  { category: 'Network Specifications', spec: 'categoryNetwork' },
  { category: 'Launch Specifications', spec: 'categoryLaunch' },
  { category: 'Body Specifications', spec: 'categoryBody' },
  { category: 'Display Specifications', spec: 'categoryDisplay' },
  { category: 'Platform Specifications', spec: 'categoryPlatform' },
  { category: 'Memory Specifications', spec: 'categoryMemory' },
  { category: 'Main Camera Specifications', spec: 'categoryMainCamera' },
  { category: 'Selife Camera Specifications', spec: 'categorySelfieCamera' },
  { category: 'Sound Specifications', spec: 'categorySound' },
  { category: 'Connectivity Specifications', spec: 'categoryComms' },
];


export default function ComparisonPage() {
  const { compareProducts, } = useContext(ContentContext);

  const [product1, product2, ...restProducts] = compareProducts;
  const [deviceData1, setDeviceData1] = useState(null);
  const [deviceData2, setDeviceData2] = useState(null);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchDeviceData = async (id, setDeviceData, setIsLoading) => {
      try {
        const response = await axios.get(`http://localhost:3002/products/${id}`);
        setDeviceData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching device data:', error);
        navigate('/products')
        setIsLoading(false);
      }
    };

    fetchDeviceData(product1.id, setDeviceData1, setIsLoading1);
    fetchDeviceData(product2.id, setDeviceData2, setIsLoading2);
  }, [product1.id, product2.id]);

  if (isLoading1 || isLoading2) {
    return (
      <div className='flex flex-col justify-center items-center h-screen'>
      <Loader size={30} />
      </div>
    );
  }

  const { name: name1, img: img1, detailSpec: detailSpec1  } = deviceData1;
  const { name: name2, img: img2, detailSpec: detailSpec2 } = deviceData2;

  const [
    categoryNetwork1,
    categoryLaunch1,
    categoryBody1,
    categoryDisplay1,
    categoryPlatform1,
    categoryMemory1,
    categoryMainCamera1,
    categorySelfieCamera1,
    categorySound1,
    categoryComms1,
    categoryFeatures1,
    categoryBattery1,
    categoryMisc1,
  ] = detailSpec1;

    const [
    categoryNetwork2,
    categoryLaunch2,
    categoryBody2,
    categoryDisplay2,
    categoryPlatform2,
    categoryMemory2,
    categoryMainCamera2,
    categorySelfieCamera2,
    categorySound2,
    categoryComms2,
    categoryFeatures2,
    categoryBattery2,
    categoryMisc2,
  ] = detailSpec2;

  // console.log('cool', deviceData.detailSpec)
  // console.log(detailSpec1)

  const specifications1 = categoryMisc1.specifications;
  const specifications2 = categoryMisc2.specifications;

  // Find the 'Price' specification
  const priceSpecification1 = specifications1.find((spec) => spec.name === 'Price');
  const priceSpecification2 = specifications2.find((spec) => spec.name === 'Price');

  const price1 = priceSpecification1 ? priceSpecification1.value : 'N/A';
  const price2 = priceSpecification2 ? priceSpecification2.value : 'N/A';

  // console.log(deviceData2)
  // console.log(price2)

    // Helper function to render specifications
    const renderSpecifications = (category) => (
      <Grid gutter="sm">
        {category.specifications.map((specification, index) => (
          <Grid.Col gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} span={6} key={index}>
            <Text fw={500}>{specification.name}</Text>
            <Text fz="sm" c="dark">
              {specification.value}
            </Text>
          </Grid.Col>
        ))}
      </Grid>
    );

  return (
    <Fragment>
      <Breadcrumbs mx={14} py={20} px={30}>
        <Link to="/"><IconSmartHome/></Link> 
        <Link to="/products">Products</Link>
        <Anchor>Compare Devices</Anchor>
      </Breadcrumbs>
    <div className={classes.comparisonContainer}>
      <Grid gutter="lg" className='mx-8'>
        <Grid.Col span={6}>
          <Card withBorder radius="md" py={30} px={30}>
            <Card.Section className={classes.imageSection}>
              <img className="h-60" src={img1} alt={name1} />
            </Card.Section>
            
            <Text lineClamp={2} fz={30} fw={500}>
              {name1}
            </Text>
            
            <Text lineClamp={2} size="md" my={4} fz={22}>{price1}</Text>
            <div className='flex flex-row justify-end'>
            <Badge size="xl" variant="outline">
              Discount
            </Badge>
            </div>
          </Card>

          <Card withBorder mt={8}>
          {sectionData.map(({ category, spec }, index) => (
            <Fragment key={index} >
              {/* <Card withBorder radius="md" py={30} px={30}> */}
                {/* <Card.Section className={classes.imageSection}> */}
                <Text lineClamp={2} fz={20} fw={500} mt={16} mb={10}>
                    {category}
                  </Text>
                {/* </Card.Section> */}
              {/* </Card> */}
              {renderSpecifications(eval(spec + '1'))}
            </Fragment>
          ))}
          </Card>

        </Grid.Col>
        
        <Grid.Col span={6}>
          <Card withBorder radius="md" py={30} px={30}>
            <Card.Section className={classes.imageSection}>
              <img className="h-60" src={img2} alt={name2} />
            </Card.Section>
            <Text lineClamp={2} fz={30} fw={500}>
              {name2}
            </Text>
            <Text lineClamp={2} size="md" my={4} fz={22}>{price2}</Text>
            <div className='flex flex-row justify-end'>
            <Badge size="xl" variant="outline">
              Discount
            </Badge>
            </div>
          </Card>
          
          <Card withBorder mt={8}>
          {sectionData.map(({ category, spec }, index) => (
            <Fragment key={index}>
              {/* <Card withBorder radius="md" py={30} px={30}> */}
                {/* <Card.Section className={classes.imageSection}> */}
                  <Text lineClamp={2} fz={20} fw={500} mt={16} mb={10}>
                    {category}
                  </Text>
                {/* </Card.Section> */}
              {/* </Card> */}
              {renderSpecifications(eval(spec + '2'))}
            </Fragment>
          ))}
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  </Fragment>
  );
}
