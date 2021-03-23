import React, { FC } from 'react'
import NoticeBoard from '../NoticeBoard'
import { getNow } from '../../util'
import styles from './index.module.less'

interface RollingListProps {
  winnerList: any
  isShow: boolean
}

const RollingList: FC<RollingListProps> = (props) => {
  const { winnerList, isShow = true } = props
  const data = `恭喜小李抽中一等奖 ${getNow()}`
  if (winnerList === 'editor') {
    return (
      <div className={styles.rollList}>
        {isShow && <div className='rollingContainerEditor'>{data}</div>}
      </div>
    )
  }
  if (winnerList?.length !== 0) {
    const winner = []
    for (let i = 0; i < winnerList.length; i += 1) {
      winner.push(
        `恭喜${winnerList[i]?.initiator_name || `User${i + 1}`}抽中${
          winnerList[i]?.objective?.ranking
        } ${winnerList[i]?.created}`
      )
    }

    return (
      <div className={styles.rollList}>
        {isShow && (
          <div className='rollingContainer'>
            <NoticeBoard
              className='rollingList'
              textClassName='textContent'
              stepDuration={2000}
              dataSource={winner}
            />
          </div>
        )}
      </div>
    )
  }
  return <div />
}

export default RollingList
