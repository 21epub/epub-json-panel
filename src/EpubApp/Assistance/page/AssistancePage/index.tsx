import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import AssistancePage from './AssistancePage';
import type { AssistancePageProps } from './AssistancePage';

// 抽奖页面渲染
export const AssistancePageRender: FC<AssistancePageProps> = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <AssistancePage {...props} />
    </ConfigProvider>
  );
};
