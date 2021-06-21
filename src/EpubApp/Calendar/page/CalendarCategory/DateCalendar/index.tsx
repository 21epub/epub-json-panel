import React, { FC } from 'react';
import { Space } from 'antd';
import store from '../../../store';
import { Wrapper } from './Styled';

export interface DateCalendarProps {}

const DateCalendar: FC<DateCalendarProps> = () => {
  const [state] = store.useRxjsStore();
  const { calendarDetail } = state;
  const { year, month, day, week } = calendarDetail ?? {};

  return (
    <Wrapper>
      <Space size='middle'>
        <Space className='dateDayWrapper'>
          <span className='date_month'>{month}</span>/
          <span className='date_day'>{day}</span>
        </Space>
        <span className='date_year'>{year}</span>
        <span className='date_week'>{week}</span>
      </Space>
    </Wrapper>
  );
};

export default DateCalendar;
