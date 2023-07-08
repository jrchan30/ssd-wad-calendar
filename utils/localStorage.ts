import { EventPayload, LocalStorageReturn } from '@/types';
import { getRandomColor } from './date';

export const DATE_EVENTS = 'DATE_EVENTS';

const generateSimpleRandomID = () => {
  return Date.now() * Math.random();
};

const setEvents = (events: object) => {
  localStorage.setItem(DATE_EVENTS, JSON.stringify(events));
};

const getDateEvents = (): LocalStorageReturn => {
  if (typeof localStorage === 'undefined') return {};
  const dateEvents = localStorage.getItem(DATE_EVENTS);
  return JSON.parse(dateEvents ?? '{}');
};

const addEvent = (date: number, event: EventPayload) => {
  const currentDateEvents = getDateEvents();
  const formattedEvent = {
    ...event,
    id: generateSimpleRandomID(),
    color: getRandomColor(),
  };

  currentDateEvents[date] = {
    id: generateSimpleRandomID(),
    date: date,
    events: !currentDateEvents[date]
      ? [formattedEvent]
      : [...currentDateEvents[date].events, formattedEvent],
  };
  setEvents(currentDateEvents);
};

const deleteEvent = (date: number, eventId: number) => {
  const currentDateEvents = getDateEvents();

  currentDateEvents[date] = {
    id: generateSimpleRandomID(),
    date: date,
    events: currentDateEvents[date].events.filter(
      (event) => event.id !== eventId
    ),
  };
  setEvents(currentDateEvents);
};

const editEvent = (date: number, eventId: number, event: EventPayload) => {
  const currentDateEvents = getDateEvents();

  currentDateEvents[date] = {
    ...currentDateEvents[date],
    events: currentDateEvents[date].events.map((eventMap) => {
      if (eventMap.id === eventId) {
        return { ...eventMap, ...event };
      }
      return eventMap;
    }),
  };

  setEvents(currentDateEvents);
};

export { setEvents, getDateEvents, addEvent, deleteEvent, editEvent };
