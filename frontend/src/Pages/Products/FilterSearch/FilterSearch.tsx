import React, { useContext, useEffect } from 'react';
import { Group, ScrollArea } from '@mantine/core';
import { IconNotes, IconCalendarStats, IconGauge, IconPresentationAnalytics, IconFileAnalytics, IconAdjustments, IconLock, IconCpu, IconDeviceSdCard, IconBattery3 } from '@tabler/icons-react';
import { LinksGroup } from './LinksGroup/LinksGroup.tsx';
// import { ContentContext } from '../../../context/ContentContext.tsx';
import classes from './FilterSearch.module.css';

const mockdata = [
  // { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Brands',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Apple', link: '/', checked: false },
      { label: 'Samsung', link: '/', checked: false },
      { label: 'Google', link: '/', checked: false },
      { label: 'Oneplus', link: '/', checked: false },
      { label: 'Xiaomi', link: '/', checked: false },
      { label: 'Motorola', link: '/', checked: false },
    ],
  },
  {
    label: 'Ram',
    icon: IconCpu,
    initiallyOpened: true,
    links: [
      { label: '4 GB', link: '/', checked: false },
      { label: '6 GB', link: '/', checked: false },
      { label: '8 GB', link: '/', checked: false },
    ],
  },
  {
    label: 'Storage',
    icon: IconDeviceSdCard,
    initiallyOpened: true,
    links: [
      { label: '128 GB', link: '/', checked: false },
      { label: '256 GB', link: '/', checked: false },
      { label: '512 GB', link: '/', checked: false },
      { label: '1024 GB', link: '/', checked: false },
    ],
  },
  // { label: 'Analytics', icon: IconPresentationAnalytics },
  // { label: 'Contracts', icon: IconFileAnalytics },
  // { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Battery',
    icon: IconBattery3,
    initiallyOpened: true,
    links: [
      { label: '3000 mAh', link: '/', checked: false },
      { label: '4000 mAh', link: '/', checked: false },
      { label: '5000 mAh', link: '/', checked: false },
    ],
  },
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
