import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Avatar,
  Menu,
  LoadingOverlay,
  Modal,
} from '@mantine/core';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconUser,
  IconLogout,
  IconSettings,
  IconUserCircle,
  IconBoxMultiple
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import protocon from '../../../Images/protocon.png';
import { useContent } from '../../../context/ContentContext.tsx';

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémons cry is very loud and distracting',
    page: 'products',
  },
  {
    icon: IconCoin,
    title: 'Mobile Offers',
    description: 'The fluid of Smeargles tail secretions changes',
    page: 'products',
  },
  {
    icon: IconBook,
    title: 'Catalog',
    description: 'Yanma is capable of seeing 360 degrees without',
    page: 'catalog',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shells rounded shape and the grooves on its.',
    page: 'products',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
    page: 'products',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
    page: 'products',
  },
];

const Header: React.FC = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [linksOpened, setLinksOpened] = useState(false);
  const [logoutModalOpened, setLogoutModalOpened] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const { authState, signOut } = useContent();
  const isLoggedIn = !!authState.user;
  const user = authState.user;

  const handleLogoutClick = () => {
    setLogoutModalOpened(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      setIsLoggingOut(true);
      setLogoutModalOpened(false);
      
      // Simulate a delay of 500ms (half a second)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const renderLinks = () =>
    mockdata.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Link to={`/${item.page}`}>
          <Group wrap="nowrap" align="flex-start">
            <ThemeIcon size={34} variant="default" radius="md">
              <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
            </ThemeIcon>
            <div>
              <Text size="sm" fw={500}>
                {item.title}
              </Text>
              <Text size="xs" c="dimmed">
                {item.description}
              </Text>
            </div>
          </Group>
        </Link>
      </UnstyledButton>
    ));

  if (authState.loading || isLoggingOut) {
    return <LoadingOverlay visible={true} />;
  }

  return (
    <Box pb={16} pt={16}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link to="/">
            <img src={protocon} alt="protocon" className="w-36" />
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/mentors" className={classes.link}>Mentors</Link>
            <Link to="/about" className={classes.link}>About Us</Link>
            <Link to="/contact" className={classes.link}>Contact Us</Link>
          </Group>

          <Group visibleFrom="sm">
            {isLoggedIn ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton>
                    <Group>
                      <Avatar color="blue" radius="xl">
                        {user?.email?.[0].toUpperCase() || <IconUser size="1.5rem" />}
                      </Avatar>
                      <Text>{user?.email}</Text>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Link to='/profile'>
                    <Menu.Item leftSection={<IconUserCircle size={14} />}>
                      Account
                    </Menu.Item>
                  </Link>
                  
                  <Menu.Item leftSection={<IconSettings size={14} />}>
                    Settings
                  </Menu.Item>

                  <Link to='/bookings'>
                    <Menu.Item leftSection={<IconBoxMultiple size={14} />}>
                      Bookings
                    </Menu.Item>
                  </Link>
                  
                  
                  <Menu.Item leftSection={<IconLogout size={14} />} onClick={handleLogoutClick}>
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="default">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </Group>

          <Burger 
            opened={drawerOpened} 
            onClick={() => setDrawerOpened((o) => !o)} 
            hiddenFrom="sm" 
          />
        </Group>
      </header>

      <Modal
        opened={logoutModalOpened}
        onClose={() => setLogoutModalOpened(false)}
        title="Confirm Logout"
        centered
      >
        <Text>Are you sure you want to log out?</Text>
        <Group mt="md" justify="flex-end">
          <Button variant="outline" onClick={() => setLogoutModalOpened(false)}>Cancel</Button>
          <Button color="red" onClick={handleLogoutConfirm}>Logout</Button>
        </Group>
      </Modal>

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          
          <Link to="/" className={classes.link}>Home</Link>
          
          <UnstyledButton className={classes.link} onClick={() => setLinksOpened((o) => !o)}>
            <Center inline>
              <Box component="span" mr={5}>Features</Box>
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{renderLinks()}</Collapse>
          
          <Link to="/learn" className={classes.link}>Learn</Link>
          <Link to="/academy" className={classes.link}>Academy</Link>
          
          <Divider my="sm" />
          
          <Group justify="center" grow pb="xl" px="md">
            {isLoggedIn ? (
              <UnstyledButton onClick={handleLogoutClick}>
                <Group>
                  <Avatar color="blue" radius="xl">
                    {user?.email?.[0].toUpperCase() || <IconUser size="1.5rem" />}
                  </Avatar>
                  <Text>Logout</Text>
                </Group>
              </UnstyledButton>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="default">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>

      <LoadingOverlay visible={isLoggingOut} overlayBlur={2} />
    </Box>
  );
};

export default Header;