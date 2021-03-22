import React, { FC, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataClient } from '@21epub/epub-data-client'
import { AppBus } from '../../event-bus/event'
import {
  SingleLotteryProps,
  UserInfo,
  LotteryType,
  LotteryUrlListType
} from '../../type'
import { getLotteryComponent } from '../LotteryCategory'
import { UserInfoModal, ActivityTimeModal } from '../../Components'
import styles from './index.module.less'

export interface LotteryPageProps {
  lotteryType: LotteryType
  lotteryUrlList: LotteryUrlListType
  isDataChanged: boolean
}

const LotteryPage: FC<LotteryPageProps> = (props) => {
  const { lotteryType, lotteryUrlList, isDataChanged } = props
  const {
    prizeListUrl,
    prizeUrl,
    singleLotteryUrl,
    picturePrefix,
    userInfoUrl = '',
    winnersUrl = ''
  } = lotteryUrlList

  const state = useSelector((stateValue: any) => stateValue) // 获取保存的状态
  const dispatch = useDispatch()
  const LotteryComponent = getLotteryComponent(lotteryType)

  const prizeListClient = useMemo(() => {
    return new DataClient(prizeListUrl)
  }, [prizeListUrl])

  const singleLotteryClient = useMemo(() => {
    return new DataClient<SingleLotteryProps>(singleLotteryUrl)
  }, [singleLotteryUrl])

  const winnersClient = useMemo(() => {
    return new DataClient(winnersUrl)
  }, [winnersUrl])

  const userInfoClient = useMemo(() => {
    return new DataClient<UserInfo>(userInfoUrl)
  }, [userInfoUrl])

  // 初始，以及预留监听外部修改状态
  useEffect(() => {
    prizeListUrl && prizeListClient.getAll()
    singleLotteryUrl && singleLotteryClient.getAll()
    winnersUrl && winnersClient.getAll()
    userInfoUrl && userInfoClient.getAll()
  }, [isDataChanged, lotteryType])

  const getData = useCallback(() => {
    prizeListUrl && prizeListClient.getAll()
    singleLotteryUrl && singleLotteryClient.getAll()
    winnersUrl && winnersClient.getAll()
    userInfoUrl && userInfoClient.getAll()
  }, [])

  // 监听是否重新获取数据
  useEffect(() => {
    const subscription = AppBus.subject('RequestAgain$').subscribe(() => {
      getData()
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const prizeList = prizeListClient.useData()
  const singleLottery = singleLotteryClient.useData()
  const userInfo = userInfoClient.useData()
  const winnerList = winnersClient.useData()

  useEffect(() => {
    if (singleLottery?.length && userInfo?.length) {
      if (userInfo[0].user_id === null && singleLottery[0].need_user_info) {
        dispatch({ type: 'IsUserInfoModalShow', value: true })
      } else if (userInfo[0].user_id === null) {
        dispatch({ type: 'shouldUserInfoModalShow', value: true })
      }
    }
  }, [userInfo, singleLottery])

  const { start_time, end_time, show_background_image, picture = {} } =
    singleLottery?.[0] ?? {}
  const { background } = picture

  return (
    <div
      className={styles.lotteryPageWrap}
      style={{
        backgroundImage: show_background_image
          ? `url(${
              background ||
              picturePrefix + 'diazo/images/lottery/turntable/bg.png'
            })`
          : ''
      }}
    >
      <LotteryComponent
        singleLottery={singleLottery}
        winnerList={winnerList}
        prizeList={prizeList}
        userInfo={userInfo}
        isClickable={state.isClickable}
        prefix={picturePrefix}
        prizeUrl={prizeUrl}
      />
      <UserInfoModal
        isModalShow={state.IsUserInfoModalShow}
        singleLottery={singleLottery}
        addUserInfoUrl={userInfoUrl}
      />
      <ActivityTimeModal startTime={start_time} endTime={end_time} />
    </div>
  )
}

export default LotteryPage
