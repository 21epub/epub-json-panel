import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import TaskListPage from './TaskListPage';
import type { TaskListPageProps } from './TaskListPage';
import { GlobalStyle } from './Styled';

// 投票页面渲染
export const TaskListPageRender: FC<TaskListPageProps> = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <GlobalStyle />
      <TaskListPage {...props} />
    </ConfigProvider>
  );
};
