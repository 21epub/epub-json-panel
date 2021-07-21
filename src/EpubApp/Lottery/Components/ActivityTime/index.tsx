import React, { FC } from 'react';
import styles from './index.module.less';

interface ActivityTimeProps {
  startTime?: string | null;
  endTime?: string | null;
  isShow?: boolean;
}

// 活动时间组件
const ActivityTime: FC<ActivityTimeProps> = (props) => {
  const { startTime, endTime, isShow } = props;
  return (
    <div>
      {isShow && (
        <div className={`${styles.activityTime} activityTime`}>
          活动时间：
          {startTime && endTime
            ? `${startTime?.substr(
                0,
                startTime?.length - 3
              )} ~ ${endTime?.substr(0, endTime?.length - 3)}`
            : '本活动永久有效'}
        </div>
      )}
    </div>
  );
};
export default ActivityTime;
