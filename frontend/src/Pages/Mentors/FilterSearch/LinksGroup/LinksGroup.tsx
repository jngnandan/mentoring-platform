import React, { useState, useContext } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem, Checkbox } from '@mantine/core';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import classes from './LinksGroup.module.css';
import { ContentContext } from '../../../../context/ContentContext.tsx';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) {
  const { checkboxData, setCheckboxData } = useContext(ContentContext);

  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const [selectedLinks, setSelectedLinks] = useState(
    (hasLinks ? links : []).reduce((acc, link) => {
      acc[link.label] = false;
      return acc;
    }, {})
  );

  const toggleLink = (label: string) => {
    setSelectedLinks((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));

    // Create a new object with the updated checkbox data
    const updatedCheckboxData = {
      ...checkboxData,
      [label]: !selectedLinks[label], // Update the checkbox state
    };

    // Update the checkboxData state in the context
    setCheckboxData(updatedCheckboxData);

    // Log the status of the clicked checkbox
    console.log(`Checkbox "${label}" is now ${!selectedLinks[label] ? true : false}`);
  };

  const items = (hasLinks ? links : []).map((link) => (
    <div key={link.label} className={classes.linkItem} className='flex flex-row justify-start items-center pl-6'>
      <Checkbox
        checked={selectedLinks[link.label]}
        onChange={() => toggleLink(link.label)}
        style={{ marginRight: '0px' }} // Adjust this margin as needed
      />
      <Text
        component="a"
        className={`${classes.link} ${selectedLinks[link.label] ? classes.selected : ''}`}
        href={link.link}
        onClick={(event) => {
          event.preventDefault();
          toggleLink(link.label);
        }}
        style={{ marginLeft: '0px' }} // Adjust this margin as needed
      >
        {link.label}
      </Text>
    </div>
  ));  

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
