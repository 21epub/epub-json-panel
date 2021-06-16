import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import ClockPage from './ClockPage';
import type { ClockPageProps } from './ClockPage';
import { GlobalStyle } from './Styled';

// 抽奖页面渲染
export const ClockPageRender: FC<ClockPageProps> = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <GlobalStyle />
      <ClockPage {...props} />
    </ConfigProvider>
  );
};
