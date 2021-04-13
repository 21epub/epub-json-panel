import React, { FC } from 'react';
import { isEmpty } from 'lodash';
import NoticeBoard from './NoticeBoard';
import { getNow } from '../../util';
import { WinnerType } from '../../type';
import styles from './index.module.less';

interface RollingListProps {
  winnerList: WinnerType[];
  isShow: boolean;
  prizeUrl?: string;
}

// 中奖轮播列表
const RollingList: FC<RollingListProps> = (props) => {
  const { winnerList, isShow = true, prizeUrl } = props;
  const data = `恭喜小李抽中一等奖 ${getNow()}`;
  // 中奖者轮播列表
  const winner: string[] = winnerList.reduce((prev: string[], curr, index) => {
    prev.push(
      `恭喜${
        curr.initiator_name || curr.initiator_username || `User${index + 1}`
      }抽中${curr.objective?.ranking} ${curr?.created}`
    );
    return prev;
  }, []);

  return (
    (!isEmpty(winnerList) || null) && (
      <div className={styles.rollList}>
        {isShow && (
          <div className='rollingContainer'>
            {prizeUrl ? (
              <NoticeBoard
                className='rollingList'
                textClassName='textContent'
                stepDuration={2000}
                dataSource={winner}
              />
            ) : (
              <div className='rollingContainerEditor'>{data}</div>
            )}
          </div>
        )}
      </div>
    )
  );
};

export default RollingList;
