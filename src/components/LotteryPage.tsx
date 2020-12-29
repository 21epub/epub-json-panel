import * as React from 'react'
import styles from './index.module.less'
import { getNow, getDate, getToday } from './util'
import Turntable from './Turntable'
import { info } from './InfoModal'
import { useSelector } from 'react-redux'

interface Props {
  isDataChanged: boolean
  prizeListUrl: string
  prizeUrl: string
  singleLotteryUrl: string
  myPrizeListUrl: string
  addUserInfoUrl: string
  queryUserInfoUrl: string
}

const LotteryPage = ({
  isDataChanged,
  prizeListUrl,
  prizeUrl,
  singleLotteryUrl,
  myPrizeListUrl,
  addUserInfoUrl,
  queryUserInfoUrl
}: Props) => {
  const state = useSelector((state: any) => state) // 获取保存的状态
  console.log('抽奖信息:', state?.lotteryInfo)
  console.log('我的奖品信息:', state?.myPrizeList)

  const getMyPrize = () => {
    const myPrize = state?.myPrizeList?.length
      ? state?.myPrizeList
      : ['还未中奖']
    const msg = {
      title: '我的奖品',
      content: (
        <div>
          {myPrize.map((item: any, index: number) => {
            if (state?.myPrizeList?.length)
              return (
                <div key={index}>
                  <p>奖项：{item.objective.ranking}</p>
                  <p>奖品名：{item.objective.title}</p>
                  <hr />
                </div>
              )
            else {
              return <p key='noPrize'>{item}</p>
            }
          })}
        </div>
      )
    }
    info(msg)
  }

  const getRules = () => {
    const msg = {
      title: '活动规则',
      content: (
        <div
          dangerouslySetInnerHTML={{ __html: state?.lotteryInfo[0].rules }}
        />
      )
    }
    info(msg)
  }

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
          活动时间：
          {state?.lotteryInfo[0]?.start_time
            ? state?.lotteryInfo[0]?.start_time.substr(
                0,
                state?.lotteryInfo[0]?.start_time.length - 3
              )
            : getToday()}
          ～
          {state?.lotteryInfo[0]?.end_time
            ? state?.lotteryInfo[0]?.end_time.substr(
                0,
                state?.lotteryInfo[0]?.end_time.length - 3
              )
            : getDate(7)}
        </div>
        <div className='turntableWrap'>
          <Turntable
            prizeListUrl={prizeListUrl}
            prizeUrl={prizeUrl}
            singleLotteryUrl={singleLotteryUrl}
            isDataChanged={isDataChanged}
            myPrizeListUrl={myPrizeListUrl}
            addUserInfoUrl={addUserInfoUrl}
            queryUserInfoUrl={queryUserInfoUrl}
          />
        </div>
        <div className='bottomInfo'>
          <div className='remainTimes'>
            您还剩余
            {state?.lotteryInfo[0]?.remain_times
              ? state?.lotteryInfo[0]?.remain_times
              : '?'}
            次抽奖机会
          </div>
          <img
            className='prize'
            src='http://dev.epub360.com/staticfs2/diazo/images/lottery/myPrize.png'
            onClick={getMyPrize}
          />
          <img
            className='rule'
            src='http://dev.epub360.com/staticfs2/diazo/images/lottery/rule.png'
            onClick={getRules}
          />
        </div>
        <div className='award'>恭喜小李抽中一等奖 {getNow()}</div>
      </div>
    </div>
  )
}

export default LotteryPage
