import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import LotteryPage from './LotteryPage';
import {
  LotteryType,
  LotteryUrlListType,
  LotteryPictureType,
  LotteryEventType
} from '../../type';

export interface LotteryPageRenderProps {
  lotteryType: LotteryType;
  lotteryUrlList: LotteryUrlListType;
  lotteryPicture: LotteryPictureType;
  lotteryEvent?: LotteryEventType;
  isDataChanged?: boolean;
}

// 抽奖页面渲染
export const LotteryPageRender: FC<LotteryPageRenderProps> = (props) => {
  const {
    lotteryUrlList,
    lotteryPicture,
    lotteryType,
    lotteryEvent,
    isDataChanged
  } = props;

  return (
    <ConfigProvider locale={zhCN}>
      <LotteryPage
        lotteryType={lotteryType}
        lotteryUrlList={lotteryUrlList}
        lotteryPicture={lotteryPicture}
        lotteryEvent={lotteryEvent}
        isDataChanged={isDataChanged}
      />
    </ConfigProvider>
  );
};
