import React, { FC, useState, useEffect } from 'react';
import { Calendar as AntCalendar } from 'antd';
import { useUpdateEffect } from 'ahooks';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import HeaderRender from './HeaderRender';
import DateFullCellRender from './DateFullCellRender';
import { AntCalendarWrapper } from './Styled';
import store from '../../../../store';
import { isEmpty } from 'lodash';

export interface CalendarProps {
  isOpen: boolean;
  runQueryClockRecord: (start: string, end: string) => void;
}

// 日历组件
const Calendar: FC<CalendarProps> = (props) => {
  const { isOpen, runQueryClockRecord } = props;
  const [state] = store.useRxjsStore();
  const { clockRecord } = state;
  const [CTop, setCTop] = useState('');
  const [alreadyClock, setAlreadyClock] = useState<string[]>([]);
  const [omitClock, setOmitClock] = useState<string[]>([]);
  const [startDay, setStartDay] = useState<string>(
    moment().startOf('month').format('YYYY-MM-DD')
  );
  const [endDay, setEndDay] = useState<string>(
    moment().endOf('month').format('YYYY-MM-DD')
  );
  const today = moment().format('DD');
  const CalendarMonth: string[] = [];

  // 切换日历面板时
  const onPanelChange = (date: moment.Moment) => {
    const month = moment(date).format('YYYY-MM');
    setStartDay(moment(month).startOf('month').format('YYYY-MM-DD'));
    setEndDay(moment(month).endOf('month').format('YYYY-MM-DD'));
    setTimeout(() => {
      runQueryClockRecord(startDay, endDay);
    });
  };

  useEffect(() => {
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

  useUpdateEffect(() => {
    if (!isEmpty(clockRecord)) {
      setAlreadyClock(clockRecord?.[0]?.already_clock ?? []);
      setOmitClock(clockRecord?.[0]?.omit_clock ?? []);
    }
  }, [clockRecord]);

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
              alreadyClock={alreadyClock}
              omitClock={omitClock}
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
