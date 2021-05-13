import React, { FC, useState } from 'react';
import { Space } from 'antd';
import { useToggle } from 'ahooks';
import {
  ClockNowButton,
  ClockRankingButton,
  ClockRecord,
  ParticipateNumber
} from '../../../components';
import Calendar from './Calendar';
import { Wrapper, CalendarWrapper } from './Styled';

export interface CalendarClockProps {}

// 日历签到
const CalendarClock: FC<CalendarClockProps> = (props) => {
  const [CWHeight, setCWHeight] = useState('');
  // 控制面板展开或收缩，true为展开，false为收缩
  const [isOpen, { toggle }] = useToggle(true);

  // 日历抽屉变化
  const onDrawerChange = () => {
    if (isOpen) {
      setCWHeight('6%');
    } else {
      setCWHeight('42%');
    }
    toggle();
  };

  return (
    <Wrapper>
      <ClockRecord totalNum={12} continuousNum={3} />
      <CalendarWrapper className='calendarWrapper' height={CWHeight}>
        <div className='drawerButton' onClick={onDrawerChange} />
        <Calendar isOpen={isOpen} />
        <div className='BorderDrawer' />
      </CalendarWrapper>
      <Space size='large'>
        <ClockNowButton />
        <ClockRankingButton />
      </Space>
      <ParticipateNumber number={999} />
    </Wrapper>
  );
};

export default CalendarClock;
