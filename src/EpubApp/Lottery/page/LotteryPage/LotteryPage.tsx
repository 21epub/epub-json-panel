import React, { FC, useCallback, useEffect, useMemo } from 'react'
import styles from './index.module.less'
import { useDispatch, useSelector } from 'react-redux'
import { DataClient } from '@21epub/epub-data-client'
import { AppBus } from '../../event-bus/event'
import { SingleLotteryProps, UserInfo, LotteryType } from '../../type'
import Turntable from '../LotteryCategory/Turntable'

import {
  ActivityTime,
  RemainTime,
  MyPrizeButton,
  RulesButton,
  BackgroundPic,
  ContactInfo,
  UserInfoModal,
  RollingList,
  ActivityTimeModal
} from '../../Components'

export interface LotteryPageProps {
  lotteryType: LotteryType
  isDataChanged: boolean
  prizeListUrl: string
  singleLotteryUrl: string
  prefix: string
  prizeUrl?: string
  myPrizeListUrl?: string
  addUserInfoUrl?: string
  queryUserInfoUrl?: string
  winnersUrl?: string
}

const LotteryPage: FC<LotteryPageProps> = (props) => {
  const {
    // lotteryType,
    prefix,
    isDataChanged,
    prizeListUrl,
    singleLotteryUrl,
    prizeUrl,
    myPrizeListUrl,
    addUserInfoUrl,
    queryUserInfoUrl = '',
    winnersUrl = ''
  } = props

  const state = useSelector((stateValue: any) => stateValue) // 获取保存的状态
  const dispatch = useDispatch()

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
    return new DataClient<UserInfo>(queryUserInfoUrl)
  }, [queryUserInfoUrl])

  // 初始，以及预留监听外部修改状态
  useEffect(() => {
    prizeListUrl && prizeListClient.getAll()
    singleLotteryUrl && singleLotteryClient.getAll()
    winnersUrl && winnersClient.getAll()
    queryUserInfoUrl && userInfoClient.getAll()
  }, [isDataChanged])

  const getData = useCallback(() => {
    prizeListUrl && prizeListClient.getAll()
    singleLotteryUrl && singleLotteryClient.getAll()
    winnersUrl && winnersClient.getAll()
    queryUserInfoUrl && userInfoClient.getAll()
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

  const {
    start_time,
    end_time,
    remain_times,
    show_background_image,
    show_contact_info,
    show_rolling_list,
    contact_info,
    rules
  } = singleLottery?.[0] ?? {}

  const { background, pointer, turntable, myPrize, rule } =
    singleLottery?.[0]?.picture ?? {}

  return (
    <div className={styles.lotteryPageWrap}>
      <BackgroundPic
        url={background}
        isShow={show_background_image}
        prefix={prefix}
      />
      <ActivityTime startTime={start_time} endTime={end_time} />
      <div className='turntableWrap'>
        <Turntable
          pointerUrl={pointer}
          turntableUrl={turntable}
          prizeList={prizeList}
          userInfo={userInfo}
          singleLottery={singleLottery}
          prizeUrl={prizeUrl}
          isClickable={state.isClickable}
          prefix={prefix}
        />
      </div>
      <RemainTime remainTimes={remain_times} />
      <MyPrizeButton
        url={myPrize}
        myPrizeListUrl={myPrizeListUrl}
        prefix={prefix}
      />
      <RulesButton url={rule} rules={rules} isButtonClickable prefix={prefix} />
      <RollingList winnerList={winnerList} isShow={show_rolling_list} />
      <ContactInfo contactInfo={contact_info} isShow={show_contact_info} />
      <UserInfoModal
        isModalShow={state.IsUserInfoModalShow}
        singleLottery={singleLottery}
        addUserInfoUrl={addUserInfoUrl}
      />
      <ActivityTimeModal startTime={start_time} endTime={end_time} />
    </div>
  )
}

export default LotteryPage
