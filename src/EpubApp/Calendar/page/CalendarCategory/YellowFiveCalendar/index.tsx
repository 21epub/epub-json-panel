import React, { FC } from 'react';
import store from '../../../store';
import { Wrapper } from './Styled';

export interface YellowFiveCalendarProps {}

const YellowFiveCalendar: FC<YellowFiveCalendarProps> = () => {
  const [state] = store.useRxjsStore();
  const { calendarDetail } = state;
  const { month, day, week } = calendarDetail ?? {};

  return (
    <Wrapper>
      <span className='yellowFive_month'>{month}月</span>
      <span className='yellowFive_day'>{day}</span>
      <span className='yellowFive_week'>{week}</span>
    </Wrapper>
  );
};

export default YellowFiveCalendar;
