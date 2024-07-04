import {Platform} from 'react-native';
import { rMS } from '../styles/responsive';

export const themeColor = '#00AAAF';
export const lightThemeColor = '#f2f7f7';

export function getTheme() {
  const disabledColor = 'grey';

  return {
    // arrows
    // arrowColor: 'black',
    // arrowStyle: {padding: 0},
    // // knob
    // expandableKnobColor: '#9B9B9B',
    // // month
    // monthTextColor: 'black',
    // textMonthFontSize: rMS(18 , 2),
    // textMonthFontFamily: 'HelveticaNeue',
    // textMonthFontWeight: 'bold' as const,
    // // day names
    // textSectionTitleColor: 'black',
    // textDayHeaderFontSize: rMS(18 , 2),
    // textDayHeaderFontFamily: 'HelveticaNeue',
    // textDayHeaderFontWeight: 'normal' as const,
    // // dates
    // dayTextColor: 'black',
    todayTextColor: 'red',
    // textDayFontSize: rMS(18 , 2),
    // textDayFontFamily: 'HelveticaNeue',
    // textDayFontWeight: '500' as const,
    // textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
    // // selected date
    selectedDayBackgroundColor: 'red',
    // selectedDayTextColor: 'white',
    // // disabled date
    // textDisabledColor: disabledColor,
    // // dot (marked date)
    // dotColor: '#fff',
    // selectedDotColor: 'white',
    // disabledDotColor: disabledColor,
    // dotStyle: {marginTop: -2}
  };
}
