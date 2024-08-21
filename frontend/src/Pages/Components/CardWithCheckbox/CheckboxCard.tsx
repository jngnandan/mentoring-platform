import { UnstyledButton, Text } from '@mantine/core';
import { IconPalette } from '@tabler/icons-react'; // Import Tabler icons
import classes from './CheckboxCard.module.css';

export function IconTextCard({ icon: Icon, title, description }) {
  return (
    <UnstyledButton className={classes.button}>
      <Icon size={24} mr={4} />

      <div>
        <Text fw={500} ml={9} mb={7} lh={1.5}>
          {title}
        </Text>
        <Text fz="sm" c="dimmed">
          {description}
        </Text>
      </div>
    </UnstyledButton>
  );
}
