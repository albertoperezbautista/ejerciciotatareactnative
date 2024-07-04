import {TimelineEventProps, CalendarUtils} from 'react-native-calendars';
import { color } from 'react-native-elements/dist/helpers';

const EVENT_COLOR = '#e6add8';
const today = new Date();
export const getDate = (offset = 0) => CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

export const timelineEvents: any[] = [
  {
    id : 1,
    start: `${getDate(-1)} 09:20:00`,
    end: `${getDate(-1)} 10:00:00`,
    title: 'Merge Request ',
    summary: 'Merge Timeline Calendar to React Native Calendars',
    color : EVENT_COLOR
  },
  
  {
    id : 2,
    start: `${getDate()} 08:30:00`,
    end: `${getDate()} 09:30:00`,
    title: 'Balarezo',
    summary: 'Descripcion de la visita',
  },
  {
    id : 3,
    start: `${getDate()} 10:45:00`,
    end: `${getDate()} 11:45:00`,
    title: 'Meeting C',
    summary: 'Summary for meeting C',
  },
  {
    id : 4,
    start: `${getDate()} 12:30:00`,
    end: `${getDate()} 13:30:00`,
    title: 'Meeting D',
    summary: 'Summary for meeting B',
  },
  {
    id : 5,
    start: `${getDate()} 14:45:00`,
    end: `${getDate()} 15:45:00`,
    title: 'Meeting E',
    summary: 'Summary for meeting C',
  },
 
];
