'use client';
import { useState } from 'react';

import { CalendarDayProps } from '@/types';
import { convertTo12Hour, date as currentDate } from '@/utils/date';
import CalendarDayModal from './CalendarDayModal';

const CalendarDay = ({
  dateEvent,
  setDateEvents,
  date,
  disabled = false,
}: CalendarDayProps) => {
  const isActive = Number(currentDate.getDate()) === date;

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (state: boolean) => {
    setIsOpen(state);
  };

  const handleClick = (e: React.MouseEvent) => {
    toggleModal(true);
  };

  return (
    <>
      <button
        className={`calendar-day__container group ${
          disabled ? 'bg-slate-300' : 'hover:bg-slate-100'
        }`}
        onClick={handleClick}
      >
        <div
          className={`calendar-day__date ${
            isActive && 'calendar-day__current-date'
          }`}
        >
          <div className="text-sm">{date}</div>
        </div>
        {dateEvent?.events && (
          <div className="flex flex-col w-full gap-y-1">
            {dateEvent.events.map((event) => (
              <div
                key={event.id}
                className="flex w-full justify-between rounded px-1 text-xs"
                style={{ backgroundColor: event.color }}
              >
                <div className="truncate">{event.name}</div>
                <div>{convertTo12Hour(event.time)}</div>
              </div>
            ))}
          </div>
        )}
      </button>
      <CalendarDayModal
        dateEvent={dateEvent}
        setDateEvents={setDateEvents}
        date={date}
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
    </>
  );
};

export default CalendarDay;
