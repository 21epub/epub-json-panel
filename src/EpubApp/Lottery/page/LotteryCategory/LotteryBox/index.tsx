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
} from '../../../Components';
import {
  SingleLotteryType,
  UserInfoType,
  PrizeType,
  WinnerType
} from '../../../type';
import { getPicture } from '../../../util';

interface LotteryBoxProps {
  winnerList: WinnerType[];
  prizeList: PrizeType[];
  singleLottery: SingleLotteryType;
  userInfo: UserInfoType;
  isClickable: boolean;
  prefix: string;
  prizeUrl?: string;
  getData: () => void;
}

// 抽奖箱
const LotteryBox: FC<LotteryBoxProps> = (props) => {
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
  const openBox = getPicture(picture, 'openBox');
  const closeBox = getPicture(picture, 'closeBox');

  return (
    <div className={styles.lotteryBoxWrap}>
      <ActivityTime startTime={start_time} endTime={end_time} />
      <TreasureBox
        openBox={openBox}
        closeBox={closeBox}
        prizeList={prizeList}
        singleLottery={singleLottery}
        userInfo={userInfo}
        prefix={prefix}
        prizeUrl={prizeUrl}
        getData={getData}
      />
      <RemainTime remainTimes={remain_times} />
      <MyPrizeButton url={myPrize} myPrizeListUrl={prizeUrl} prefix={prefix} />
      <RulesButton url={rule} rules={rules} isButtonClickable prefix={prefix} />
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
