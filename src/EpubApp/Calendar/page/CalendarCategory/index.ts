import { CalendarType } from '../../type';
import DateCalendar from './DateCalendar';
import NewYearCalendar from './NewYearCalendar';
import YellowCalendar from './YellowCalendar';

// 获取对应类型的投票应用
export const getCalendarComponent = (calendarType: CalendarType) => {
  // 投票应用列表
  const calendarMap = {
    DateCalendar,
    NewYearCalendar,
    YellowCalendar
  };

  return Reflect.get(calendarMap, calendarType) ?? YellowCalendar;
};
