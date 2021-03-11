import React, { FC } from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppBus } from '../../../event-bus/event'
import { getLotteryResult } from '../../../data/api'
import styles from './index.module.less'

interface PointerProps {
  url: string
  isClickable: boolean
  prizeList: any
  singleLottery: any
  prizeUrl?: string
  userInfo: any
  prefix: string
}

const Pointer: FC<PointerProps> = (props) => {
  const { url, isClickable, singleLottery, prizeUrl, userInfo, prefix } = props
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state) // 获取保存的状态

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
        // 通知旋转
        AppBus.subject('Rotate$').next(prize)
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

  return (
    <div className={styles.pointer}>
      {isClickable ? (
        <a>
          <img
            className='point'
            src={url || `${prefix}diazo/images/lottery/turntable/point.png`}
            onClick={() => lottery(singleLottery, userInfo, prizeUrl)}
          />
        </a>
      ) : (
        <a style={{ cursor: 'default' }}>
          <img
            className='point'
            src={url || `${prefix}diazo/images/lottery/turntable/point.png`}
          />
        </a>
      )}
    </div>
  )
}

export default Pointer
