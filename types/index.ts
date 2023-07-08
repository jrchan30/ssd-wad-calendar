import { MouseEventHandler } from 'react';

export interface Event {
  id: number;
  name: string;
  time: string;
  invitees: string[];
  color: string;
}

export interface CalendarDayProps {
  dateEvent: LocalStorageDate;
  setDateEvents: (events: LocalStorageReturn) => void;
  date: number;
  disabled?: boolean;
}

export interface CalendarDayModalProps {
  dateEvent: LocalStorageDate;
  date: number;
  setDateEvents: (events: LocalStorageReturn) => void;
  isOpen: boolean;
  toggleModal: (state: boolean) => void;
}

export interface LocalStorageDate {
  id: number;
  date: number;
  events: Event[];
}

export interface LocalStorageReturn {
  [key: number]: LocalStorageDate;
}

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: 'button' | 'submit';
  textStyles?: string;
  isDisabled?: boolean;
  rightIcon?: string;
}

export enum FormType {
  add,
  edit,
  view,
}

export interface IForm {
  name: string;
  time: string;
  invitees: string[];
}

export type EventPayload = Omit<Event, 'id' | 'color'>;

export interface CalendarFormProps {
  event?: Event;
  type: FormType;
  date: number;
  setDateEvents: (events: LocalStorageReturn) => void;
}
