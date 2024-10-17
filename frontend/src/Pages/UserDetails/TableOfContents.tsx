import React from 'react';
import { Box, Text, Group, rem } from '@mantine/core';
import { IconListSearch } from '@tabler/icons-react';
import cx from 'clsx';

const links = [
  { label: 'Usage', link: '#usage', order: 1 },
  { label: 'Position and placement', link: '#position', order: 1 },
  { label: 'With other overlays', link: '#overlays', order: 1 },
  { label: 'Manage focus', link: '#focus', order: 1 },
  { label: 'Examples', link: '#1', order: 1 },
  { label: 'Show on focus', link: '#2', order: 2 },
  { label: 'Show on hover', link: '#3', order: 2 },
  { label: 'With form', link: '#4', order: 2 },
];

const active = '#overlays'; // Set the active link dynamically if needed

export function TableOfContents() {
  const items = links.map((item) => (
    <Box<'a'>
      component="a"
      href={item.link}
      onClick={(event) => event.preventDefault()}
      key={item.label}
      className={cx("block text-sm text-gray-800 hover:bg-gray-200 p-1", { "font-medium text-blue-600 border-l-2 border-blue-600": active === item.link })}
      style={{ paddingLeft: `calc(${item.order} * 1rem)` }} // Adjust the padding for Tailwind
    >
      {item.label}
    </Box>
  ));

  return (
    <div>
      <Group mb="md">
        <IconListSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        <Text>Table of contents</Text>
      </Group>
      {items}
    </div>
  );
}
