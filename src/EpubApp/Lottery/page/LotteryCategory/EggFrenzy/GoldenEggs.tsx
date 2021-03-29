import React, { FC, useState } from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getLotteryResult } from '../../../data/api'
import SmashEgg from './SmashEgg'

interface GoldenEggsProps {
  prizeList: any
  singleLottery: any
  prizeUrl?: string
  userInfo: any
  prefix: string
  getData: Function
}

const GoldenEggs: FC<GoldenEggsProps> = (props) => {
  const { singleLottery, prizeUrl, userInfo, prefix, getData } = props
  const dispatch = useDispatch()
  const state = useSelector((stateValue: any) => stateValue) // 获取保存的状态
  const [isLotterySuccess, setIsLotterySuccess] = useState(false)
  const { picture = {} } = singleLottery?.[0] ?? {}
  const { goodEgg, badEgg, hammer } = picture

  const lottery = (
    singleLotteryValue: any,
    userInfoValue: any,
    prizeUrlValue?: string
  ) => {
    // 先判断是否需要填写信息
    if (
      userInfoValue[0]?.user_id === null &&
      singleLotteryValue[0].need_user_info &&
      state.shouldUserInfoModalShow
    ) {
      dispatch({ type: 'IsUserInfoModalShow', value: true })
    } else if (
      prizeUrlValue &&
      (singleLotteryValue[0]?.remain_times > 0 ||
        singleLotteryValue[0]?.remain_times === null)
    ) {
      dispatch({ type: 'isClickable', value: false })
      // 抽奖
      getLotteryResult(prizeUrlValue).then((res: any) => {
        // 获取抽奖结果
        const prize = res?.data?.data?.results[0]
        setIsLotterySuccess(true)
        // 延时1000毫秒弹出获奖结果
        setTimeout(() => {
          Modal.info({
            title: prize.objective.ranking,
            visible: isLotterySuccess,
            content: (
              <div>
                <hr />
                奖项名:{prize.objective.title}
              </div>
            ),
            onOk() {
              // 重新获取后台的值
              getData()
              dispatch({ type: 'isClickable', value: true })
              setIsLotterySuccess(false)
              if (
                !prize?.objective?.is_empty &&
                state.shouldUserInfoModalShow
              ) {
                dispatch({ type: 'IsUserInfoModalShow', value: true })
              }
            }
          })
        }, 500)
      })
    } else {
      Modal.info({
        title: '抽奖次数用完啦',
        content: (
          <div>
            <hr />
            <p>您的抽奖次数用完啦！</p>
            <p>无法抽奖，感谢您的参与！</p>
          </div>
        ),
        onOk() {}
      })
    }
  }

  const SmashEggProps = {
    prefix,
    goodEgg,
    badEgg,
    hammer,
    isLotterySuccess,
    onClick: () => lottery(singleLottery, userInfo, prizeUrl)
  }

  return (
    <div className='eggFrenzyContainer'>
      <div className='egg1'>
        <SmashEgg {...SmashEggProps} />
      </div>
      <div className='egg2'>
        <SmashEgg {...SmashEggProps} />
      </div>
      <div className='egg3'>
        <SmashEgg {...SmashEggProps} />
      </div>
    </div>
  )
}

export default GoldenEggs
