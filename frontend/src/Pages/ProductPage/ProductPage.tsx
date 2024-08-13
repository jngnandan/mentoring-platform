import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Image, Text, Group, Badge, Button, Loader, Grid, Breadcrumbs, Anchor } from '@mantine/core';

import classes from './FeaturesCard.module.css';
import { Link } from 'react-router-dom';
import { IconSmartHome } from '@tabler/icons-react';

export default function ProductItem() {
  const [deviceData, setDeviceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) { // Check if productId is valid
          const response = await axios.get(`http://localhost:3002/products/${productId}`);
          const deviceData = response.data;
          setDeviceData(deviceData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching device data:', error);
        setIsLoading(false);
      }
    };

    fetchData(); // Always call fetchData, but it won't make an API call if productId is null
  }, [productId]);


  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size={30} color="blue" />
      </div>
    );
  }

  if (!deviceData) {
    return <div>Loading...</div>;
  }

  const { name, img, detailSpec } = deviceData;
  const [
    categoryNetwork,
    categoryLaunch,
    categoryBody,
    categoryDisplay,
    categoryPlatform,
    categoryMemory,
    categoryMainCamera,
    categorySelfieCamera,
    categorySound,
    categoryComms,
    categoryFeatures,
    categoryBattery,
    categoryMisc,
  ] = detailSpec;

  // Function to render specifications for a given category
  const renderSpecifications = (category) => {
    return (
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
  };

  return (
    <div>
      <Breadcrumbs mx={14} py={20} px={30}>
        <Link to="/"><IconSmartHome/></Link> 
        <Link to="/products">Products</Link>
        <Anchor>{name}</Anchor>
      </Breadcrumbs>
      <Card withBorder radius="md" className={classes.card} mx={40} py={30} px={30}>
        <Card.Section className={classes.imageSection}>
          <img className="h-60" src={img} alt={name} />
        </Card.Section>

        <Group justify="space-between" my="md">
          <div>
            <Text lineClamp={2} fz={30} fw={500}>
              {name}
            </Text>
            <Text lineClamp={5} fz="xs" c="dark">
              {/* Description */}
            </Text>
          </div>
          <Badge size="xl" variant="outline">
            <Text size="xl">Discount</Text>
          </Badge>
        </Group>

        <Card.Section justify="space-between" className={classes.section}>
          <Group gap={30}>
            <div>
              <Text fz="sm" c="dark" fw={500} style={{ lineHeight: 1 }} mb={6}>
                Price
              </Text>

              <Text fz="lg" fw={700} style={{ lineHeight: 1 }}>
                {categoryMisc.specifications.find((spec) => spec.name === 'Price').value}
              </Text>
            </div>

            <Button radius="xl" size="md" style={{ flex: 0.5 }}>
              Buy
            </Button>
          </Group>
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <Text fz="md" c="dark" className={classes.label}>
            Network Specifications
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categoryNetwork)}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text fz="md" c="dark" className={classes.label}>
            Launch Specifications
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categoryLaunch)}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text fz="md" c="dark" className={classes.label}>
            Body Specifications
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categoryBody)}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text fz="md" c="dark" className={classes.label}>
            Display Specifications
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categoryDisplay)}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text fz="md" c="dark" className={classes.label}>
            Platform Specifications
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categoryPlatform)}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text fz="md" c="dark" className={classes.label}>
            Memory Specifications
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categoryMemory)}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text fz="md" c="dark" className={classes.label}>
            Main Camera Specifications
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categoryMainCamera)}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text fz="md" c="dark" className={classes.label}>
            Selife Camera Specifications
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categorySelfieCamera)}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text fz="md" c="dark" className={classes.label}>
            Sound Specifications
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categorySound)}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text fz="md" c="dark" className={classes.label}>
            Connectivity Specifications
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categoryComms)}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text fz="md" c="dark" className={classes.label}>
            Sensor
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categoryFeatures)}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text fz="md" c="dark" className={classes.label}>
            Battery Specifications
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categoryBattery)}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text fz="md" c="dark" className={classes.label}>
            Misc Specifications
          </Text>
          <Group gap={8} mb={1}>
            {renderSpecifications(categoryMisc)}
          </Group>
        </Card.Section>
      </Card>
    </div>
  );
}
