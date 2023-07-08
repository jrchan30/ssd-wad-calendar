'use client';

import { Fragment, useState } from 'react';
import Image from 'next/image';

import { Transition, Dialog, Disclosure } from '@headlessui/react';

import { CalendarForm, CustomButton, IconChevron, IconTrash } from './';
import { CalendarDayModalProps, FormType, Event } from '@/types';

import { date as todayDate, getDatePostFix, monthMM } from '@/utils/date';
import { deleteEvent, getDateEvents } from '@/utils/localStorage';

const CalendarDayModal = ({
  dateEvent,
  setDateEvents,
  date,
  isOpen,
  toggleModal,
}: CalendarDayModalProps) => {
  const [showForm, setShowForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event>();
  const [currentType, setCurrentType] = useState<FormType>(FormType.view);
  const toggleForm = (state: boolean, type: FormType, event?: Event) => {
    if (type === FormType.edit) {
      setCurrentEvent(event);
    } else {
      setCurrentEvent(undefined);
    }
    setShowForm(state);
    setCurrentType(type);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          toggleForm(false, FormType.view);
          toggleModal(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="font-bold text-gray-900">
                  <div className="relative">
                    {showForm && (
                      <button
                        className="group absolute top-0"
                        onClick={() => toggleForm(false, FormType.view)}
                      >
                        <IconChevron svgClass="fill-current text-gray-300 w-8 -rotate-90 group-hover:text-gray-900 transition" />
                      </button>
                    )}
                    <div className="flex-1">
                      <p className="flex justify-center text-4xl mb-10 gap-x-1">
                        <span className="text-lg self-end">{monthMM}</span>
                        {date}
                        <span className="text-lg self-start">
                          {getDatePostFix(date)}
                        </span>
                      </p>
                    </div>
                  </div>
                </Dialog.Title>
                {(!dateEvent || dateEvent?.events.length < 3) && !showForm && (
                  <div className="mb-3">
                    <CustomButton
                      title="Add Event"
                      containerStyles="btn-primary"
                      rightIcon="/add-plus.svg"
                      handleClick={() => toggleForm(true, FormType.add)}
                    />
                    {date < todayDate.getDate() && (
                      <p className="text-yellow-700">
                        *You are adding event(s) on a past date
                      </p>
                    )}
                    {(!dateEvent || dateEvent?.events?.length === 0) && (
                      <p className="text-center mt-4">
                        You have no events on this day, click the button above
                        to start adding event(s)
                      </p>
                    )}
                  </div>
                )}
                {!showForm ? (
                  <>
                    <div className="flex flex-col gap-y-3">
                      {dateEvent?.events.map((event) => {
                        return (
                          <div key={event.id}>
                            <Disclosure>
                              {({ open }) => (
                                <>
                                  <div className="flex items-center w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-bold text-black  hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
                                    <div className="flex gap-x-2">
                                      <div>{event.name}</div>
                                      <button
                                        className="hover:scale-110 transform"
                                        onClick={() =>
                                          toggleForm(true, FormType.edit, event)
                                        }
                                      >
                                        <Image
                                          src="/edit.svg"
                                          alt="edit icon"
                                          width={20}
                                          height={20}
                                        />
                                      </button>
                                      <button
                                        className="hover:scale-110 transform"
                                        onClick={() => {
                                          deleteEvent(date, event.id);
                                          setDateEvents(getDateEvents());
                                        }}
                                      >
                                        <IconTrash svgClass="w-5 h-5 stroke-current stroke-red-400" />
                                      </button>
                                    </div>
                                    <div className="flex gap-x-2 items-center">
                                      <div>{event.time}</div>
                                      <Disclosure.Button>
                                        <Image
                                          src="/chevron.svg"
                                          alt="chevron icon"
                                          width={10}
                                          height={10}
                                          className={`${
                                            !open ? 'rotate-180 transform' : ''
                                          } h-6 w-6 text-sky-500 fill-white hover:bg-slate-100 rounded-full transition-colors`}
                                        />
                                      </Disclosure.Button>
                                    </div>
                                  </div>
                                  <Transition
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-100"
                                    leaveFrom="h-full"
                                    leaveTo="h-0"
                                  >
                                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 bg-slate-50">
                                      Invitees: {event.invitees.join(', ')}
                                    </Disclosure.Panel>
                                  </Transition>
                                </>
                              )}
                            </Disclosure>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 flex w-full justify-end">
                      <CustomButton
                        title="Got it, thanks"
                        containerStyles="btn-primary"
                        handleClick={() => {
                          toggleForm(false, FormType.view);
                          toggleModal(false);
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <CalendarForm
                      event={currentEvent}
                      setDateEvents={setDateEvents}
                      date={date}
                      type={currentType}
                    />
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CalendarDayModal;
