import * as React from 'react'
import styles from './index.module.less'
import { prizeListUrl, singleLotteryUrl, prizeUrl } from './apiUrl'
import Turntable from './Turntable'
interface Props {
  remainTimes: number | null
}

const LotteryPage = ({ remainTimes }: Props) => {
  return (
    <div className={styles.LotteryPage}>
      <img
        className='bgImg'
        src='http://dev.epub360.com/staticfs2/diazo/images/lottery/bg.png'
      />
      <div className='turntableContent'>
        <img
          className='headImg'
          src='http://dev.epub360.com/staticfs2/diazo/images/lottery/head.png'
        />
        <div className='topTime'>
          <p className='remainTimes'>活动时间：2020-01-01～2020-01-02</p>
        </div>
        <div className='turntableWrap'>
          <Turntable
            prizeListUrl={prizeListUrl}
            prizeUrl={prizeUrl}
            singleLotteryUrl={singleLotteryUrl}
          />
        </div>
        <div className='bottomInfo'>
          <p className='remainTimes'>
            您还剩余{remainTimes === null ? '?' : remainTimes}次抽奖机会
          </p>
          <img
            className='prize'
            src='http://dev.epub360.com/staticfs2/diazo/images/lottery/myPrize.png'
          />
          <img
            className='rule'
            src='http://dev.epub360.com/staticfs2/diazo/images/lottery/rule.png'
          />
        </div>
        <p className='award'>恭喜小李抽中一等奖 2020/09/10 14:20</p>
      </div>
    </div>
  )
}

export default LotteryPage
