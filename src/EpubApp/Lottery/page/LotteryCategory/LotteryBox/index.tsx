import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.less';
import TreasureBox from './TreasureBox';
import {
  ActivityTime,
  RemainTime,
  MyPrizeButton,
  RulesButton,
  RollingList,
  ContactInfo
} from '../../../Components';
import { UserInfoType, WinnerType } from '../../../type';
import { StateType } from '../../../store/reducer';

interface LotteryBoxProps {
  winnerList: WinnerType[];
  userInfo: UserInfoType;
  prizeUrl?: string;
  getData: () => void;
}

// 抽奖箱
const LotteryBox: FC<LotteryBoxProps> = (props) => {
  const { winnerList, userInfo, prizeUrl, getData } = props;
  const { lotteryDetail } = useSelector((state: StateType) => state);
  const {
    start_time,
    end_time,
    remain_times,
    show_contact_info,
    show_rolling_list,
    contact_info,
    rules
  } = lotteryDetail;

  return (
    <div className={styles.lotteryBoxWrap}>
      <ActivityTime startTime={start_time} endTime={end_time} />
      <TreasureBox userInfo={userInfo} prizeUrl={prizeUrl} getData={getData} />
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

export default LotteryBox;
