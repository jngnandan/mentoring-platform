import React, { useState } from 'react';
import { Card, Image, Text, Group, Badge, Center, ActionIcon, rem } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import classes from './FeaturesCard.module.css';
import { Link } from 'react-router-dom';

const mockdata = [
  { label: '4 passengers', icon: IconUsers },
  { label: '100 km/h in 4 seconds', icon: IconGauge },
  { label: 'Automatic gearbox', icon: IconManualGearbox },
  { label: 'Electric', icon: IconGasStation },
];

export default function SmallCard(props) {
  const { smallData, selectProduct, closeSecondModal} = props;
  const { id, img, url, name, description, deal } = smallData;

  // const { price, currency, storeImg, discount } = deal;

  // State variable to track the click status
  const [isClicked, setIsClicked] = useState(false);

  // Function to handle the card click
  const handleCardClick = () => {
    setIsClicked(!isClicked);
    selectProduct(id)
    closeSecondModal()
  };

  // Conditionally apply a CSS class based on the click status
  const cardClassName = `${classes.card} ${isClicked ? classes.clicked : ''}`;

  return (
    <Card withBorder radius="md" className={cardClassName} mb={6} onClick={handleCardClick}>
      <Card.Section className={classes.imageSection}>
        <img  style={{ height: '140px' }} src={img} alt={name} />
      </Card.Section>

      <Group justify="space-between">
        <div>
          <Text lineClamp={2} fw={500}>{name}</Text>
        </div>
      </Group>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            {/* <Text size="sm" pb={4}>Price</Text> */}
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              {/* {currency}{price} */}
            </Text>
          </div>
        </Group>
      </Card.Section>
    </Card>
  );
}
