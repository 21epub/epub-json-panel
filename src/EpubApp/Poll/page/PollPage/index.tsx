import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import PollPage from './PollPage';
import type { PollPageProps } from './PollPage';
import { GlobalStyle } from './Styled';

// 投票页面渲染
export const PollPageRender: FC<PollPageProps> = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <GlobalStyle />
      <PollPage {...props} />
    </ConfigProvider>
  );
};
