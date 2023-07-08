'use client';

import { CalendarFormProps, FormType, IForm } from '@/types';
import { ChangeEvent, useState } from 'react';
import { CustomButton, IconTrash } from './';
import { addEvent, editEvent, getDateEvents } from '@/utils/localStorage';

const CalendarForm = ({
  event,
  type,
  date,
  setDateEvents,
}: CalendarFormProps) => {
  const BASE_FORM = {
    name: '',
    time: '',
    invitees: [],
  };
  const getDefaultFormValues = () => {
    if (type === FormType.edit && event) {
      return { ...event };
    }
    return { ...BASE_FORM };
  };

  const [form, setForm] = useState<IForm>(getDefaultFormValues());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === FormType.add) {
      addEvent(date, form);
    } else if (type === FormType.edit && event) {
      editEvent(date, event.id, form);
    }
    setDateEvents(getDateEvents());
  };

  const [invitee, setInvitee] = useState('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>();

  const handleAdd = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(invitee)) {
      setIsValidEmail(false);
      return;
    }
    setForm({
      ...form,
      invitees: [...form.invitees, invitee],
    });
    setInvitee('');
    setIsValidEmail(true);
  };

  const removeInvitee = (index: number) => {
    const newInvitees = form.invitees.filter((_, i) => {
      return i !== index;
    });
    setForm({
      ...form,
      invitees: newInvitees,
    });
  };

  const renderTitle = () => {
    switch (type) {
      case FormType.edit:
        return 'Edit';
      case FormType.add:
        return 'Add';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-xl font-bold text-center">{renderTitle()} Event</div>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block  text-sm font-bold text-gray-900"
        >
          Name
        </label>
        <input
          type="name"
          id="name"
          name="name"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 focus:ring-2 outline-none block w-full p-2.5 invalid:ring-red-500"
          placeholder="John's Birthday"
          required
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block  text-sm font-bold text-gray-900"
        >
          Time
        </label>
        <input
          type="time"
          id="time"
          name="time"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 focus:ring-2 outline-none block w-full p-2.5"
          required
          value={form.time}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-bold text-gray-900">
          Invitees
        </label>
        <div className="flex">
          <input
            type="email"
            id="invitees"
            name="invitees"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-sky-500 focus:border-sky-500 focus:ring-2 outline-none block w-full p-2.5"
            placeholder="johndoe@gmail.com"
            required={form.invitees.length === 0}
            value={invitee}
            onChange={(e) => setInvitee(e.target.value)}
          />
          <CustomButton
            btnType="button"
            title="Add"
            containerStyles="btn-primary !rounded-l-none"
            handleClick={handleAdd}
          />
        </div>
        {isValidEmail === false && (
          <div className="text-amber-300">Field should be in email format</div>
        )}
        <div className="divide-y-2 space-y-2 mt-2">
          {form.invitees.map((invitee, i) => {
            return (
              <div key={invitee} className="flex justify-between stroke-">
                <div>{invitee}</div>
                <button
                  type="button"
                  className="hover:scale-110 transition"
                  onClick={() => removeInvitee(i)}
                >
                  <IconTrash svgClass="w-6 h-6 !stroke-current !stroke-red-400" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <CustomButton
        btnType="submit"
        containerStyles="btn-primary w-full"
        title="Submit"
      />
    </form>
  );
};

export default CalendarForm;
