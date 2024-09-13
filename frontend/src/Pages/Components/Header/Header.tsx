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
  Image
} from "@mantine/core";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconUser,
  IconLogout,
  IconSettings,
  IconUserCircle,
  IconBoxMultiple,
} from "@tabler/icons-react";
import protocon from "../../../Images/protocon.png";
import { useContent } from "../../../context/ContentContext.tsx";
import Demo from "./Demo.tsx";
import classes from './HeaderMegaMenu.module.css'

const Header: React.FC = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [logoutModalOpened, setLogoutModalOpened] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current path

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

      await new Promise((resolve) => setTimeout(resolve, 500));

      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (authState.loading || isLoggingOut) {
    return <LoadingOverlay visible={true} />;
  }

  // Determine if the header should be fixed based on the current path
  const isHomePage = location.pathname === "/";

  return (
    <Box className="">
      <header
        className={`${
          isHomePage ? "relative" : "fixed w-full top-0 z-50"
        }  bg-opacity-10 backdrop-filter backdrop-blur-sm transition-all duration-300`}
      >
        <Group justify="space-between" className="h-full px-4 lg:pr-8 lg:pl-6">
          <Link to="/">
            <Image src={protocon} h={50} w='auto' alt="protocon" className="w-36 my-2" />
          </Link>

          <Group visibleFrom="sm" spacing="xs">
            {isLoggedIn ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton className="bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md rounded-full p-2 transition-all duration-300">
                    <Group>
                      <Avatar color="blue" radius="xl">
                        {user?.email?.[0].toUpperCase() || (
                          <IconUser size="1.5rem" />
                        )}
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
                  <Link to="/mentor-dashboard">
                    <Menu.Item leftSection={<IconSettings size={14} />}>
                      Mentor Dashboard
                    </Menu.Item>
                  </Link>
                  <Link to="/profile">
                    <Menu.Item leftSection={<IconBoxMultiple size={14} />}>
                      Bookings
                    </Menu.Item>
                  </Link>
                  <Menu.Item
                    leftSection={<IconLogout size={14} />}
                    onClick={handleLogoutClick}
                  >
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
  zIndex={1000000} // Add these classes for transparency and blur
>

  <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
    <Divider my="sm" />

    <Stack spacing="md" align="stretch">
      <Stack spacing="xs" align="stretch">
        <Link to="/" className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`} onClick={() => setDrawerOpened(false)}>
          Home
        </Link>
      </Stack>
      <Stack spacing="xs" align="stretch">
        <Link to="/mentors" className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`} onClick={() => setDrawerOpened(false)}>
          Mentors
        </Link>
      </Stack>
      <Stack spacing="xs" align="stretch">
        <Link to="/about" className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`} onClick={() => setDrawerOpened(false)}>
          About Us
        </Link>
      </Stack>
      <Stack spacing="xs" align="stretch">
        <Link to="/contact" className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`} onClick={() => setDrawerOpened(false)}>
          Contact Us
        </Link>
      </Stack>

      <Divider my="sm" />

      {isLoggedIn ? (
        <>
          <Stack spacing="xs" align="stretch">
            <Link to="/profile" className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`} onClick={() => setDrawerOpened(false)}>
              Account
            </Link>
          </Stack>
          <Stack spacing="xs" align="stretch">
            <Link to="/mentor-dashboard" className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`} onClick={() => setDrawerOpened(false)}>
              Mentor Dashboard
            </Link>
          </Stack>
          <Stack spacing="xs" align="stretch">
            <Link to="/profile" className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`} onClick={() => setDrawerOpened(false)}>
              Bookings
            </Link>
          </Stack>
          <Stack spacing="xs" align="stretch">
            <UnstyledButton onClick={handleLogoutClick} className={`bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md transition-all duration-300 ${classes.link}`}>
              <Button className="mt-4" onClick={() => setDrawerOpened(false)} leftSection={<IconLogout size={16} />}>
                Logout
              </Button>
            </UnstyledButton>
          </Stack>
        </>
      ) : (
        <Stack spacing="md" ml={14}>
          <Stack spacing="xs" align="stretch">
            <Link to="/login">
              <Button onClick={() => setDrawerOpened(false)} variant="default">Log in</Button>
            </Link>
          </Stack>
          <Stack spacing="xs" align="stretch">
            <Link to="/signup">
              <Button onClick={() => setDrawerOpened(false)}>Sign up</Button>
            </Link>
          </Stack>
        </Stack>
      )}
    </Stack>

    <Group justify="right" pb="xl" px="md">
      <Demo />
    </Group>
  </ScrollArea>
</Drawer>

      <LoadingOverlay visible={isLoggingOut} overlayBlur={2} />
    </Box>
  );
};

export default Header;
