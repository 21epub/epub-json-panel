import React, { FC, useState, useEffect } from 'react';
import { Space } from 'antd';
import { useToggle, useRequest, useUpdateEffect } from 'ahooks';
import {
  ClockNowButton,
  ClockRankingButton,
  ClockRecord,
  ParticipateNumber
} from '../../../components';
import { queryClockRecordDetail } from '../../../data/api';
import Calendar from './Calendar';
import store from '../../../store';
import { Wrapper, CalendarWrapper } from './Styled';

export interface CalendarClockProps {}

// 日历签到
const CalendarClock: FC<CalendarClockProps> = () => {
  const [state] = store.useRxjsStore();
  const { clockDetail, clockApiProps, clockEvent, clockRecord } = state;
  const [CWHeight, setCWHeight] = useState('');
  // 控制面板展开或收缩，true为展开，false为收缩
  const [isOpen, { toggle }] = useToggle(
    clockDetail ? clockDetail.open_calendar : true
  );
  const people = clockDetail?.participants ?? 0;
  const add_people = clockDetail?.add_participants ?? 0;
  const participants = people + add_people;
  const slug = clockApiProps?.slug ?? '';

  // 查询签到记录接口
  const {
    data: clockRecordData,
    loading,
    run: runQueryClockRecord
  } = useRequest(
    (start?: string, end?: string) => queryClockRecordDetail(slug, start, end),
    {
      ready: !!clockApiProps?.slug && !!clockEvent,
      throwOnError: true
    }
  );

  // 日历抽屉变化
  const onDrawerChange = () => {
    if (isOpen) {
      setCWHeight('6%');
    } else {
      setCWHeight('42%');
    }
    toggle();
  };

  // 设置初始面板是收起还是展开
  useEffect(() => {
    if (!isOpen) {
      setCWHeight('6%');
    } else {
      setCWHeight('42%');
    }
  }, []);

  useUpdateEffect(() => {
    if (!loading && clockRecordData) {
      store.reducers.setClockRecord(clockRecordData);
    }
  }, [loading, clockRecordData]);

  return (
    <Wrapper>
      <ClockRecord
        totalNum={clockRecord?.[0]?.total_clock_num_each_one ?? 0}
        continuousNum={clockRecord?.[0]?.keep_clock_num_each_one ?? 0}
      />
      <CalendarWrapper className='calendarWrapper' height={CWHeight}>
        <div className='drawerButton' onClick={onDrawerChange} />
        <Calendar isOpen={isOpen} runQueryClockRecord={runQueryClockRecord} />
      </CalendarWrapper>
      <div className='BorderDrawer' />
      <Space size='large'>
        <ClockNowButton />
        <ClockRankingButton />
      </Space>
      {clockDetail?.show_participants && (
        <ParticipateNumber number={participants} />
      )}
    </Wrapper>
  );
};

export default CalendarClock;
