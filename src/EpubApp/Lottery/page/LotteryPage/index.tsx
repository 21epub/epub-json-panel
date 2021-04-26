import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import LotteryPage from './LotteryPage';
import store from '../../store/store';
import {
  LotteryType,
  LotteryUrlListType,
  LotteryPictureType
} from '../../type';

export interface LotteryPageRenderProps {
  lotteryType: LotteryType;
  lotteryUrlList: LotteryUrlListType;
  lotteryPicture: LotteryPictureType;
  isDataChanged: boolean;
}

// 抽奖页面渲染
export const LotteryPageRender: FC<LotteryPageRenderProps> = (props) => {
  const { lotteryUrlList, lotteryPicture, lotteryType, isDataChanged } = props;

  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <LotteryPage
          lotteryType={lotteryType}
          lotteryUrlList={lotteryUrlList}
          lotteryPicture={lotteryPicture}
          isDataChanged={isDataChanged}
        />
      </Provider>
    </ConfigProvider>
  );
};
