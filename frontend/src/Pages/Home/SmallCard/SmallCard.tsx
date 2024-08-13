import React, { useState } from 'react';
import { Card, Image, Text, Group, Badge, Center, ActionIcon, rem } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import classes from './FeaturesCard.module.css';
import { Link } from 'react-router-dom';


export default function SmallCard(props) {
  const { data } = props;
  const { id, img, url, name, description, deal } = data; // Destructure `deal` directly

  const { price, currency, storeImg, discount } = deal;

  // State variable to track the click status
  const [isClicked, setIsClicked] = useState(false);

  // Function to handle the card click
  const handleCardClick = () => {
    setIsClicked(!isClicked);
    // selectProduct(id)
    // closeSecondModal()
    console.log(id)
  };

  // Conditionally apply a CSS class based on the click status
  const cardClassName = `${classes.card} ${isClicked ? classes.clicked : ''}`;

  return (
    <Link to={`/products/${id}`}>

<Card withBorder  style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center', }} onClick={handleCardClick}>

  <Card.Section>
    <img className='p-1 pl-2 pt-5' style={{ height: '110px', width: '110px' }} src={img} alt={name} />
  </Card.Section>

  <Card.Section className={classes.section} style={{ flex: 1, marginLeft: '2rem', justifyContent: 'start' }}>
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '8px' }}>
      <div>
        <Text lineClamp={2} fw={500} fz='lg' mb={6}>{name}</Text>
      </div>
      <Group gap={30}>
        <div>
          <Text size="sm" pb={4}>Price</Text>
          <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
            {currency}{price}
        </Text>
        </div>
      </Group>
    </div>
  </Card.Section>
</Card>
</Link>

  );
}
