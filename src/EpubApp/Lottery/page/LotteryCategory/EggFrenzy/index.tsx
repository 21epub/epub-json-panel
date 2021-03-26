import React, { FC } from 'react'
import styles from './index.module.less'
import GoldenEggs from './GoldenEggs'
import {
  ActivityTime,
  RemainTime,
  MyPrizeButton,
  RulesButton,
  RollingList,
  ContactInfo
} from '../../../Components'

interface EggFrenzyProps {
  winnerList: any
  prizeList: any
  singleLottery: any
  userInfo: any
  isClickable: boolean
  prefix: string
  prizeUrl?: string
  getData: () => void
}

// 抽奖箱
const EggFrenzy: FC<EggFrenzyProps> = (props) => {
  const {
    winnerList,
    prizeList,
    userInfo,
    singleLottery,
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

  const { myPrize, rule } = picture

  return (
    <div className={styles.eggFrenzyWrap}>
      <ActivityTime startTime={start_time} endTime={end_time} />
      <GoldenEggs
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

export default EggFrenzy
