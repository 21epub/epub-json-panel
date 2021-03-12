import React, { FC } from 'react'
import styles from './index.module.less'

interface ActivityTimeProps {
  startTime?: string | null
  endTime?: string | null
}

// 活动时间组件
const ActivityTime: FC<ActivityTimeProps> = (props) => {
  const { startTime, endTime } = props
  return (
    <div className={`${styles.activityTime} activityTime`}>
      活动时间：
      {startTime && endTime
        ? `${startTime?.substr(0, startTime?.length - 3)} ~ ${endTime?.substr(
            0,
            endTime?.length - 3
          )}`
        : '本活动永久有效'}
    </div>
  )
}
export default ActivityTime
