import React, { FC } from 'react';
import { Space } from 'antd';
import store from '../../../store';
import { Wrapper } from './Styled';

export interface NewYearCalendarProps {}

const NewYearCalendar: FC<NewYearCalendarProps> = () => {
  const [state] = store.useRxjsStore();
  const { calendarDetail } = state;
  const { year, month, day, lunar_year, lunar_day, zodiac } =
    calendarDetail ?? {};

  return (
    <Wrapper>
      <span className='newYear_year'>{year}</span>
      <span className='newYear_lunar_day'>{lunar_day}</span>
      <Space className='newYearDayWrapper' direction='horizontal' size={1}>
        <span className='newYear_month'>{month}</span>/
        <span className='newYear_day'>{day}</span>
      </Space>
      <Space className='newYearZodiacWrapper' direction='horizontal' size={1}>
        <span className='newYear_lunar_year'>{lunar_year}</span>年【
        <span className='newYear_zodiac'>{zodiac}</span>年】
      </Space>
    </Wrapper>
  );
};

export default NewYearCalendar;
