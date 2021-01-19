import { Modal } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppBus } from '../event-bus/event'
import { getLotteryResult } from '../api'
import styles from './index.module.less'

interface Props {
  url: string
  isClickable: boolean
  prizeList: any
  singleLottery: any
  prizeUrl: string
  userInfo: any
}

const Pointer = ({
  url,
  isClickable,
  singleLottery,
  prizeUrl,
  userInfo
}: Props) => {
  const dispatch = useDispatch()

  const lottery = (singleLottery: any, prizeUrl: string, userInfo: any) => {
    // 先判断是否需要填写信息
    if (userInfo[0].user_id === null && singleLottery[0].need_user_info) {
      dispatch({ type: 'IsUserInfoModalShow', value: true })
    } else if (
      singleLottery[0].remain_times > 0 ||
      singleLottery[0].remain_times === null
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
      dispatch({ type: 'isClickable', value: false })
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
            src={
              url ||
              'http://dev.epub360.com/staticfs2/diazo/images/lottery/point.png'
            }
            onClick={() => lottery(singleLottery, prizeUrl, userInfo)}
          />
        </a>
      ) : (
        <a style={{ cursor: 'default' }}>
          <img
            className='point'
            src={
              url ||
              'http://dev.epub360.com/staticfs2/diazo/images/lottery/point.png'
            }
          />
        </a>
      )}
    </div>
  )
}

export default Pointer
