import React, { FC } from 'react';
import moment from 'moment';
import { Typography } from 'antd';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import { HeaderWrapper } from './Styled';

export interface HeaderRenderProps {
  title: string;
  value: moment.Moment;
  type: CalendarMode;
  onChange: (date: moment.Moment) => void;
  onTypeChange: (type: CalendarMode) => void;
}

// 日历头部内容
const HeaderRender: FC<HeaderRenderProps> = (props) => {
  const { title, value } = props;
  const nowMonth: string = moment(value).format('YYYY年MM月');

  return (
    <HeaderWrapper>
      <Typography.Title level={4}>
        {title} {nowMonth}
      </Typography.Title>
    </HeaderWrapper>
  );
};

export default HeaderRender;
