import React, { useContext, useEffect, useState, useRef } from 'react';
import { ContentContext } from '../../context/ContentContext.tsx';
import { Box, Flex, Loader, Paper, Select, Button, Modal, Input, Text, Card, Image, Breadcrumbs, Anchor, Chip, Checkbox, ScrollArea} from '@mantine/core';
import { useMediaQuery, useDisclosure, useElementSize } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cheerio from 'cheerio';
import gsmarena from 'gsmarena-api';
import { IconSmartHome } from '@tabler/icons-react';

// import oneplus from '../../../../server/localData/oneplus.json'
import ProdctCard from './ProductCard.tsx';

import NewCard from './NewCard.tsx';
import FilterSearch from './FilterSearch/FilterSearch.tsx';

import { IconColumns3, IconPlus } from '@tabler/icons-react';
import SmallCard from './SmallCard.tsx';

import { useNavigate } from 'react-router-dom';

import { FaMoneyBill, FaNewspaper, FaMobile, FaTablet, FaLaptop, FaTv, FaCamera, FaSnowflake, FaHeadphones } from 'react-icons/fa';

// import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff, IconPhoto, IconArrowRight } from '@tabler/icons-react';
import { SiAmazon, SiFlipkart, SiSamsung, SiOneplus, SiApple, SiGoogle, SiHuawei, SiXiaomi, SiSony, SiMotorola, SiAsus, SiBlackberry } from 'react-icons/si';
import FooterLinks from '../Footer/FooterLinks.tsx';
import ArticleCard from '../Components/ArticleCard/ArticleCard.tsx';


  // Create an array of icon components
  // Icons
  const icons = [
    // <SiAmazon key="amazon" size={30} />,
    // <SiFlipkart key="flipkart" size={30} />,
    { icon: <SiApple size={32} />, name: 'Apple' },
    { icon: <SiSamsung size={32} />, name: 'Samsung' },
    { icon: <SiGoogle size={32} />, name: 'Google' },
    { icon: <SiOneplus size={32} />, name: 'Oneplus' },
    // { icon: <SiHuawei size={32} />, name: 'Huawei' },
    { icon: <SiXiaomi size={32} />, name: 'Xiaomi' },
    // { icon: <SiSony size={32} />, name: 'Sony' },
    { icon: <SiMotorola size={32} />, name: 'Motorola' },
    // { icon: <SiAsus size={32} />, name: 'Asus' },
    // { icon: <SiBlackberry size={32} />, name: 'Blackberry' },
  ];
  
  //categories
  const categories = [
    { label: 'Deals', icon: <FaMoneyBill size={28} /> },
    { label: 'News', icon: <FaNewspaper size={28} /> },
    { label: 'Mobiles', icon: <FaMobile size={28} /> },
    { label: 'Tablets', icon: <FaTablet size={28} /> },
    { label: 'Laptops', icon: <FaLaptop size={28} /> },
    { label: 'TVs', icon: <FaTv size={28} /> },
    { label: 'Cameras', icon: <FaCamera size={28} /> },
    { label: 'ACs', icon: <FaSnowflake size={28} /> },
    { label: 'Fridge', icon: <FaSnowflake size={28} /> },
    { label: 'Earphones', icon: <FaHeadphones size={28} /> },
  ];


