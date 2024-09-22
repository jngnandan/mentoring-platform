import React, { useState, useEffect } from 'react';
import { Card, Text, Button, Switch, Select, TextInput, Group, Skeleton } from '@mantine/core';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

const AvailabilitySettings = ({ onAvailabilityChange, userId }) => {
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

  const saveAvailability = async () => {
    try {
      const availabilityData = JSON.stringify(availabilities);
      const { error } = await supabase
        .from('profiles')
        .update({ availability: availabilityData }) // Ensure your column is named 'availability'
        .match({ id: userId }); // Assuming 'id' is the unique identifier for the profile

      if (error) throw error;

      // Optionally notify the user of a successful save
      console.log("Availability saved successfully!");
    } catch (error) {
      console.error("Error saving availability:", error);
    }
  };

  useEffect(() => {
    onAvailabilityChange(availabilities);
  }, [availabilities]);

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
        <Button color="green" fullWidth onClick={saveAvailability}>Save</Button> {/* Save button */}
      </Group>
    </Card>
  );
};

const CalendarView = ({ events }) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);

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
  const [events, setEvents] = useState([]);
  const userId = "YOUR_USER_ID"; // Replace this with the actual user ID

  const handleAvailabilityChange = (availabilities) => {
    const newEvents = [];

    for (const day of weekDays) {
      if (availabilities[day].enabled) {
        availabilities[day].times.forEach(timeRange => {
          const start = new Date();
          const end = new Date();
          const [startTime, endTime] = timeRange.split(' - ');

          const today = new Date();
          const dayIndex = weekDays.indexOf(day);
          const daysToAdd = (dayIndex - today.getDay() + 7) % 7;

          start.setDate(today.getDate() + daysToAdd);
          end.setDate(today.getDate() + daysToAdd);

          start.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]), 0);
          end.setHours(parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1]), 0);

          newEvents.push({
            title: `${day} Availability`,
            start,
            end,
          });
        });
      }
    }

    setEvents(newEvents);
  };

  useEffect(() => {
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
        <CalendarView events={events} />
      </div>
      <div className="lg:col-span-4 h-[600px] lg:h-auto overflow-y-auto">
        <AvailabilitySettings onAvailabilityChange={handleAvailabilityChange} userId={userId} /> {/* Pass userId to AvailabilitySettings */}
      </div>
    </div>
  );
};
