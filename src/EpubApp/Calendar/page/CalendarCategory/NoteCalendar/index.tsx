import React, { FC } from 'react';
import { Space } from 'antd';
import { getDaysSuffix } from '../../../util';
import store from '../../../store';
import { Wrapper } from './Styled';

export interface NoteCalendarProps {}

const NoteCalendar: FC<NoteCalendarProps> = () => {
  const [state] = store.useRxjsStore();
  const { calendarDetail } = state;
  const { year, month, day, week, lunar_month, lunar_day, en_month } =
    calendarDetail ?? {};
  const daysSuffix = getDaysSuffix(day);

  return (
    <Wrapper>
      <Space className='NoteDateWrapper' size={1}>
        <span className='Note_year'>{year}</span>年
        <span className='Note_month'>{month}</span>月
        <span className='Note_day'>{day}</span>日
      </Space>
      <Space className='NoteDayWrapper' align='end'>
        <span className='Note_en_month'>{en_month}</span>
        <span className='Note_day'>{day}</span>
        {daysSuffix}
      </Space>
      <Space className='NoteLunarDayWeekWrapper' direction='vertical'>
        <Space className='NoteLunarDayWrapper' size={1}>
          <span className='Note_lunar_month'>农历{lunar_month}</span>
          <span className='Note_lunar_day'>{lunar_day}</span>
        </Space>
        <span className='Note_week'>{week}</span>
      </Space>
    </Wrapper>
  );
};

export default NoteCalendar;
