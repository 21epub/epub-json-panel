import React, { useEffect, useMemo } from 'react'
import styles from './index.module.less'
import { useDispatch, useSelector } from 'react-redux'
import { DataClient } from '@21epub/epub-data-client'
import { SingleLotteryProps, UserInfo } from './types'
import ActivityTime from './activityInfo/ActivityTime'
import RemainTime from './activityInfo/RemainTime'
import MyPrizeButton from './activityInfo/MyPrizeButton'
import RulesButton from './activityInfo/RulesButton'
import HeadPic from './activityInfo/HeadPic'
import BackgroundPic from './activityInfo/BackgroundPic'
import ContactInfo from './activityInfo/ContactInfo'
import Turntable from './turntable/Turntable'
import UserInfoModal from './activityInfo/UserInfoModal'
import RollingList from './activityInfo/RollingList'
import ActivityTimeModal from './activityInfo/ActivityTimeModal'

interface Props {
  isDataChanged: boolean
  prizeListUrl: string
  prizeUrl: string
  singleLotteryUrl: string
  myPrizeListUrl: string
  addUserInfoUrl: string
  queryUserInfoUrl: string
  winnersUrl: string
}

const LotteryPageTest = ({
  isDataChanged,
  prizeListUrl,
  prizeUrl,
  singleLotteryUrl,
  myPrizeListUrl,
  addUserInfoUrl,
  queryUserInfoUrl,
  winnersUrl
}: Props) => {
  const state = useSelector((state: any) => state) // 获取保存的状态
  const dispatch = useDispatch()
  console.log(state.isRotate, 'isRotate')
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

  useEffect(() => {
    prizeListClient.getAll()
    singleLotteryClient.getAll()
    winnersClient.getAll()
    userInfoClient.getAll()
  }, [
    state.stateChange,
    isDataChanged,
    prizeListUrl,
    singleLotteryUrl,
    winnersUrl,
    queryUserInfoUrl
  ])

  const prizeList = prizeListClient.useData()
  const singleLottery = singleLotteryClient.useData()
  const userInfo = userInfoClient.useData()

  useEffect(() => {
    if (singleLottery?.length && userInfo?.length) {
      if (userInfo[0].user_id === null && singleLottery[0].need_user_info) {
        dispatch({ type: 'shouldUserInfoModalShow', value: true })
      }
    }
  }, [userInfo, singleLottery])

  if (singleLottery?.length && userInfo?.length) {
    const winnerList = 'test'
    const startTime = singleLottery[0].start_time
    const endTime = singleLottery[0].end_time
    const remainTime = singleLottery[0].remain_times
    const rules = singleLottery[0].rules
    const headUrl = singleLottery[0]?._picture?.head
    const backgroundUrl = singleLottery[0]?._picture?.background
    const pointerUrl = singleLottery[0]?._picture?.pointer
    const turntableUrl = singleLottery[0]?._picture?.turntable
    const isBgShow = singleLottery[0]?.show_background_image
    const isContactInfoShow = singleLottery[0]?.show_contact_info
    const isWinnerListShow = singleLottery[0]?.show_rolling_list
    const contactInfo = singleLottery[0]?.contact_info
    return (
      <div className={styles.lotteryPageWrap}>
        <BackgroundPic url={backgroundUrl} isShow={isBgShow} />
        <HeadPic url={headUrl} />
        <ActivityTime startTime={startTime} endTime={endTime} />
        <div className='turntableWrap'>
          <Turntable
            pointerUrl={pointerUrl}
            turntableUrl={turntableUrl}
            prizeList={prizeList}
            userInfo={userInfo}
            singleLottery={singleLottery}
            prizeUrl={prizeUrl}
            prize={state.prize}
            isRotate={state.isRotate}
            isClickable={state.isClickable}
          />
        </div>
        <RemainTime remainTimes={remainTime} />
        <MyPrizeButton
          myPrizeListUrl={myPrizeListUrl}
          isDataChange={state.stateChange}
        />
        <RulesButton rules={rules} isButtonClickable />
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

export default LotteryPageTest
