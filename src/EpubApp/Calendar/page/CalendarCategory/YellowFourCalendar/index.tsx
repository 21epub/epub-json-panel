import React, { FC } from 'react';
import store from '../../../store';
import { Wrapper } from './Styled';

export interface YellowFourCalendarProps {}

const YellowFourCalendar: FC<YellowFourCalendarProps> = () => {
  const [state] = store.useRxjsStore();
  const { calendarDetail } = state;
  const { month, day, week, lunar_month, lunar_day } = calendarDetail ?? {};

  return (
    <Wrapper>
      <span className='yellowFour_month'>{month}月</span>
      <span className='yellowFour_day'>{day}</span>
      <span className='yellowFour_week'>{week}</span>
      <div className='yellowFourLunarDayWrapper'>
        <span className='yellowFour_lunar_month'>农历{lunar_month}</span>
        <span className='yellowFour_lunar_day'>{lunar_day}</span>
      </div>
    </Wrapper>
  );
};

export default YellowFourCalendar;
