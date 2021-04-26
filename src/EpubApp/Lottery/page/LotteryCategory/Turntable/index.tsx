import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../../store/reducer';
import styles from './index.module.less';
import TurntableCenter from './TurntableCenter';
import {
  ActivityTime,
  RemainTime,
  MyPrizeButton,
  RulesButton,
  RollingList,
  ContactInfo
} from '../../../Components';
import { UserInfoType, PrizeType, WinnerType } from '../../../type';

interface TurntableProps {
  prizeList: PrizeType[];
  winnerList: WinnerType[];
  userInfo?: UserInfoType;
  prizeUrl?: string;
  getData: Function;
}

// 大转盘抽奖
const Turntable: FC<TurntableProps> = (props) => {
  const { winnerList, prizeList, userInfo, prizeUrl, getData } = props;
  // 获取保存的状态
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
    <div className={styles.turntableWrap}>
      <ActivityTime startTime={start_time} endTime={end_time} />
      <TurntableCenter
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

export default Turntable;
