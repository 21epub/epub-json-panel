import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import ClockPage from './ClockPage';
import { ClockUrlListType, ClockPictureType } from '../../type';

export interface ClockPageRenderProps {
  clockUrlList: ClockUrlListType;
  clockPicture: ClockPictureType;
  isDataChanged: boolean;
}

// 抽奖页面渲染
export const ClockPageRender: FC<ClockPageRenderProps> = (props) => {
  const { clockUrlList, clockPicture, isDataChanged } = props;

  return (
    <ConfigProvider locale={zhCN}>
      <ClockPage
        clockUrlList={clockUrlList}
        clockPicture={clockPicture}
        isDataChanged={isDataChanged}
      />
    </ConfigProvider>
  );
};
