import React, { FC } from 'react';
import { Space } from 'antd';
import store from '../../../store';
import { Wrapper } from './Styled';

export interface RefreshingCalendarProps {}

const RefreshingCalendar: FC<RefreshingCalendarProps> = () => {
  const [state] = store.useRxjsStore();
  const { calendarDetail } = state;
  const {
    year,
    month,
    day,
    week,
    lunar_year,
    lunar_month,
    lunar_day,
    en_week
  } = calendarDetail ?? {};

  return (
    <Wrapper>
      <span className='refreshing_year'>{year}</span>
      <Space className='refreshingDayWrapper' size={1}>
        <span className='refreshing_month'>{month}</span>月
        <span className='refreshing_day'>{day}</span>日
      </Space>
      <Space
        className='refreshingLunarDateWrapper'
        direction='horizontal'
        size={1}
      >
        <span className='refreshing_lunar_year'>{lunar_year}</span>年
        <span className='refreshing_lunar_month'>{lunar_month}</span>
      </Space>
      <span className='refreshing_lunar_day'>{lunar_day}</span>
      <span className='refreshing_en_week'>{en_week}</span>
      <span className='refreshing_week'>{week}</span>
    </Wrapper>
  );
};

export default RefreshingCalendar;
