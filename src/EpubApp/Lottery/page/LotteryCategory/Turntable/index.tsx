import React, { FC } from 'react'
import styles from './index.module.less'
import TurntableCenter from './TurntableCenter'
import {
  ActivityTime,
  RemainTime,
  MyPrizeButton,
  RulesButton,
  RollingList,
  ContactInfo
} from '../../../Components'
import {
  SingleLotteryType,
  UserInfoType,
  PrizeType,
  WinnerListType
} from '../../../type'
import { getPicture } from '../../../util'

interface TurntableProps {
  prizeList: PrizeType[]
  winnerList: WinnerListType[]
  singleLottery: SingleLotteryType
  userInfo?: UserInfoType
  isClickable: boolean
  prefix: string
  prizeUrl?: string
  getData: Function
}

// 大转盘抽奖
const Turntable: FC<TurntableProps> = (props) => {
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
    picture = []
  } = singleLottery ?? {}

  const myPrize = getPicture(picture, 'myPrize')
  const rule = getPicture(picture, 'rule')
  const pointer = getPicture(picture, 'pointer')
  const turntable = getPicture(picture, 'turntable')

  return (
    <div className={styles.turntableWrap}>
      <ActivityTime startTime={start_time} endTime={end_time} />
      <TurntableCenter
        pointer={pointer}
        isClickable={isClickable}
        prizeList={prizeList}
        singleLottery={singleLottery}
        userInfo={userInfo}
        prefix={prefix}
        prizeUrl={prizeUrl}
        turntable={turntable}
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
  )
}

export default Turntable
