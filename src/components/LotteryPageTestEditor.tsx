import React, { useEffect, useMemo } from 'react'
import styles from './index.module.less'
import { DataClient } from '@21epub/epub-data-client'
import { SingleLotteryProps } from './types'
import ActivityTime from './activityInfo/ActivityTime'
import RemainTime from './activityInfo/RemainTime'
import RulesButton from './activityInfo/RulesButton'
import HeadPic from './activityInfo/HeadPic'
import BackgroundPic from './activityInfo/BackgroundPic'
import ContactInfo from './activityInfo/ContactInfo'
import RollingList from './activityInfo/RollingList'
import MyPrizeButtonEditor from './activityInfo/editor/MyPrizeButtonEditor'
import TurntableEditor from './turntable/editor/TurntableEditor'

interface Props {
  isDataChanged: boolean
  prizeListUrl: string
  singleLotteryUrl: string
}

const LotteryPageTestEditor = ({
  isDataChanged,
  prizeListUrl,
  singleLotteryUrl
}: Props) => {
  const prizeListClient = useMemo(() => {
    const client = new DataClient(prizeListUrl)
    return client
  }, [prizeListUrl])

  const singleLotteryClient = useMemo(() => {
    const client = new DataClient<SingleLotteryProps>(singleLotteryUrl)
    return client
  }, [singleLotteryUrl])

  useEffect(() => {
    prizeListClient.getAll()
    singleLotteryClient.getAll()
  }, [isDataChanged, prizeListUrl, singleLotteryUrl])

  const prizeList = prizeListClient.useData()
  const singleLottery = singleLotteryClient.useData()

  if (singleLottery?.length) {
    const winnerList = 'test'
    const startTime = singleLottery[0].start_time
    const endTime = singleLottery[0].end_time
    const remainTime = singleLottery[0].remain_times
    const headUrl = singleLottery[0]._picture.head
    const backgroundUrl = singleLottery[0]._picture.background
    const pointerUrl = singleLottery[0]._picture.pointer
    const turntableUrl = singleLottery[0]._picture.turntable
    const isBgShow = singleLottery[0].show_background_image
    const isContactInfoShow = singleLottery[0].show_contact_info
    const isWinnerListShow = singleLottery[0].show_rolling_list
    const contactInfo = singleLottery[0].contact_info

    return (
      <div className={styles.lotteryPageWrap}>
        <BackgroundPic url={backgroundUrl} isShow={isBgShow} />
        <HeadPic url={headUrl} />
        <ActivityTime startTime={startTime} endTime={endTime} />
        <div className='turntableWrap'>
          <TurntableEditor
            pointerUrl={pointerUrl}
            turntableUrl={turntableUrl}
            prizeList={prizeList}
          />
        </div>
        <RemainTime remainTimes={remainTime} />
        <MyPrizeButtonEditor />
        <RulesButton isButtonClickable={false} />
        <RollingList winnerList={winnerList} isShow={isWinnerListShow} />
        <ContactInfo contactInfo={contactInfo} isShow={isContactInfoShow} />
      </div>
    )
  } else {
    return <div />
  }
}

export default LotteryPageTestEditor
