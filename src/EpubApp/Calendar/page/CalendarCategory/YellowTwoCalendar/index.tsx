import React, { FC } from 'react';
import { Space } from 'antd';
import store from '../../../store';
import { Wrapper } from './Styled';

export interface YellowTwoCalendarProps {}

const YellowTwoCalendar: FC<YellowTwoCalendarProps> = () => {
  const [state] = store.useRxjsStore();
  const { calendarDetail } = state;
  const { year, month, day, week } = calendarDetail ?? {};

  return (
    <Wrapper>
      <span className='yellowTwo_year'>{year}</span>
      <Space className='yellowTwoDayWrapper'>
        <div className='yellowTwoMonthWrapper'>
          <div className='yellowTwo_month'>{month}</div>月
        </div>
        <span className='yellowTwo_day'>{day}</span>日
      </Space>
      <span className='yellowTwo_week'>{week}</span>
    </Wrapper>
  );
};

export default YellowTwoCalendar;
