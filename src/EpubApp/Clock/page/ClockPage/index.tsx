import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import ClockPage from './ClockPage';
import {
  ClockApiPropsType,
  ClockPictureType,
  ClockEventType
} from '../../type';
import { GlobalStyle } from './Styled';

export interface ClockPageRenderProps {
  clockApiProps: ClockApiPropsType;
  clockPicture: ClockPictureType;
  clockEvent?: ClockEventType;
  isDataChanged?: boolean;
}

// 抽奖页面渲染
export const ClockPageRender: FC<ClockPageRenderProps> = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <GlobalStyle />
      <ClockPage {...props} />
    </ConfigProvider>
  );
};
