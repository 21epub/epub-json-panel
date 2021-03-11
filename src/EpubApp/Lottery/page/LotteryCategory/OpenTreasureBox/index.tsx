import React from 'react'
import styles from './index.module.less'
import Pointer from './Pointer'
import TurntableBackground from './TurntableBackground'
import TurntableCenter from './TurntableCenter'

interface Props {
  pointerUrl: string
  turntableUrl: string
  prizeList: any
  singleLottery: any
  prizeUrl: string
  userInfo: any
  isClickable: boolean
  prefix: string
}

// 大转盘抽奖
const Turntable = ({
  pointerUrl,
  turntableUrl,
  prizeList,
  userInfo,
  singleLottery,
  prizeUrl,
  isClickable,
  prefix
}: Props) => {
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
            prizeUrl={prizeUrl}
            userInfo={userInfo}
            prefix={prefix}
          />
        </div>
      )}
    </div>
  )
}

export default Turntable
