import React, { FC } from 'react';
import { Space } from 'antd';
import store from '../../../store';
import { Wrapper } from './Styled';

export interface YellowThreeCalendarProps {}

const YellowThreeCalendar: FC<YellowThreeCalendarProps> = () => {
  const [state] = store.useRxjsStore();
  const { calendarDetail } = state;
  const { month, day, week, lunar_month, lunar_day, en_month, en_week } =
    calendarDetail ?? {};

  return (
    <Wrapper>
      <Space
        className='yellowThreeMonthWeekWrapper'
        size={1}
        direction='vertical'
      >
        <Space size='small'>
          <span className='yellowThree_month'>{month}</span>月
        </Space>
        <span className='yellowThree_en_month'>{en_month}</span>
      </Space>
      <Space className='yellowThreeDateWrapper' direction='vertical'>
        <span className='yellowThree_day'>{day}</span>
        <div className='yellowThreeLunarDayWrapper'>
          <span className='yellowThree_lunar_month'>农历{lunar_month}</span>
          <span className='yellowThree_lunar_day'>{lunar_day}</span>
        </div>
      </Space>
      <Space
        className='yellowThreeMonthWeekWrapper'
        size={1}
        direction='vertical'
      >
        <span className='yellowThree_week'>{week}</span>
        <span className='yellowThree_en_week'>{en_week}</span>
      </Space>
    </Wrapper>
  );
};

export default YellowThreeCalendar;
