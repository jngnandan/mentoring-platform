import { UnstyledButton, Text, Card } from '@mantine/core';
import { IconPalette } from '@tabler/icons-react'; // Import Tabler icons

export function IconTextCard({ icon: Icon, title, description }) {
  return (
    <Card withBorder className="flex w-full max-w-xs mx-auto border rounded-md">
      <Icon size={24} className="mr-4" />

      <div>
        <Text fw={500} className="ml-2 mb-2 leading-snug text-lg font-semibold">
          {title}
        </Text>
        <Text size="sm" className="text-gray-500">
          {description}
        </Text>
      </div>
    </Card>
  );
}
