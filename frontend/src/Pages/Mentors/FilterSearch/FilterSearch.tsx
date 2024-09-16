import React from 'react';
import { ScrollArea } from '@mantine/core';
import { IconNotes, IconCpu, IconDeviceSdCard } from '@tabler/icons-react';
import { LinksGroup } from './LinksGroup/LinksGroup.tsx';
import classes from './FilterSearch.module.css';

const mockdata = [
  {
    label: 'Fields',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Design', link: '/', checked: false },
      { label: 'Engineering', link: '/', checked: false },
      { label: 'Marketing', link: '/', checked: false },
      { label: 'Product', link: '/', checked: false },
      { label: 'Sales', link: '/', checked: false },
      { label: 'Soft Skills', link: '/', checked: false },
      { label: 'Content Writing', link: '/', checked: false },
      { label: 'Video Editing', link: '/', checked: false },
    ],
  },
  {
    label: 'Hobbies',
    icon: IconCpu,
    initiallyOpened: true,
    links: [
      { label: 'Reading', link: '/', checked: false },
      { label: 'Artistic', link: '/', checked: false },
      { label: 'Music', link: '/', checked: false },
      { label: 'Hiking', link: '/', checked: false },
      { label: 'Cycling', link: '/', checked: false },
      { label: 'Camping', link: '/', checked: false },
      { label: 'Yoga', link: '/', checked: false },
      { label: 'Zumba', link: '/', checked: false },
    ],
  },
  {
    label: 'Sports',
    icon: IconDeviceSdCard,
    initiallyOpened: true,
    links: [
      { label: 'Swimming', link: '/', checked: false },
      { label: 'Basketball', link: '/', checked: false },
      { label: 'Soccer', link: '/', checked: false },
      { label: 'Golf', link: '/', checked: false },
      { label: 'Tennis', link: '/', checked: false },
      { label: 'Martial Arts', link: '/', checked: false },
      { label: 'Running/Marathons', link: '/', checked: false },
      { label: 'Skateboarding', link: '/', checked: false },
      { label: 'Badminton', link: '/', checked: false },
    ],
  },
];

export default function FilterSearch() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar} className='mt-14'>
      <div className={classes.header}>
        {/* Your header content */}
      </div>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
      {/* Your footer content */}
    </nav>
  );
}