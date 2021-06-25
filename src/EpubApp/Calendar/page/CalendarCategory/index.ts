import { CalendarType } from '../../type';
import DateCalendar from './DateCalendar';
import NewYearCalendar from './NewYearCalendar';
import NoteCalendar from './NoteCalendar';
import RefreshingCalendar from './RefreshingCalendar';
import YellowOneCalendar from './YellowOneCalendar';
import YellowTwoCalendar from './YellowTwoCalendar';
import YellowThreeCalendar from './YellowThreeCalendar';
import YellowFourCalendar from './YellowFourCalendar';
import YellowFiveCalendar from './YellowFiveCalendar';

// 获取对应类型的投票应用
export const getCalendarComponent = (calendarType: CalendarType) => {
  // 投票应用列表
  const calendarMap = {
    DateCalendar,
    NewYearCalendar,
    NoteCalendar,
    RefreshingCalendar,
    YellowOneCalendar,
    YellowTwoCalendar,
    YellowThreeCalendar,
    YellowFourCalendar,
    YellowFiveCalendar
  };

  return Reflect.get(calendarMap, calendarType) ?? YellowOneCalendar;
};
