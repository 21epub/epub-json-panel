import React from 'react'
import styles from './rollingList.less'

const RollingList = () => {
  const winnerList = [
    {
      name: '小李',
      ranking: '一等奖',
      created: '2021-02-01'
    },
    {
      name: '小王',
      ranking: '二等奖',
      created: '2021-02-02'
    },
    {
      name: '小明',
      ranking: '三等奖',
      created: '2021-02-03'
    },
    {
      name: '小红',
      ranking: '四等奖',
      created: '2021-02-04'
    }
  ]
  return (
    <div className={styles.rollList}>
      <div className='rollingWrap'>
        <div className='rollingContainer'>
          {winnerList.map((item, index) => {
            return (
              <div key={index} className='winnerList'>
                恭喜{item.name}获得{item.ranking} {item.created}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RollingList
