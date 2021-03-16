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
  pointerUrl: string
  prizeList: any
  singleLottery: any
  userInfo: any
  isClickable: boolean
  prefix: string
  prizeUrl?: string
  myPrizeListUrl: string
}

// 抽奖箱
const LotteryBox: FC<LotteryBoxProps> = (props) => {
  const {
    myPrizeListUrl,
    winnerList,
    pointerUrl,
    prizeList,
    userInfo,
    singleLottery,
    isClickable,
    prefix,
    prizeUrl
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

  const { myPrize, rule } = picture

  return (
    <div className={styles.lotteryBoxWrap}>
      <ActivityTime startTime={start_time} endTime={end_time} />
      <TreasureBox
        url={pointerUrl}
        isClickable={isClickable}
        prizeList={prizeList}
        singleLottery={singleLottery}
        userInfo={userInfo}
        prefix={prefix}
        prizeUrl={prizeUrl}
      />
      <RemainTime remainTimes={remain_times} />
      <MyPrizeButton
        url={myPrize}
        myPrizeListUrl={myPrizeListUrl}
        prefix={prefix}
      />
      <RulesButton url={rule} rules={rules} isButtonClickable prefix={prefix} />
      <RollingList winnerList={winnerList} isShow={show_rolling_list} />
      <ContactInfo contactInfo={contact_info} isShow={show_contact_info} />
    </div>
  )
}

export default LotteryBox
