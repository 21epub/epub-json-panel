import React, { FC } from 'react'
import styles from './index.module.less'
import TreasureBox from './TreasureBox'
import { ActivityTime } from '../../../Components'

interface LotteryBoxProps {
  startTime?: string
  endTime?: string
  pointerUrl: string
  prizeList: any
  singleLottery: any
  userInfo: any
  isClickable: boolean
  prefix: string
  prizeUrl?: string
}

// 抽奖箱
const LotteryBox: FC<LotteryBoxProps> = (props) => {
  const {
    startTime,
    endTime,
    pointerUrl,
    prizeList,
    userInfo,
    singleLottery,
    isClickable,
    prefix,
    prizeUrl
  } = props
  // console.log(props);

  return (
    <div className={styles.lotteryBoxWrap}>
      <ActivityTime startTime={startTime} endTime={endTime} />
      <TreasureBox
        url={pointerUrl}
        isClickable={isClickable}
        prizeList={prizeList}
        singleLottery={singleLottery}
        userInfo={userInfo}
        prefix={prefix}
        prizeUrl={prizeUrl}
      />
    </div>
  )
}

export default LotteryBox
