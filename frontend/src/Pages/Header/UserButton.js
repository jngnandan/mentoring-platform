import { useState } from 'react';
import { UnstyledButton, Group, Avatar, Text, rem, Menu, Divider } from '@mantine/core';
import { IconChevronRight, IconLogout, IconSettings } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Updated import
import { auth } from '../../firebase'; // Adjust the import based on your project structure
import classes from './UserButton.module.css';

export function UserButton({ name, email, avatar }) {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [menuOpened, setMenuOpened] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out from Firebase
      // Optionally, clear any local user state or context
      // For example: setUser(null);
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Menu
      opened={menuOpened}
      onClose={() => setMenuOpened(false)}
      onOpen={() => setMenuOpened(true)}
      transition="pop-top-right"
      position="bottom-end"
      width={200}
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar src={avatar} radius="xl" />
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {name}
              </Text>
              <Text c="dimmed" size="xs">
                {email}
              </Text>
            </div>
            <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconSettings size={rem(16)} />} onClick={() => {/* Navigate to settings */}}>
          Settings
        </Menu.Item>
        <Divider />
        <Menu.Item icon={<IconLogout size={rem(16)} />} color="red" onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
