import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import TaskListPage from './TaskListPage';
import type { TaskListPageProps } from './TaskListPage';
import { GlobalStyle } from './Styled';
import { reducer, initState } from '../../store';

// 页面渲染
export const TaskListPageRender: React.FC<TaskListPageProps> = (props) => {
  // 在组建里重新创建store。此为该实例独享的store。与外界隔离
  const store = createStore(reducer, initState);
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <GlobalStyle />
        <TaskListPage {...props} />
      </ConfigProvider>
    </Provider>
  );
};
