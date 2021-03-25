import React, { FC, useState } from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getLotteryResult } from '../../../data/api'
import SmashEgg from './SmashEgg'

interface GoldenEggsProps {
  isClickable: boolean
  prizeList: any
  singleLottery: any
  prizeUrl?: string
  userInfo: any
  prefix: string
  getData: Function
}

const GoldenEggs: FC<GoldenEggsProps> = (props) => {
  const {
    isClickable,
    singleLottery,
    prizeUrl,
    userInfo,
    prefix,
    getData
  } = props
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state) // 获取保存的状态
  const [modalVisible, setModalVisible] = useState(false)
  const { picture = {} } = singleLottery?.[0] ?? {}
  const { goodEgg, badEgg, hammer } = picture

  const lottery = (singleLottery: any, userInfo: any, prizeUrl?: string) => {
    // 先判断是否需要填写信息
    if (
      userInfo[0]?.user_id === null &&
      singleLottery[0].need_user_info &&
      state.shouldUserInfoModalShow
    ) {
      dispatch({ type: 'IsUserInfoModalShow', value: true })
    } else if (
      prizeUrl &&
      (singleLottery[0].remain_times > 0 ||
        singleLottery[0].remain_times === null)
    ) {
      dispatch({ type: 'isClickable', value: false })
      // 抽奖
      getLotteryResult(prizeUrl).then((res: any) => {
        // 获取抽奖结果
        const prize = res?.data?.data?.results[0]
        setModalVisible(true)
        // 延时1000毫秒弹出获奖结果
        setTimeout(() => {
          console.log(modalVisible)
          Modal.info({
            title: prize.objective.ranking,
            visible: modalVisible,
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
              setModalVisible(false)
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
    isClickable,
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
