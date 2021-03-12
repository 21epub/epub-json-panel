import React, { FC } from 'react'
import styles from './index.module.less'
import Pointer from './Pointer'
import TurntableBackground from './TurntableBackground'
import TurntableCenter from './TurntableCenter'
import { ActivityTime } from '../../../Components'

interface TurntableProps {
  startTime: string
  endTime: string
  pointUrl: string
  turntableUrl: string
  prizeList: any
  singleLottery: any
  userInfo: any
  isClickable: boolean
  prefix: string
  prizeUrl?: string
}

// 大转盘抽奖
const Turntable: FC<TurntableProps> = (props) => {
  const {
    startTime,
    endTime,
    pointUrl,
    turntableUrl,
    prizeList,
    userInfo,
    singleLottery,
    isClickable,
    prefix,
    prizeUrl
  } = props

  return (
    <div className={styles.turntableWrap}>
      <ActivityTime startTime={startTime} endTime={endTime} />
      <TurntableBackground url={turntableUrl} prefix={prefix} />
      {prizeList?.length && (
        <div>
          <TurntableCenter prizeList={prizeList} />
          <Pointer
            url={pointUrl}
            isClickable={isClickable}
            prizeList={prizeList}
            singleLottery={singleLottery}
            userInfo={userInfo}
            prefix={prefix}
            prizeUrl={prizeUrl}
          />
        </div>
      )}
    </div>
  )
}

export default Turntable
