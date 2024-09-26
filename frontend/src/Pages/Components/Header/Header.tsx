import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Group,
  Button,
  UnstyledButton,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
  Avatar,
  Menu,
  LoadingOverlay,
  Modal,
  Stack,
  Image,
  Indicator,
  Paper,
  Container,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconUser,
  IconLogout,
  IconSettings,
  IconUserCircle,
  IconBoxMultiple,
  IconBellRinging,
  IconAt,
  IconLayoutGrid
} from "@tabler/icons-react";
import protocon from "../../../Images/protocon.png";
import { useContent } from "../../../context/ContentContext.tsx";
import Demo from "./Demo.tsx";
import classes from './HeaderMegaMenu.module.css';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

const Header: React.FC = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [logoutModalOpened, setLogoutModalOpened] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notificationVisible, { toggle: toggleNotification }] = useDisclosure(true);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const { 
    authState, 
    signOut, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    clearAllNotifications,
    unreadNotificationsCount 
  } = useContent();
  const isLoggedIn = !!authState.user;
  const user = authState.user;

  const handleLogoutClick = () => {
    setLogoutModalOpened(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      setIsLoggingOut(true);
      setLogoutModalOpened(false);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
    clearAllNotifications();
  };

  const handleSwitchToMentoring = async () => {
    if (user && user.email) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', user.email)
          .single();

        if (error) throw error;

        if (data) {
          // Profile exists, redirect to mentor dashboard
          navigate('/mentor-dashboard');
        } else {
          // Profile doesn't exist, redirect to mentor registration
          navigate('/mentor-register');
        }
      } catch (error) {
        console.error('Error checking mentor profile:', error);
        // Fallback to mentor registration in case of error
        navigate('/mentor-register');
      }
    }
  };

  const isHomePage = location.pathname === "/";

  const renderNotification = (notification) => {
    let message = '';
    let icon;
    switch (notification.type) {
      case 'booking':
        message = `Booking ${notification.action} by ${notification.user}`;
        icon = <Avatar src={notification.avatar} size="md" />;
        break;
      case 'announcement':
        message = notification.title;
        icon = (
          <Avatar color="blue" radius="xl">
            <IconBellRinging size="1.5rem" />
          </Avatar>
        );
        break;
      default:
        message = 'New notification';
        icon = <IconNotification size="1.5rem" />;
    }

    return (
      <Group noWrap align="flex-start">
        {icon}
        <div>
          <Text size="sm" weight={500}>
            {message}
          </Text>
          {notification.type === 'announcement' && (
            <Text size="xs" color="dimmed" mt={4}>
              <Link to={notification.link} style={{ color: 'inherit', textDecoration: 'underline' }}>
                Read more
              </Link>
            </Text>
          )}
        </div>
      </Group>
    );
  };

  if (authState.loading || isLoggingOut) {
    return <LoadingOverlay visible={true} />;
  }

  return (
    <Paper withBorder>
      <header
        className={`${
          isHomePage ? "relative" : "fixed w-full top-0 z-50"
        }  bg-opacity-10 backdrop-filter backdrop-blur-sm transition-all duration-300`}
      >
        <Group justify="space-between" className="h-full px-4 lg:pr-8 lg:pl-6">
          <Link to="/">
            <Image src={protocon} h={50} w="auto" alt="protocon" className="w-36 my-2" />
          </Link>

          <Group visibleFrom="sm" spacing="xs">
            {isLoggedIn && (
              <Menu shadow="md" width={320}>
                <Menu.Target>
                  <Indicator inline disabled={!notificationVisible} color="red" size={12}>
                    <ActionIcon 
                      size={42} 
                      variant="default" 
                      onClick={toggleNotification}
                      aria-label="Notifications"
                    >
                      <IconNotification style={{ width: rem(24), height: rem(24) }} />
                    </ActionIcon>
                  </Indicator>
                </Menu.Target>
                <Menu.Dropdown className="bg-opacity-80 backdrop-filter backdrop-blur-lg border border-gray-200 dark:border-gray-700">
                  <Paper p="md" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {notifications.map((notification) => (
                      <Box key={notification.id} mb="md">
                        <Link 
                          to={notification.link} 
                          style={{ textDecoration: 'none', color: 'inherit' }}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          {renderNotification(notification)}
                        </Link>
                        {notification.id !== notifications[notifications.length - 1].id && <Divider my="sm" />}
                      </Box>
                    ))}
                    {notifications.length === 0 && <Text size="sm" align="center">No new notifications</Text>}
                  </Paper>
                  <Divider />
                  <Group position="apart" p="xs">
                    <Button variant="subtle" compact>View all notifications</Button>
                    <Button variant="subtle" compact onClick={handleMarkAllAsRead}>Mark all as read</Button>
                  </Group>
                </Menu.Dropdown>
              </Menu>
            )}

            {isLoggedIn ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton className="bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md rounded-full p-2 transition-all duration-300">
                    <Group>
                      <Avatar
                        size="md"
                        radius="xl"
                        src={user?.photoURL || undefined}
                      >
                        {!user?.photoURL && (user?.email?.[0].toUpperCase() || <IconUser size="1.5rem" />)}
                      </Avatar>
                      <Text>{user?.email}</Text>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown className="bg-opacity-80 backdrop-filter backdrop-blur-lg border border-gray-200 dark:border-gray-700">
                  <Link to="/profile">
                    <Menu.Item leftSection={<IconUserCircle size={14} />}>
                      Account
                    </Menu.Item>
                  </Link>
                  {/* <Link to="/mentor-dashboard">
                    <Menu.Item leftSection={<IconSettings size={14} />}>
                      Mentor Dashboard
                    </Menu.Item>
                  </Link> */}
                  <Menu.Item 
                    leftSection={<IconLayoutGrid size={14} />}
                    onClick={handleSwitchToMentoring}
                  >
                    Switch to Mentoring
                  </Menu.Item>
                  <Menu.Item leftSection={<IconLogout size={14} />} onClick={handleLogoutClick}>
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="default"
                    className="bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-500 bg-opacity-80 hover:bg-opacity-100 backdrop-filter backdrop-blur-md transition-all duration-300">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            <Demo />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={() => setDrawerOpened((o) => !o)}
            hiddenFrom="sm"
            className="sm:hidden"
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
          <Button variant="outline" onClick={() => setLogoutModalOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleLogoutConfirm}>
            Logout
          </Button>
        </Group>
      </Modal>

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        size="100%"
        padding="md"
        title="Navigation"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Stack spacing="md" align="stretch">
            <Link
              to="/"
              className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`}
              onClick={() => setDrawerOpened(false)}
            >
              Home
            </Link>
            <Link
              to="/mentors"
              className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`}
              onClick={() => setDrawerOpened(false)}
            >
              Mentors
            </Link>
            <Link
              to="/about"
              className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`}
              onClick={() => setDrawerOpened(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`}
              onClick={() => setDrawerOpened(false)}
            >
              Contact Us
            </Link>

            <Divider my="sm" />

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`}
                  onClick={() => setDrawerOpened(false)}
                >
                  Account
                </Link>
                <Link
                  to="/mentor-dashboard"
                  className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`}
                  onClick={() => setDrawerOpened(false)}
                >
                  Mentor Dashboard
                </Link>
                <UnstyledButton
                  onClick={() => {
                    handleSwitchToMentoring();
                    setDrawerOpened(false);
                  }}
                  className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`}
                >
                  Switch to Mentoring
                </UnstyledButton>
                <UnstyledButton
                  onClick={handleLogoutClick}
                  className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`}
                >
                  <Button
                    className="mt-4"
                    onClick={() => setDrawerOpened(false)}
                    leftSection={<IconLogout size={16} />}
                  >
                    Logout
                  </Button>
                </UnstyledButton>
              </>
            ) : (
              <Stack spacing="md" ml={14}>
                <Link to="/login">
                  <Button onClick={() => setDrawerOpened(false)} variant="default">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button onClick={() => setDrawerOpened(false)}>Sign up</Button>
                </Link>
              </Stack>
            )}
          </Stack>

          <Group justify="right" pb="xl" px="md">
            <Demo />
          </Group>
        </ScrollArea>
      </Drawer>

      <LoadingOverlay visible={isLoggingOut} overlayBlur={2} />
    </Paper>
  );
};

export default Header;