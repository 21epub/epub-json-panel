import React, { FC } from 'react';
import styles from './index.module.less';
import TreasureBox from './TreasureBox';
import {
  ActivityTime,
  RemainTime,
  MyPrizeButton,
  RulesButton,
  RollingList,
  ContactInfo
} from '../../../components';
import { LotteryUserInfoType, WinnerType } from '../../../type';
import store from '../../../store';

interface LotteryBoxProps {
  winnerList: WinnerType[];
  userInfo: LotteryUserInfoType;
  prizeUrl?: string;
  getData: () => void;
}

// 抽奖箱
const LotteryBox: FC<LotteryBoxProps> = (props) => {
  const { winnerList, userInfo, prizeUrl, getData } = props;
  const [state] = store.useRxjsStore();
  const { lotteryDetail } = state;
  const {
    start_time,
    end_time,
    remain_times,
    show_contact_info,
    show_rolling_list,
    contact_info,
    rules,
    show_activity,
    show_remain_time,
    show_self_prize,
    show_activity_rule
  } = lotteryDetail ?? {};

  return (
    <div className={styles.lotteryBoxWrap}>
      <ActivityTime
        startTime={start_time}
        endTime={end_time}
        isShow={show_activity}
      />
      <RemainTime remainTimes={remain_times} isShow={show_remain_time} />
      <TreasureBox userInfo={userInfo} prizeUrl={prizeUrl} getData={getData} />
      <MyPrizeButton myPrizeListUrl={prizeUrl} isShow={show_self_prize} />
      <RulesButton rules={rules} isShow={show_activity_rule} />
      <RollingList
        winnerList={winnerList}
        isShow={show_rolling_list}
        prizeUrl={prizeUrl}
      />
      <ContactInfo contactInfo={contact_info} isShow={show_contact_info} />
    </div>
  );
};

export default LotteryBox;
