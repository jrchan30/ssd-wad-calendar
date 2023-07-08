'use client';

import { lastDay, calendarDays, firstDayWeek } from '@/utils/date';
import '@/styles/calendar.css';
import CalendarDay from './CalendarDay';
import { getDateEvents, setEvents } from '@/utils/localStorage';
import { useEffect, useState } from 'react';
import { LocalStorageReturn } from '@/types';

const Calendar = () => {
  const [dateEvents, setDateEvents] = useState<LocalStorageReturn>();

  useEffect(() => {
    setDateEvents(getDateEvents());
  }, []);

  const renderDaysHeading = () => {
    return calendarDays.map((day) => (
      <div key={day} className="calendar__heading">
        {day}
      </div>
    ));
  };

  const renderCalendarDay = () => {
    if (!dateEvents) {
      // Generate placeholder of n days
      return Array.from(Array(Number(lastDay.getDate())).keys()).map((date) => (
        <div key={`${date}-temp`} className="calendar-day__placeholder" />
      ));
    }

    return [...Array(Number(lastDay.getDate()))].map((_, i) => (
      <CalendarDay
        dateEvent={dateEvents[i + 1]}
        setDateEvents={setDateEvents}
        key={`${i}-real`}
        date={i + 1}
      />
    ));
  };

  const renderPreviousMonth = () =>
    [...Array(firstDayWeek)].map((_, i) => (
      <div key={`${i}-prev`} className="border bg-sky-50"></div>
    ));

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="calendar__container-grid border">
        {renderDaysHeading()}
      </div>
      <div className="calendar__container-grid">
        {renderPreviousMonth()}
        {renderCalendarDay()}
      </div>
    </div>
  );
};

export default Calendar;
