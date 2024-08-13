import React from 'react';
import { Card, Image, Text, Group, Badge, Center, Anchor, ActionIcon, rem,  Breadcrumbs } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import classes from './FeaturesCard.module.css';
import { Link } from 'react-router-dom';

const mockdata = [
  { label: '4 passengers', icon: IconUsers },
  { label: '100 km/h in 4 seconds', icon: IconGauge },
  { label: 'Automatic gearbox', icon: IconManualGearbox },
  { label: 'Electric', icon: IconGasStation },
];

export default function ProductCard(props) {
  const { data } = props;
  const { id, img, url, name, description, deal } = data; // Destructure `deal` directly

  const { currency, storeImg, discount } = deal;



  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <div>
    <Card withBorder radius="sm" className={classes.card}>
      <Link to={`/products/${id}`}>
        <Card.Section className={classes.imageSection}>
          {/* <Image className='h-50' style={{ height: '200px' }} src={img} alt={name} /> */}
          <img className='h-50' style={{ height: '200px' }} src={img} alt={name} />
        </Card.Section>
      </Link>

      <Group justify="space-between" mt="sm">
        <div>
          <Text lineClamp={2} fw={500}>{name}</Text>
          {/* <Text lineClamp={8} h={90} fz="xs" c="dimmed"> */}
            {/* {description} */}
          {/* </Text> */}
        </div>
        <Badge size="xl" variant="gradient">
          <Text size='md' fw={600}>{discount}% Discount</Text>
        </Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Stores
        </Text>

        <Group gap={8} mb={-8}>
          <Anchor href={url} target="_blank" underline="always">
            <ActionIcon withBorder pl={8} style={{ width: rem(100), height: rem(40) }} justify="center" variant="default">
              <img className='xs' w="140" src={storeImg} alt={name} />
            </ActionIcon>
          </Anchor>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Text size='sm' pb={4}>Price</Text>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              {/* {currency} */}
              {/* {price} */}
            </Text>
          </div>
        </Group>
      </Card.Section>
    </Card>
    </div>
  )
}
