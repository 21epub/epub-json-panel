import React, { FC } from 'react';
import moment from 'moment';
import { DateFullCellWrapper } from './Styled';

export interface DateCellRenderProps {
  clockList: string[];
  noClockList: string[];
  momentValue: moment.Moment;
}

// 自定义渲染日期单元格
const DateCellRender: FC<DateCellRenderProps> = (props) => {
  const { momentValue, clockList, noClockList } = props;
  const today = moment().format('YYYY-MM-DD');
  const date = moment(momentValue).format('YYYY-MM-DD');
  const dateDay = moment(momentValue).format('DD');

  // 根据日期渲染不同的组件
  const SwitchComponent = (dateValue: string) => {
    if (dateValue === today) {
      // 今天的日期
      return <span id='calendarToday'>今日</span>;
    } else if (clockList.indexOf(date) !== -1) {
      // 签到的日期
      return <div className='clockDate' />;
    } else if (noClockList.indexOf(date) !== -1) {
      // 漏签的日期
      return <div className='noClockDate'>{dateDay}</div>;
    }
    return dateDay;
  };

  return (
    <DateFullCellWrapper className='dateFullCell'>
      {SwitchComponent(date)}
    </DateFullCellWrapper>
  );
};

export default DateCellRender;
