import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import LotteryPage from './LotteryPage';
import type { LotteryPageProps } from './LotteryPage';

// 抽奖页面渲染
export const LotteryPageRender: FC<LotteryPageProps> = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <LotteryPage {...props} />
    </ConfigProvider>
  );
};
