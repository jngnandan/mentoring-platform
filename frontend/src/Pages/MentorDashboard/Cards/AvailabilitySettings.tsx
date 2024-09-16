import React, { useState, useEffect } from 'react';
import { Card, Text, Button, Switch, Select, TextInput, Group, Skeleton } from '@mantine/core';
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
    weekDays.reduce((acc, day) => ({
      ...acc,
      [day]: { enabled: true, times: [] } // Initialize with empty times
    }), {})
  );
  const [newDay, setNewDay] = useState('Everyday');
  const [newFromTime, setNewFromTime] = useState('10:00');
  const [newToTime, setNewToTime] = useState('12:00');

  const toggleDay = (day) => {
    setAvailabilities(prev => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled }
    }));
  };

  const removeTime = (day, timeRange) => {
    setAvailabilities(prev => ({
      ...prev,
      [day]: { ...prev[day], times: prev[day].times.filter(t => t !== timeRange) }
    }));
  };

  const addTime = () => {
    const timeRange = `${newFromTime} - ${newToTime}`;
    if (newDay === 'Everyday') {
      setAvailabilities(prev => {
        const updated = {};
        Object.keys(prev).forEach(day => {
          updated[day] = {
            ...prev[day],
            times: [...new Set([...prev[day].times, timeRange])].sort()
          };
        });
        return updated;
      });
    } else {
      setAvailabilities(prev => ({
        ...prev,
        [newDay]: {
          ...prev[newDay],
          times: [...new Set([...prev[newDay].times, timeRange])].sort()
        }
      }));
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="h-full mt-14">
      <Text weight={500} size="lg" mb="md">Posting Times</Text>
      {weekDays.map(day => (
        <Group key={day} position="apart" mb="xs" className="flex-wrap">
          <Text className="w-full sm:w-auto">{day}</Text>
          <Switch checked={availabilities[day].enabled} onChange={() => toggleDay(day)} />
          <Group spacing="xs" className="w-full sm:w-auto mt-2 sm:mt-0">
            {availabilities[day].times.map((timeRange, index) => (
              <Button key={index} variant="light" size="xs" onClick={() => removeTime(day, timeRange)}>
                {timeRange} ✕
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
        <TextInput
          value={newFromTime}
          onChange={(event) => setNewFromTime(event.currentTarget.value)}
          placeholder="From (HH:MM)"
        />
        <TextInput
          value={newToTime}
          onChange={(event) => setNewToTime(event.currentTarget.value)}
          placeholder="To (HH:MM)"
        />
      </Group>
      <Group position="right" mt="md" className="flex-col sm:flex-row">
        <Button onClick={addTime} fullWidth mt="sm">Add</Button>
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
    <Card shadow="sm" p="lg" radius="md" withBorder className="h-full" mt={56}>
      <Group position="apart" mb="md">
        <Text weight={500} size="xl">Calendar</Text>
      </Group>
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

const LoadingPlaceholder = () => (
  <Card shadow="sm" p="lg" radius="md" withBorder className="h-full" mt={56}>
    <Skeleton height={30} width="50%" mb="xl" />
    <Skeleton height={400} mb="xl" />
    <Group position="apart" mb="md">
      <Skeleton height={36} width={100} />
      <Skeleton height={36} width={100} />
      <Skeleton height={36} width={100} />
    </Group>
  </Card>
);

export const CalendarWithAvailability = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-screen">
        <div className="lg:col-span-8 h-[600px] lg:h-auto">
          <LoadingPlaceholder />
        </div>
        <div className="lg:col-span-4 h-[600px] lg:h-auto overflow-y-auto">
          <LoadingPlaceholder />
        </div>
      </div>
    );
  }

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