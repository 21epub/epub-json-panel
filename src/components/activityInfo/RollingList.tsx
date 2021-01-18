import React from 'react'
import { getNow } from '../util'
import styles from './index.module.less'

interface Props {
  winnerList: any
  isShow: boolean
}

const RollingList = ({ winnerList, isShow }: Props) => {
  // const [content,setContent] =useState(`恭喜小李抽中一等奖 ${getNow()}`)
  console.log(winnerList)
  const data = `恭喜小李抽中一等奖 ${getNow()}`
  return (
    <div className={styles.rollList}>
      {isShow && <div className='rollingContainer'>{data}</div>}
    </div>
  )
}

export default RollingList
