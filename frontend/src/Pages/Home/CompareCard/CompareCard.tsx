import React, { useState, useEffect} from 'react';
import { Card, Image, Text, Group, Badge, Center, ActionIcon, rem } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import classes from './FeaturesCard.module.css';
import { Link } from 'react-router-dom';


export default function CompareCard(props) {
  const { data, data2 } = props;
  const { id: id1, img: img1, url: url1, name: name1, description: description1, deal: deal1 } = data;

  const { price: price1, currency: currency1, storeImg: storeImg1, discount: discoun1 } = deal1;


  const [id2, setId2] = useState('');
  const [img2, setImg2] = useState('');
  const [url2, setUrl2] = useState('');
  const [name2, setName2] = useState('');
  const [description2, setDescription2] = useState('');
  const [price2, setPrice2] = useState(0);
  const [currency2, setCurrency2] = useState('');
  const [storeImg2, setStoreImg2] = useState('');
  const [discount2, setDiscount2] = useState(0);

  useEffect(() => {
    // Assuming data2 is an array
    data2.forEach((item, index) => {
      const { id, img, url, name, description, deal } = item;
      setId2(id);
      setImg2(img);
      setUrl2(url);
      setName2(name);
      setDescription2(description);

      if (deal) {
        const { price, currency, storeImg, discount } = deal;
        setPrice2(price);
        setCurrency2(currency);
        setStoreImg2(storeImg);
        setDiscount2(discount);
      }
    });
  }, [data2]);


  // console.log(id2, img2, url2, name2, description2, price2, currency2, storeImg2, discount2);




  // State variable to track the click status
  const [isClicked, setIsClicked] = useState(false);

  // Function to handle the card click
  const handleCardClick = () => {
    setIsClicked(!isClicked);
    // selectProduct(id)
    // closeSecondModal()
  };

  // Conditionally apply a CSS class based on the click status
  const cardClassName = `${classes.card} ${isClicked ? classes.clicked : ''}`;

  return (
    <Link to={`/products/${id1}`}>

<Card withBorder  style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center', }} onClick={handleCardClick}>

  <Card.Section>
    <img className='p-1 pl-2 pt-5' style={{ height: '110px', width: '110px' }} src={img1} alt={name1} />
  </Card.Section>

  <Card.Section className={classes.section} style={{ flex: 1, marginLeft: '2rem', justifyContent: 'start' }}>
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '8px' }}>
      <div>
        <Text lineClamp={2} fw={500} fz='lg' mb={6}>{name1}</Text>
      </div>
      <Group gap={30}>
        <div>
          <Text size="sm" pb={4}>Price</Text>
          <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
            {currency1}{price1}
        </Text>
        </div>
      </Group>
    </div>
  </Card.Section>
</Card>
</Link>

  );
}
