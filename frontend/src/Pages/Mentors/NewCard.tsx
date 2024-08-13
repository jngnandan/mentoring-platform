import React from 'react';
import { Card, Image, Text, Group, Badge, Center, Anchor, ActionIcon, rem,  Breadcrumbs, List } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers, } from '@tabler/icons-react';
import classes from './FeaturesCard.module.css';
import { Link } from 'react-router-dom';
import NewCardLoader from './NewCardLoader.tsx';
import { CustomPlaceholder } from 'react-placeholder-image';

import {
  IconCalendarDue,
  IconArrowsMaximize,
  IconCpu,
  IconBattery3,
  IconDeviceSdCard,
  IconCpu2,
  IconBrandLoom,
} from '@tabler/icons-react';

// import { useDebounce } from 'use-debounce'; // Example, you might need to install this package
// import { FixedSizeList as List } from 'react-window';
// import Imgix from 'react-imgix';

const NewCard = React.memo(function NewCard(props) {
  const { data } = props;
  const { id, img, name, description, new_id, price } = data; // Destructure `deal` directly

  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
//   const { price, currency, storeImg, discount } = deal;
const handleImageLoaded = () => {
  setImageLoaded(true);
};

const handleImageError = () => {
  setImageError(true);
};// console.log(props)

// const [debouncedDescription] = useDebounce(description, 300); // Debounce the description



const showItems = React.useCallback((description) => {
  const phone_info = description;

  // Identify specific information
  const identifiedItems = phone_info.split(',').filter((item) => {
    return (
      item.toLowerCase().includes('announced') ||
      item.toLowerCase().includes('display') ||
      item.toLowerCase().includes('chipset') ||
      item.toLowerCase().includes('battery') ||
      item.toLowerCase().includes('storage') ||
      item.toLowerCase().includes('ram') ||
      item.toLowerCase().includes('glass')
    );
  });

  // Define icon mapping for each identified item
  const iconMapping = {
    announced: IconCalendarDue,
    display: IconArrowsMaximize,
    chipset: IconCpu,
    battery: IconBattery3,
    storage: IconDeviceSdCard,
    ram: IconCpu2,
    glass: IconBrandLoom,
  };

  const formattedItems = identifiedItems.map((item, index) => {
    const lowerItem = item.toLowerCase();
    let keyword = Object.keys(iconMapping).find((key) => lowerItem.includes(key.toLowerCase()));
    let IconComponent = iconMapping[keyword] || IconBrandLoom; // Default to IconBrandLoom if no match

    // Additional check for variations related to 'glass'
    if (lowerItem.includes('glass')) {
      keyword = 'glass';
      IconComponent = IconBrandLoom;
    }

    let info = item.trim();
    if (keyword === 'announced') {
      // Extract the information related to "announced" until the full stop
      const announcedInfo = lowerItem.includes('announced') ? item.split('.')[1] : item;
      info = announcedInfo.trim();
    } else if (keyword === 'display') {
      // Extract the information related to "display" until the next comma
      const displayMatch = lowerItem.match(/display[^,]*/);
      info = displayMatch ? displayMatch[0].slice(7).trim() : item;
    } else if (keyword === 'glass') {
      // If the item contains "glass", use the Glass icon
      IconComponent = IconBrandLoom;
    }

    return (
      <List.Item key={index} className='my-1'>
        <span className='flex flex-row gap-4 items-center font-medium	text-gray-500'>
          {IconComponent && <IconComponent size={24}      
          stroke={1.6}  // set `stroke-width`
          strokeLinejoin="miter" // override other SVG props
/>} 
{info}
        </span>
      </List.Item>
    );
  });

  return <List>{formattedItems}</List>;
}, []); // Empty dependency array means this function won't change unless props change

  
  
  
  return (
    <div>
    <Card withBorder radius="sm" >
    <Link to={`/products/${new_id}`}>
          <Card.Section className={classes.imageSection}>
            {!imageLoaded && !imageError && (
              <CustomPlaceholder
              className="position-absolute inset-0 w-full h-full object-cover rounded-md"                width={300} // Set width as needed
                height={200} // Set height as needed
                text=""
              />
            )}
            <img
              className={`max-h-44 ${(!imageLoaded || imageError) ? 'hidden' : ''}`}
              src={img}
              alt={name}
              onLoad={handleImageLoaded}
              onError={handleImageError}
            />
            {imageError && (
              <div className="error-message">
                Error loading image. Please try again later.
              </div>
            )}
          </Card.Section>
        </Link>



      
      <Card.Section >

      <Group p={16} justify="space-between" className='border-t-2 border-gray-300 mt-4'>
          {/* <Card.Section>
            <Group className='border-b-2 border-gray-300 w-screen pl-4 pt-3'> */}
            <div className='flex flex-col justify-center'>
            <div className='ml-2'>
            <Text style={{ height: '32px', overflow: 'hidden' }} lineClamp={2} size='lg' fw={600} c='black'>{name}</Text>
            </div>
            {/* </Group>
          </Card.Section > */}
          <div className='ml-2 mb-0.5 mt-2'>
          <Text h={184} fz="xs" c="dark">
            {/* {description} */}
            {showItems(description)}
          </Text>
          </div>
            </div>
           
          
        {/* <Badge size="xl" variant="gradient">
          <Text size='md' fw={600}>% Discount</Text>
        </Badge> */}
      </Group>
      </Card.Section >

      <Card.Section className={classes.section} ml={0} mt={3}>
        <Text fz="sm" c="dimmed" className={classes.label}>
          Stores
        </Text>

        {/* <Group gap="sm"> */}
        <div className="flex flex-row gap-2">
  <a href="https://amazon.co.uk" target="_blank" className="" rel="noopener noreferrer">
    <div className="border border-1 border-gray-300 p-0.5 flex flex-col justify-center items-center rounded-sm w-18 h-12 md:w-24 md:h-12">
      <img className="pt-1.5 px-3" width="75" src="https://res.cloudinary.com/dgcfly5zo/image/upload/v1700139316/fc8gf8cb8igvx8x2y2c4.svg" alt="name" />
      <p className="pt-1 text-sm">£{price}</p>
    </div>
  </a>
  <a href="https://amazon.co.uk" target="_blank" className="" rel="noopener noreferrer">
    <div className="border border-1 border-gray-300 p-0.5 flex flex-col justify-center items-center rounded-sm w-18 h-12 md:w-24 md:h-12">
      <img className="pt-1.5 px-3" width="78" src="https://res.cloudinary.com/dgcfly5zo/image/upload/v1700139317/dj0vjddl27br0zxvdwop.png" alt="name" />
      <p className="pt-1 text-sm">£{price}</p>
    </div>
  </a>
</div>

        {/* </Group> */}
      </Card.Section>

      {/* <Card.Section >
        <Group gap={30}>
          <div> */}
            {/* <Text size='sm' pb={4}>Price</Text> */}
            {/* <Text fz="xl" fw={700} pl={8}> */}
              {/* {price} */}
            {/* </Text> */}
          {/* </div> */}
        {/* </Group> */}
      {/* </Card.Section> */}
    </Card>
    </div>
  )
});
export default NewCard;
