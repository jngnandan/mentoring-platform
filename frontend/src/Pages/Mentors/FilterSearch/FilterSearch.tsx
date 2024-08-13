import React, { useContext, useEffect } from 'react';
import { Group, ScrollArea } from '@mantine/core';
import { IconNotes, IconCalendarStats, IconGauge, IconPresentationAnalytics, IconFileAnalytics, IconAdjustments, IconLock, IconCpu, IconDeviceSdCard, IconBattery3 } from '@tabler/icons-react';
import { LinksGroup } from './LinksGroup/LinksGroup.tsx';
// import { ContentContext } from '../../../context/ContentContext.tsx';
import classes from './FilterSearch.module.css';

const mockdata = [
  // { label: 'Dashboard', icon: IconGauge },
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
  // { label: 'Analytics', icon: IconPresentationAnalytics },
  // { label: 'Contracts', icon: IconFileAnalytics },
  // { label: 'Settings', icon: IconAdjustments },
  // {
  //   label: 'Battery',
  //   icon: IconBattery3,
  //   initiallyOpened: true,
  //   links: [
  //     { label: '3000 mAh', link: '/', checked: false },
  //     { label: '4000 mAh', link: '/', checked: false },
  //     { label: '5000 mAh', link: '/', checked: false },
  //   ],
  // },
];

export default function FilterSearch() {
  // const { checkboxData, setCheckboxData } = useContext(ContentContext);

  // const toggleLink = (label, checked) => {
    // Update the checkboxData state in the context
    // const newCheckboxData = { ...checkboxData };
    // newCheckboxData[label] = checked;
    // setCheckboxData(newCheckboxData);
  // };

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} 
    // toggleLink={toggleLink} 
    />
  ));

  return (
    <nav className={classes.navbar}>
    <div className={classes.header}>
      {/* <Group justify="space-between"> */}
        {/* Your header content */}
      {/* </Group> */}
    </div>

    <ScrollArea className={classes.links}>
      <div className={classes.linksInner}>{links}</div>
    </ScrollArea>

    {/* Your footer content */}
  </nav>
  );
}
