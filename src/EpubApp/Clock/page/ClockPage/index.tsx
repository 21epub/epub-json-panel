import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import ClockPage from './ClockPage';
import {
  ClockApiPropsType,
  ClockPictureType,
  ClockEventType
} from '../../type';

export interface ClockPageRenderProps {
  clockApiProps: ClockApiPropsType;
  clockPicture: ClockPictureType;
  clockEvent?: ClockEventType;
  isDataChanged?: boolean;
}

// 抽奖页面渲染
export const ClockPageRender: FC<ClockPageRenderProps> = (props) => {
  const { clockApiProps, clockPicture, clockEvent, isDataChanged } = props;

  return (
    <ConfigProvider locale={zhCN}>
      <ClockPage
        clockApiProps={clockApiProps}
        clockPicture={clockPicture}
        clockEvent={clockEvent}
        isDataChanged={isDataChanged}
      />
    </ConfigProvider>
  );
};
