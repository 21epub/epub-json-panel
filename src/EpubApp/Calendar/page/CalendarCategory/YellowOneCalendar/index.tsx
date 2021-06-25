import React, { FC } from 'react';
import { Space } from 'antd';
import store from '../../../store';
import { Wrapper } from './Styled';

export interface YellowOneCalendarProps {}

const YellowOneCalendar: FC<YellowOneCalendarProps> = () => {
  const [state] = store.useRxjsStore();
  const { calendarDetail } = state;
  const { year, month, day, week, lunar_year, lunar_month, lunar_day, zodiac } =
    calendarDetail ?? {};

  return (
    <Wrapper>
      <span className='yellowOne_year'>{year}</span>
      <Space className='yellowOneDayWrapper' size={1}>
        <span className='yellowOne_month'>{month}</span>月
        <span className='yellowOne_day'>{day}</span>日
      </Space>
      <Space className='yellowOneLunarDayWrapper' direction='vertical'>
        农历
        <span className='yellowOne_lunar_month'>{lunar_month}</span>
        <span className='yellowOne_lunar_day'>{lunar_day}</span>
      </Space>
      <Space className='yellowOneZodiacWrapper' direction='vertical'>
        <span className='yellowOne_lunar_year'>{lunar_year}</span>年
        <span className='yellowOne_zodiac'>{zodiac}</span>年
      </Space>
      <span className='yellowOne_week'>{week}</span>
    </Wrapper>
  );
};

export default YellowOneCalendar;
