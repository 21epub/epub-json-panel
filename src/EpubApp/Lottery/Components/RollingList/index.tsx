import React from 'react'
import NoticeBoard from '../NoticeBoard'
import { getNow } from '../../util'
import styles from './index.module.less'

interface Props {
  winnerList: any
  isShow: boolean
}

const RollingList = ({ winnerList, isShow = true }: Props) => {
  const data = `恭喜小李抽中一等奖 ${getNow()}`
  if (winnerList === 'editor') {
    return (
      <div className={styles.rollList}>
        {isShow && <div className='rollingContainerEditor'>{data}</div>}
      </div>
    )
  } else if (winnerList?.length !== 0) {
    const winner = []
    for (let i = 0; i < winnerList.length; i++) {
      winner.push(
        `恭喜${winnerList[i]?.initiator_name}抽中${winnerList[i]?.objective?.ranking} ${winnerList[i]?.created}`
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
  } else {
    return <div />
  }
}

export default RollingList
