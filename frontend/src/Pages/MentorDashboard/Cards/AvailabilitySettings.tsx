import React, { useState } from 'react';
import { Card, Text, Button, Switch, Select, TextInput, Group } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilitySettings = () => {
  const [availabilities, setAvailabilities] = useState(
    weekDays.reduce((acc, day) => ({ ...acc, [day]: { enabled: true, times: ['10:00', '12:00', '14:00', '16:00'] } }), {})
  );
  const [newDay, setNewDay] = useState('Everyday');
  const [newTime, setNewTime] = useState('10:00');

  const toggleDay = (day) => {
    setAvailabilities(prev => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled }
    }));
  };

  const removeTime = (day, time) => {
    setAvailabilities(prev => ({
      ...prev,
      [day]: { ...prev[day], times: prev[day].times.filter(t => t !== time) }
    }));
  };

  const addTime = () => {
    if (newDay === 'Everyday') {
      setAvailabilities(prev => {
        const updated = {};
        Object.keys(prev).forEach(day => {
          updated[day] = {
            ...prev[day],
            times: [...new Set([...prev[day].times, newTime])].sort()
          };
        });
        return updated;
      });
    } else {
      setAvailabilities(prev => ({
        ...prev,
        [newDay]: {
          ...prev[newDay],
          times: [...new Set([...prev[newDay].times, newTime])].sort()
        }
      }));
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="h-full">
      <Text weight={500} size="lg" mb="md">Posting Times</Text>
      {weekDays.map(day => (
        <Group key={day} position="apart" mb="xs" className="flex-wrap">
          <Text className="w-full sm:w-auto">{day}</Text>
          <Switch checked={availabilities[day].enabled} onChange={() => toggleDay(day)} />
          <Group spacing="xs" className="w-full sm:w-auto mt-2 sm:mt-0">
            {availabilities[day].times.map(time => (
              <Button key={time} variant="light" size="xs" onClick={() => removeTime(day, time)}>
                {time} ✕
              </Button>
            ))}
          </Group>
        </Group>
      ))}
      <Group grow mt="md" className="flex-col sm:flex-row">
        <Select
          data={['Everyday', ...weekDays]}
          value={newDay}
          onChange={setNewDay}
        />
        <TextInput value={newTime} onChange={(event) => setNewTime(event.currentTarget.value)} />
      </Group>
      <Button onClick={addTime} fullWidth mt="sm">Add</Button>
      <Group position="right" mt="md" className="flex-col sm:flex-row">
        <Button variant="outline" color="gray" fullWidth >Clear All</Button>
        <Button variant="outline" color="gray" fullWidth >Disable All</Button>
        <Button color="green" fullWidth >Save</Button>
      </Group>
    </Card>
  );
};

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);
  const [events] = useState([
    {
      title: 'Sample Event',
      start: new Date(2023, 8, 10, 10, 0),
      end: new Date(2023, 8, 10, 12, 0),
    },
    // Add more events as needed
  ]);

  const handleNavigate = (action) => {
    const newDate = new Date(date);
    switch (action) {
      case 'PREV':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'NEXT':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'TODAY':
        newDate.setTime(new Date().getTime());
        break;
      default:
        break;
    }
    setDate(newDate);
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="h-full">
      <Group position="apart" mb="md">
        <Text weight={500} size="xl">Calendar</Text>
        {/* <Group>
          <Button variant="outline" onClick={() => handleNavigate('TODAY')}>Today</Button>
          <Button variant="outline" onClick={() => handleNavigate('PREV')}>
            <IconChevronLeft size={14} />
          </Button>
          <Button variant="outline" onClick={() => handleNavigate('NEXT')}>
            <IconChevronRight size={14} />
          </Button>
        </Group> */}
      </Group>
      {/* <Group mb="md">
        <Button variant={view === Views.MONTH ? 'filled' : 'outline'} onClick={() => setView(Views.MONTH)}>Month</Button>
        <Button variant={view === Views.WEEK ? 'filled' : 'outline'} onClick={() => setView(Views.WEEK)}>Week</Button>
        <Button variant={view === Views.DAY ? 'filled' : 'outline'} onClick={() => setView(Views.DAY)}>Day</Button>
        <Button variant={view === Views.AGENDA ? 'filled' : 'outline'} onClick={() => setView(Views.AGENDA)}>Agenda</Button>
      </Group> */}
      <div className="h-[500px] sm:h-full">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          className="h-full"
        />
      </div>
    </Card>
  );
};

export const CalendarWithAvailability = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-screen">
      <div className="lg:col-span-8 h-[600px] lg:h-auto">
        <CalendarView />
      </div>
      <div className="lg:col-span-4 h-[600px] lg:h-auto overflow-y-auto">
        <AvailabilitySettings />
      </div>
    </div>
  );
};