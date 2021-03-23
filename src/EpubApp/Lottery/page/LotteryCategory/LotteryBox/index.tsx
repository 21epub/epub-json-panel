import React, { FC } from 'react'
import styles from './index.module.less'
import TreasureBox from './TreasureBox'
import {
  ActivityTime,
  RemainTime,
  MyPrizeButton,
  RulesButton,
  RollingList,
  ContactInfo
} from '../../../Components'

interface LotteryBoxProps {
  winnerList: any
  prizeList: any
  singleLottery: any
  userInfo: any
  isClickable: boolean
  prefix: string
  prizeUrl?: string
  getData: Function
}

// 抽奖箱
const LotteryBox: FC<LotteryBoxProps> = (props) => {
  const {
    winnerList,
    prizeList,
    userInfo,
    singleLottery,
    isClickable,
    prefix,
    prizeUrl,
    getData
  } = props

  const {
    start_time,
    end_time,
    remain_times,
    show_contact_info,
    show_rolling_list,
    contact_info,
    rules,
    picture = {}
  } = singleLottery?.[0] ?? {}

  const { myPrize, rule, openBox, closeBox } = picture

  return (
    <div className={styles.lotteryBoxWrap}>
      <ActivityTime startTime={start_time} endTime={end_time} />
      <TreasureBox
        openBox={openBox}
        closeBox={closeBox}
        isClickable={isClickable}
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
      <RollingList winnerList={winnerList} isShow={show_rolling_list} />
      <ContactInfo contactInfo={contact_info} isShow={show_contact_info} />
    </div>
  )
}

export default LotteryBox
