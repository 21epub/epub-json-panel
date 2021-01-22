import React from 'react'
import styles from './index.module.less'

interface Props {
  remainTimes: number | null
}

const RemainTime = ({ remainTimes }: Props) => {
  return (
    <div className={styles.remainTime}>
      <div className='remainTimesWrap'>
        {(remainTimes && remainTimes > 0) || remainTimes === 0 ? (
          `您还剩余${remainTimes}次抽奖机会`
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

export default RemainTime
