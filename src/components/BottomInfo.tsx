import * as React from 'react'
import styles from './index.module.less'

interface Props {
  remainTimes: number | null
}

const BottomInfo = ({ remainTimes }: Props) => {
  return (
    <div className={styles.RemainTimesWrap}>
      <p>您还剩余{remainTimes === null ? '?' : remainTimes}次抽奖机会</p>
    </div>
  )
}

export default BottomInfo
