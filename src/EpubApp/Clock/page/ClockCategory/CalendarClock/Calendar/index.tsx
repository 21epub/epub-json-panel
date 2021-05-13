import React, { FC, useState } from 'react';
import { Calendar as AntCalendar } from 'antd';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import { useUpdateEffect } from 'ahooks';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import HeaderRender from './HeaderRender';
import DateFullCellRender from './DateFullCellRender';
import { AntCalendarWrapper } from './Styled';

export interface CalendarProps {
  isOpen: boolean;
}

// 日历组件
const Calendar: FC<CalendarProps> = (props) => {
  const { isOpen } = props;
  const [CTop, setCTop] = useState('');
  const today = moment().format('DD');
  const CalendarMonth: string[] = [];

  const clockList = [
    '2021-05-01',
    '2021-05-02',
    '2021-05-03',
    '2021-05-05',
    '2021-05-06',
    '2021-05-07',
    '2021-05-09',
    '2021-05-12',
    '2021-05-13',
    '2021-05-14',
    '2021-05-17',
    '2021-05-18',
    '2021-05-21'
  ];
  const noClockList = [
    '2021-05-05',
    '2021-05-08',
    '2021-05-10',
    '2021-05-11',
    '2021-05-15',
    '2021-05-16',
    '2021-05-19',
    '2021-05-20'
  ];

  const onPanelChange = (date: moment.Moment, mode: CalendarMode) => {
    console.log(date, mode);
  };

  useUpdateEffect(() => {
    if (isOpen) {
      setCTop('0px');
    } else {
      // 计算‘今日’元素的top定位
      // number + 1 表示每月1号是周几
      const number = CalendarMonth.findIndex((day) => day === '01');
      const top =
        '-' + (70 + Math.floor((number + Number(today) - 1) / 7) * 40) + 'px';
      setCTop(top);
    }
  }, [isOpen]);

  return (
    <AntCalendarWrapper className='AntCalendar' top={CTop}>
      <div className='borderTop' />
      <AntCalendar
        locale={locale}
        mode='month'
        fullscreen={false}
        headerRender={(headerProps) => (
          <HeaderRender {...headerProps} title='签到日历' />
        )}
        dateFullCellRender={(value) => {
          CalendarMonth.push(moment(value).format('DD'));
          return (
            <DateFullCellRender
              clockList={clockList}
              noClockList={noClockList}
              momentValue={value}
            />
          );
        }}
        onPanelChange={onPanelChange}
      />
    </AntCalendarWrapper>
  );
};

export default Calendar;
