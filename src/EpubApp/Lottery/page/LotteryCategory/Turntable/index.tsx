import React, { FC } from 'react'
import styles from './index.module.less'
import Pointer from './Pointer'
import TurntableBackground from './TurntableBackground'
import TurntableCenter from './TurntableCenter'

interface TurntableProps {
  pointerUrl: string
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
    pointerUrl,
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
      <TurntableBackground url={turntableUrl} prefix={prefix} />
      {prizeList?.length && (
        <div>
          <TurntableCenter prizeList={prizeList} />
          <Pointer
            url={pointerUrl}
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
