import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import CalendarPage from './CalendarPage';
import type { CalendarPageProps } from './CalendarPage';
import { GlobalStyle } from './Styled';

// 投票页面渲染
export const CalendarPageRender: FC<CalendarPageProps> = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <GlobalStyle />
      <CalendarPage {...props} />
    </ConfigProvider>
  );
};
