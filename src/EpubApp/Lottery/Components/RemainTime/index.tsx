import React, { FC } from 'react';
import styles from './index.module.less';

interface RemainTimeProps {
  remainTimes?: number | null;
  isShow?: boolean;
}

const RemainTime: FC<RemainTimeProps> = (props) => {
  const { remainTimes, isShow } = props;

  return (
    <div className={styles.remainTime}>
      {isShow && (
        <div className='remainTimesWrap'>
          {remainTimes
            ? remainTimes > 0
              ? `您还剩余${remainTimes}次抽奖机会`
              : `您的抽奖次数已用完`
            : ''}
        </div>
      )}
    </div>
  );
};

export default RemainTime;
