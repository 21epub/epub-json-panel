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
}

const Turntable = ({
  pointerUrl,
  turntableUrl,
  prizeList,
  userInfo,
  singleLottery,
  prizeUrl,
  isClickable
}: Props) => {
  return (
    <div className={styles.turntableWrap}>
      <TurntableBackground url={turntableUrl} />
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
          />
        </div>
      )}
    </div>
  )
}

export default Turntable
