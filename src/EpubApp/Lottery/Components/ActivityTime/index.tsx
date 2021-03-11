// import moment from 'moment'
import React from 'react'
// import { getNow } from '../util'
import styles from './index.module.less'

interface Props {
  startTime?: string | null
  endTime?: string | null
}

// 活动时间组件
const ActivityTime = ({ startTime, endTime }: Props) => {
  if (startTime !== null && endTime !== null) {
    return (
      <div className={styles.activityTime}>
        <div className='activityTime'>
          活动时间：{startTime?.substr(0, startTime?.length - 3)}~
          {endTime?.substr(0, endTime?.length - 3)}
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.activityTime}>
        <div className='activityTimeNoLimit'>本活动永久有效</div>
      </div>
    )
  }
}

export default ActivityTime
