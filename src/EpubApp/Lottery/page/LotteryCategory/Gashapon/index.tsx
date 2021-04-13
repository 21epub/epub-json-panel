import React, { FC } from 'react';
import styles from './index.module.less';
import GashaponMachine from './GashaponMachine';
import {
  ActivityTime,
  RemainTime,
  MyPrizeButton,
  RulesButton,
  RollingList,
  ContactInfo
} from '../../../Components';
import {
  SingleLotteryType,
  UserInfoType,
  PrizeType,
  WinnerType
} from '../../../type';
import { getPicture } from '../../../util';

interface GashaponProps {
  winnerList: WinnerType[];
  prizeList: PrizeType[];
  singleLottery: SingleLotteryType;
  userInfo?: UserInfoType;
  isClickable: boolean;
  prefix: string;
  prizeUrl?: string;
  getData: () => void;
}

// 抽奖箱
const Gashapon: FC<GashaponProps> = (props) => {
  const {
    winnerList,
    prizeList,
    userInfo,
    singleLottery,
    prefix,
    prizeUrl,
    getData
  } = props;

  const {
    start_time,
    end_time,
    remain_times,
    show_contact_info,
    show_rolling_list,
    contact_info,
    rules,
    picture = []
  } = singleLottery ?? {};

  const myPrize = getPicture(picture, 'myPrize');
  const rule = getPicture(picture, 'rule');

  return (
    <div className={styles.gashaponWrap}>
      <ActivityTime startTime={start_time} endTime={end_time} />
      <GashaponMachine
        prizeList={prizeList}
        singleLottery={singleLottery}
        userInfo={userInfo}
        prefix={prefix}
        prizeUrl={prizeUrl}
        getData={getData}
        picture={picture}
      />
      <RemainTime remainTimes={remain_times} />
      <MyPrizeButton url={myPrize} myPrizeListUrl={prizeUrl} prefix={prefix} />
      <RulesButton url={rule} rules={rules} isButtonClickable prefix={prefix} />
      <RollingList winnerList={winnerList} isShow={show_rolling_list} />
      <ContactInfo contactInfo={contact_info} isShow={show_contact_info} />
    </div>
  );
};

export default Gashapon;
