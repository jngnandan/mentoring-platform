import { UnstyledButton, Text, Card } from '@mantine/core';
import { IconPalette } from '@tabler/icons-react'; // Import Tabler icons

export function BigCard({ icon: Icon, title, description }) {
  return (
    <Card withBorder className="flex w-full pl-5 min-h-[200px] mx-auto border rounded-lg p-6 transition-colors duration-300 ">
      <Icon size={44} stroke={1.2} className="mr-4" />

      <div>
        <Text fw={500} mt='sm' className="ml-2 mb-2 text-xl">
          {title}
        </Text>
        <Text size="sm" mt='md' className="text-gray-500">
          {description}
        </Text>
      </div>
    </Card>
  );
}
