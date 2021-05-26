import React, { FC } from 'react';
import styles from './index.module.less';
import PrizeGrid from './PrizeGrid';
import {
  ActivityTime,
  RemainTime,
  MyPrizeButton,
  RulesButton,
  RollingList,
  ContactInfo
} from '../../../components';
import { LotteryUserInfoType, PrizeType, WinnerType } from '../../../type';
import store from '../../../store';

interface LotteryGridProps {
  winnerList: WinnerType[];
  prizeList: PrizeType[];
  userInfo: LotteryUserInfoType;
  prizeUrl?: string;
  getData: () => void;
}

// 抽奖箱
const LotteryGrid: FC<LotteryGridProps> = (props) => {
  const { winnerList, prizeList, userInfo, prizeUrl, getData } = props;
  const [state] = store.useRxjsStore();
  const { lotteryDetail } = state;
  const {
    start_time,
    end_time,
    remain_times,
    show_contact_info,
    show_rolling_list,
    contact_info,
    rules
  } = lotteryDetail ?? {};

  return (
    <div className={styles.lotteryGridWrap}>
      <ActivityTime startTime={start_time} endTime={end_time} />
      <PrizeGrid
        prizeList={prizeList}
        userInfo={userInfo}
        prizeUrl={prizeUrl}
        getData={getData}
      />
      <RemainTime remainTimes={remain_times} />
      <MyPrizeButton myPrizeListUrl={prizeUrl} />
      <RulesButton rules={rules} />
      <RollingList
        winnerList={winnerList}
        isShow={show_rolling_list}
        prizeUrl={prizeUrl}
      />
      <ContactInfo contactInfo={contact_info} isShow={show_contact_info} />
    </div>
  );
};

export default LotteryGrid;
