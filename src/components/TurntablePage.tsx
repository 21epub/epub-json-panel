import React, { useCallback, useEffect, useMemo } from 'react'
import styles from './index.module.less'
import { useDispatch, useSelector } from 'react-redux'
import { DataClient } from '@21epub/epub-data-client'
import { SingleLotteryProps, UserInfo } from './types'
import ActivityTime from './activityInfo/ActivityTime'
import RemainTime from './activityInfo/RemainTime'
import MyPrizeButton from './activityInfo/MyPrizeButton'
import RulesButton from './activityInfo/RulesButton'
import BackgroundPic from './activityInfo/BackgroundPic'
import ContactInfo from './activityInfo/ContactInfo'
import Turntable from './turntable/Turntable'
import UserInfoModal from './activityInfo/UserInfoModal'
import RollingList from './activityInfo/RollingList'
import ActivityTimeModal from './activityInfo/ActivityTimeModal'
import { AppBus } from './event-bus/event'

interface Props {
  isDataChanged: boolean
  prizeListUrl: string
  prizeUrl: string
  singleLotteryUrl: string
  myPrizeListUrl: string
  addUserInfoUrl: string
  queryUserInfoUrl: string
  winnersUrl: string
  prefix: string
}

const TurntablePage = ({
  isDataChanged,
  prizeListUrl,
  prizeUrl,
  singleLotteryUrl,
  myPrizeListUrl,
  addUserInfoUrl,
  queryUserInfoUrl,
  winnersUrl,
  prefix
}: Props) => {
  const state = useSelector((state: any) => state) // 获取保存的状态
  const dispatch = useDispatch()

  const prizeListClient = useMemo(() => {
    const client = new DataClient(prizeListUrl)
    return client
  }, [prizeListUrl])

  const singleLotteryClient = useMemo(() => {
    const client = new DataClient<SingleLotteryProps>(singleLotteryUrl)
    return client
  }, [singleLotteryUrl])

  const winnersClient = useMemo(() => {
    const client = new DataClient(winnersUrl)
    return client
  }, [winnersUrl])

  const userInfoClient = useMemo(() => {
    const client = new DataClient<UserInfo>(queryUserInfoUrl)
    return client
  }, [queryUserInfoUrl])

  // 初始，以及预留监听外部修改状态
  useEffect(() => {
    prizeListClient.getAll()
    singleLotteryClient.getAll()
    winnersClient.getAll()
    userInfoClient.getAll()
  }, [isDataChanged])

  const getData = useCallback(() => {
    prizeListClient.getAll()
    singleLotteryClient.getAll()
    winnersClient.getAll()
    userInfoClient.getAll()
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

  if (singleLottery?.length && userInfo?.length) {
    const {
      start_time: startTime,
      end_time: endTime,
      remain_times: remainTime,
      show_background_image: isBgShow,
      show_contact_info: isContactInfoShow,
      show_rolling_list: isWinnerListShow,
      contact_info: contactInfo,
      rules
    } = singleLottery[0]

    const backgroundUrl = singleLottery[0]?.picture?.background
    const pointerUrl = singleLottery[0]?.picture?.pointer
    const turntableUrl = singleLottery[0]?.picture?.turntable
    const myPrizeUrl = singleLottery[0]?.picture?.myPrize
    const ruleUrl = singleLottery[0]?.picture?.rule

    return (
      <div className={styles.lotteryPageWrap}>
        <BackgroundPic url={backgroundUrl} isShow={isBgShow} prefix={prefix} />
        <ActivityTime startTime={startTime} endTime={endTime} />
        <div className='turntableWrap'>
          <Turntable
            pointerUrl={pointerUrl}
            turntableUrl={turntableUrl}
            prizeList={prizeList}
            userInfo={userInfo}
            singleLottery={singleLottery}
            prizeUrl={prizeUrl}
            isClickable={state.isClickable}
            prefix={prefix}
          />
        </div>
        <RemainTime remainTimes={remainTime} />
        <MyPrizeButton
          url={myPrizeUrl}
          myPrizeListUrl={myPrizeListUrl}
          prefix={prefix}
        />
        <RulesButton
          url={ruleUrl}
          rules={rules}
          isButtonClickable
          prefix={prefix}
        />
        <RollingList winnerList={winnerList} isShow={isWinnerListShow} />
        <ContactInfo contactInfo={contactInfo} isShow={isContactInfoShow} />
        <UserInfoModal
          isModalShow={state.IsUserInfoModalShow}
          singleLottery={singleLottery}
          addUserInfoUrl={addUserInfoUrl}
        />
        <ActivityTimeModal startTime={startTime} endTime={endTime} />
      </div>
    )
  } else {
    return <div />
  }
}

export default TurntablePage