function Mentors() {
    // Context and state
  const { dataFromBackend, loading, setLoading, compareProducts, setCompareProducts, appleData, fetchAppleData, samsungData, fetchSamsungData, xiaomiData, fetchXiaomiData, oneplusData, fetchOneplusData,  fetchGoogleData, googleData, fetchMotorolaData, motorolaData, checkboxData, mobilesData, fetchMobilesData, profilesData, fetchProfilesData} = useContext(ContentContext);
  // const [loading, setLoading] = useState(true);
  const isXS = useMediaQuery('(max-width: 575px)');
  const isSM = useMediaQuery('(max-width: 48em)')
  const [selectedSortOption, setSelectedSortOption] = useState('Featured');
  const [opened, { open, close }] = useDisclosure(false);
  const [secondModalOpened, setSecondModalOpened] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(mobilesData);
  const [clickProduct, setClickProduct] = useState([]);
  const [clickProduct1, setClickProduct1] = useState();
  const [clickProduct2, setClickProduct2] = useState();
  const [clickProduct3, setClickProduct3] = useState();
  const [clickProduct4, setClickProduct4] = useState();
  // const [compareProducts, setCompareProducts] = useState();
  const [selectedBrand, setSelectedBrand] = useState('apple');

  // Add a state variable to keep track of the number of items initially displayed
  const [displayedItems, setDisplayedItems] = useState(12);

  const [selectedIcons, setSelectedIcons] = useState([]); // Add this line
  
  const [page, setPage] = useState(1); // Track the page number for pagination
  const [loadingMore, setLoadingMore] = useState(false); // Track loading s
  // const [one, setOne] = useState(false)
  // const [two, setTwo] = useState(false)

  const bottomRef = useRef(null);
  const [shouldLoadMore, setShouldLoadMore] = useState(true);

  const selectedProfiles = profilesData ? profilesData.slice(0, 20) : [];

    // Helper function to render mentors
    const renderProfiles = () =>
      selectedProfiles.map((profile) => (
        <ArticleCard
          key={profile.id}
          profilepic={profile.profile_picture || 'https://via.placeholder.com/150'}
          linkUrl={profile.linkUrl || '#'}
          summary={profile.bio || 'No description available'}
          first_name={profile.first_name || 'Unknown'}
          last_name={profile.last_name || 'User'}
          job={profile.job_title || 'No job title'}
          bio={profile.bio || 'No bio available'}
          company={profile.company || 'No company available'}
          hobbies={profile.hobbies || 'No hobbies listed'}
          achievements={profile.achievements || 'No achievements listed'}
          contributions={profile.contributions || 'No contributions listed'}
          created_at={profile.last_updated || 'Date not available'}
          social_media_links={profile.social_media_links || 'No social media links available'}
          bookings={profile.bookings || 'No bookings available'}
          badgeText={profile.badgeText || 'Default Badge'}
          badgeGradient={profile.badgeGradient || { from: 'gray', to: 'white' }}
          experience={profile.experience || '5'}
        />
      ));


    // Handle scroll for infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  
      if (scrollHeight - scrollTop === clientHeight) {
        loadMoreItems();
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

    // Handle intersection for infinite scrolling
useEffect(() => {
  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      loadMoreItems();
    }
  };

  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '600px', // Adjust this margin to start loading more items earlier
    threshold: 1, // Consider lowering this threshold for early triggering
  });

  if (bottomRef.current) {
    observer.observe(bottomRef.current);
  }

  return () => {
    if (bottomRef.current) {
      observer.unobserve(bottomRef.current);
    }
  };
}, []);
  // ...

  // const loadMoreItems = () => {
  //   // Increase the number of displayed items by 20
  //   setDisplayedItems(displayedItems + 12);
  // };

  // Load more items when reaching the bottom of the page
  const loadMoreItems = () => {
    setLoadingMore(true);
    // Simulate an asynchronous operation with a delay
    setTimeout(() => {
      setDisplayedItems(prevDisplayedItems => prevDisplayedItems + 12);
      setLoadingMore(false);
    }, 10); // Adjust this delay as needed
  };


  useEffect(() => {
    // Fetch data only if dataFromBackend is empty
    if (appleData.length === 0) {
      fetchAppleData();
    }
    // if (appleData.length === 0) {
    //   fetchSamsungeData();
      
    // }
  }, [appleData]);


    // Fetch profiles on mount
  useEffect(() => {
    // Fetch data only if dataFromBackend is empty
    if (profilesData.length === 0) {
      fetchProfilesData();
    }
    // if (appleData.length === 0) {
    //   fetchSamsungeData();
      
    // }
  }, [profilesData]);


    // Handle brand icon click
  const handleIconClick = (name) => {
    setSelectedBrand(name);
    setSearchQuery('');
    // setLoading(true);
    setDisplayedItems(24);
    // console.log(name)

    if (selectedIcons.includes(name)) {
      // If the clicked button is already selected, remove it
      setSelectedIcons(selectedIcons.filter((selectedIcon) => selectedIcon !== name));
    } else {
      // If the clicked button is not selected, add it and remove others
      setSelectedIcons([name]);
    }
  };

  // console.log(selectedIcons)
    // Whenever checkboxData changes, update the selected icons based on the checkboxData
    useEffect(() => {
      const updatedSelectedIcons = [];
  
      // Loop through the available icons and add those that are in checkboxData with a true value
      icons.forEach((icon) => {
        if (checkboxData[icon.name] === true) {
          updatedSelectedIcons.push(icon.name);
        }
      });
  
      setSelectedIcons(updatedSelectedIcons);
    }, [checkboxData]);
  
    // Update filtered data based on selected brand
  useEffect(() => {
    let updatedFilteredData = dataFromBackend;
    
    if (selectedBrand.toLowerCase() === 'apple') {
      if (appleData.length === 0) {
        fetchAppleData();
        setLoading(true);
      }
      // updatedFilteredData = appleData;
      // Filter out items with the brand 'apple'
    updatedFilteredData = updatedFilteredData.filter(item => item && item.brand && item.brand.toLowerCase() !== 'apple');
    // Add new Apple data to the front
    updatedFilteredData = [...appleData, ...updatedFilteredData];


      // console.log('updatedFilteredData', updatedFilteredData)
    } if (selectedBrand.toLowerCase() === 'samsung') {
      // Set filteredData to Samsung data or any other brand as needed
      if (samsungData.length === 0) {
        fetchSamsungData();
        // setLoading(true);
      }
      // updatedFilteredData = samsungData;
      updatedFilteredData = updatedFilteredData.filter(item => item && item.brand && item.brand.toLowerCase() !== 'samsung');
      // Add new Apple data to the front
      updatedFilteredData = [...samsungData, ...updatedFilteredData];
    } if (selectedBrand.toLowerCase() === 'xiaomi') {
      // Set filteredData to Samsung data or any other brand as needed
      if (xiaomiData.length === 0) {
        fetchXiaomiData();
        // setLoading(true);
      }
      updatedFilteredData = updatedFilteredData.filter(item => item && item.brand && item.brand.toLowerCase() !== 'xiaomi');
      // Add new Apple data to the front
      updatedFilteredData = [...xiaomiData, ...updatedFilteredData];

    } if (selectedBrand.toLowerCase() === 'oneplus') {
      // Set filteredData to Samsung data or any other brand as needed
      if (oneplusData.length === 0) {
        fetchOneplusData();
        // setLoading(true);
            // console.log(oneplusData)
      }
      // updatedFilteredData = oneplusData;
      updatedFilteredData = updatedFilteredData.filter(item => item && item.brand && item.brand.toLowerCase() !== 'oneplus');
      // Add new Apple data to the front
      updatedFilteredData = [...oneplusData, ...updatedFilteredData];
      // console.log('updatedFilteredData', updatedFilteredData)
    }  if (selectedBrand.toLowerCase() === 'motorola') {
      // Set filteredData to Samsung data or any other brand as needed
      if (motorolaData.length === 0) {
        fetchMotorolaData();
        // setLoading(true);
            // console.log(motorolaData)
      }
      updatedFilteredData = updatedFilteredData.filter(item => item && item.brand && item.brand.toLowerCase() !== 'motorola');
      // Add new Apple data to the front
      updatedFilteredData = [...motorolaData, ...updatedFilteredData];
      // console.log('updatedFilteredData', updatedFilteredData)
    } if (selectedBrand.toLowerCase() === 'google') {
      // Set filteredData to Samsung data or any other brand as needed
      if (googleData.length === 0) {
        fetchGoogleData();
        // setLoading(true);
            // console.log(googleData)
      }
      updatedFilteredData = updatedFilteredData.filter(item => item && item.brand && item.brand.toLowerCase() !== 'google');
      // Add new Apple data to the front
      updatedFilteredData = [...googleData, ...updatedFilteredData];
      // console.log('updatedFilteredData', updatedFilteredData)
    }
    // Add similar conditions for other brands
  
    setFilteredData(updatedFilteredData);
    setLoading(false);
  }, [selectedBrand, appleData, xiaomiData, samsungData, oneplusData, googleData, motorolaData]);
  


    // Update filtered data based on checkbox selection
  useEffect(() => {
    let updatedFilteredData = [...dataFromBackend]; // Create a copy of the original data
  
    // Function to fetch and concatenate data for a specific brand
    const fetchAndConcatenateData = (brandData, fetchDataFunction) => {
      if (brandData.length === 0) {
        fetchDataFunction();
      }
      return [...brandData, ...updatedFilteredData]; // Concatenate brand data to the existing data
    };
  
    // Iterate through the checkboxData and fetch/concatenate data for selected brands
    for (const brand in checkboxData) {
      if (checkboxData[brand]) {
        switch (brand) {
          case 'Samsung':
            updatedFilteredData = fetchAndConcatenateData(samsungData, fetchSamsungData);
            break;
          case 'Xiaomi': // Fix the brand name
            updatedFilteredData = fetchAndConcatenateData(xiaomiData, fetchXiaomiData); // Fix the fetch function name
            break;
          case 'Oneplus':
            updatedFilteredData = fetchAndConcatenateData(oneplusData, fetchOneplusData);
            break;
          case 'Motorola':
            updatedFilteredData = fetchAndConcatenateData(motorolaData, fetchMotorolaData);
            break;
          case 'Google':
            updatedFilteredData = fetchAndConcatenateData(googleData, fetchGoogleData);
            break;
          case 'Apple':
            updatedFilteredData = fetchAndConcatenateData(appleData, fetchAppleData);
            break;
          // Add more cases for other brands
          default:
            break;
        }
      }
    }
  
    // Update the state with the final concatenated data
    setFilteredData(updatedFilteredData);
  }, [checkboxData, dataFromBackend]);
  
  
  
  
  


  const { ref, width, height } = useElementSize();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if dataFromBackend is available and set loading accordingly
    if (dataFromBackend && dataFromBackend.length > 0) {
      setLoading(false);
      setFilteredData(dataFromBackend);
    }
  }, [dataFromBackend]);

    // Select a product for comparison
  const selectProduct = (id) => {
    const foundItem = dataFromBackend.find((item) => item.id === id);
    setClickProduct((prevClickProduct) => [foundItem, ...prevClickProduct]);
  };

  useEffect(() => {
    if (clickProduct.length > 0) {
      setClickProduct1(clickProduct[0]);
    }

    if (clickProduct.length > 1) {
      setClickProduct2(clickProduct[1]);
    }

    if (clickProduct.length > 2) {
      setClickProduct3(clickProduct[2]);
    }

    if (clickProduct.length > 3) {
      setClickProduct4(clickProduct[3]);
    }
  }, [clickProduct]);

    // Open the second modal
  const openSecondModal = () => {
    setSecondModalOpened(true);
  };

  const closeSecondModal = () => {
    setSecondModalOpened(false);
  };

    // Handle search input change
  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = dataFromBackend.filter((product) => {
      return product.name.toLowerCase().includes(query);
    });
    setFilteredData(filtered);
  };

    // Handle comparison
  const handleComparision = () => {
    setCompareProducts(clickProduct);
    navigate('/compare');
  };

  // const newList = filteredData.map(eachitem => eachitem.name.toLowerCase == one)

  return (
    <div className="flex flex-col min-h-screen">     

      {loading ? (
        <div className='flex flex-col justify-center items-center h-screen'>
          <Loader size={48} color="blue" size={30} />
        </div>
      ) : (
        <Flex>
          {!isXS && !isSM && (
            <div style={{ flex: '0 0 12.2em', }}>
              <FilterSearch />
            </div>
          )}
          <div style={{ flex: '1', paddingRight: '0.7em'}}>
            {/* Brands */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3 mx-4">
              {icons.map((icon, index) => (
                
                <Button
                onClick={() => handleIconClick(icon.name)}
                justify="center"
                variant={selectedIcons.includes(icon.name) ? 'outline' : 'default'} // Conditionally apply variant
                key={icon.name} // Use icon.name as a key
                size="xl"
              >
                {icon.icon}
              </Button>


              ))}
            </div>

              <div className='flex flex-row justify-between items-center'>
                <div className='pl-4'>
                  <Breadcrumbs py={20}>
                    <Link to="/"><IconSmartHome/></Link>
                    <Anchor>Products</Anchor>
                  </Breadcrumbs>
                </div>


                <div className="flex flex-row justify-end items-center pr-2">
                  <Button
                    leftSection={<IconColumns3 size={14} />}
                    variant="light"
                    onClick={open}
                  >
                    Compare
                  </Button>
                  {/* <Select
                    w={180}
                    my={10}
                    ml={20}
                    placeholder="Featured"
                    data={['Featured', 'Price - Low to High', 'Price - High to Low']}
                    value={selectedSortOption}
                    onChange={(value) => setSelectedSortOption(value)}
                  /> */}
                </div>
              </div>
              {/* <ScrollArea style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}> */}
              {/* <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 mx-4'>
                {selectedProfiles.slice(0, displayedItems).map((product, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  > */}
                    {/* <Paper padding="xl" shadow="xs" radius="xs" style={{ height: '100%' }}> */}
                      {/* <NewCard data={product} /> */}
                      {/* {renderProfiles()} */}
                      {/* <ProdctCard data={product}/> */}
                    {/* </Paper> */}
                  {/* </div>
                ))}
              </div> */}

              <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 mx-4 my-4'>
  {selectedProfiles.slice(0, displayedItems).map((product, index) => (
    <div
      key={index}
      className="flex flex-col justify-between h-full"
    >
      {renderProfiles()}
    </div>
  ))}
</div>


              {/* </ScrollArea> */}
          </div>
        </Flex>
      )}

      <Modal
        opened={opened}
        onClose={() => {
          close();
          closeSecondModal();
          setClickProduct([]);
          setClickProduct1(null);
          setClickProduct2(null);
          setClickProduct3(null);
          setClickProduct4(null);
        }}
        title="Compare Products"
        size="xl"
        centered
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', minHeight: '100px' }}>
          {clickProduct1 ? (
            <div>
              <Card className='items-center'>
                <img src={clickProduct1.img} h={200}/>
                <Text size="sm" fw={600} variant="gray" pt={10}>{clickProduct1.name}</Text>
              </Card>
            </div>
          ) : (
            <Button
              leftSection={<IconPlus size={14} />}
              variant="light"
              style={{ margin: '10px' }}
              onClick={openSecondModal}
            >
              Compare
            </Button>
          )}

          {clickProduct2 ? (
            <div>
              <Card className='items-center'>
                <img src={clickProduct2.img} h={200}/>
                <Text size="sm" fw={600} variant="gray" pt={10}>{clickProduct2.name}</Text>
              </Card>
            </div>
          ) : (
            <Button
              leftSection={<IconPlus size={14} />}
              variant="light"
              style={{ margin: '10px' }}
              onClick={openSecondModal}
            >
              Compare
            </Button>
          )}
        </div>
        <div>
          {clickProduct1 && (
            <div className='flex flex-row justify-center items-center'>
              <Button variant='filled' onClick={handleComparision} mb={12}>Compare Devices</Button>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        opened={secondModalOpened}
        onClose={() => {
          closeSecondModal();
          setSearchQuery('');
          setClickProduct1(null);
          setClickProduct2(null);
          setClickProduct3(null);
          setClickProduct4(null);
        }}
        title="Search Products"
        size="lg"
        centered
      >
        <Paper padding="xl" shadow="xs" radius="xs" style={{ height: '100%', minHeight: '300px' }}>
          <Input
            placeholder="Search for products"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <Paper padding="xl" shadow="xs" radius="xs" mt={10} style={{ height: '100%' }}>
            {filteredData.map((product, index) => {
              return <SmallCard smallData={product} key={index} selectProduct={selectProduct} closeSecondModal={closeSecondModal} />
            })}
          </Paper>
        </Paper>
      </Modal>
      
{/* Place the reference div here */}
<div ref={bottomRef} />
 {/* Add a button to load more items */}
      {filteredData.length > displayedItems && (
        <div className="flex justify-center mt-7">
          <Button variant='light' onClick={loadMoreItems}>Load More</Button>
        </div>
      )}

      <div className='mb-auto'>
      {!loading&&<FooterLinks/>}
      </div>
    </div>
  );
}

export default Mentors;