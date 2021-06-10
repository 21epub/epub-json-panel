import CalendarClock from './CalendarClock';
import type { ClockType } from '../../type';

// 获取对应类型的签到应用
export const getClockComponent = (clockType: ClockType) => {
  // 抽奖应用列表
  const clockMap = {
    CalendarClock
  };

  return Reflect.get(clockMap, clockType) ?? CalendarClock;
};
