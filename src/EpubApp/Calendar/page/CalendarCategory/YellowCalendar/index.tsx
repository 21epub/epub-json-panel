import React, { FC } from 'react';
import { Space } from 'antd';
import store from '../../../store';
import { Wrapper } from './Styled';

export interface YellowCalendarProps {}

const YellowCalendar: FC<YellowCalendarProps> = () => {
  const [state] = store.useRxjsStore();
  const { calendarDetail } = state;
  const { year, month, day, week, lunar_year, lunar_month, lunar_day, zodiac } =
    calendarDetail ?? {};

  return (
    <Wrapper>
      <span className='yellow_year'>{year}</span>
      <Space className='yellowDayWrapper' size={1}>
        <span className='yellow_month'>{month}</span>月
        <span className='yellow_day'>{day}</span>日
      </Space>
      <Space className='yellowLunarDayWrapper' direction='vertical'>
        农历
        <span className='yellow_lunar_month'>{lunar_month}</span>
        <span className='yellow_lunar_day'>{lunar_day}</span>
      </Space>
      <Space className='yellowZodiacWrapper' direction='vertical'>
        <span className='yellow_lunar_year'>{lunar_year}</span>年
        <span className='yellow_zodiac'>{zodiac}</span>年
      </Space>
      <span className='yellow_week'>{week}</span>
    </Wrapper>
  );
};

export default YellowCalendar;
