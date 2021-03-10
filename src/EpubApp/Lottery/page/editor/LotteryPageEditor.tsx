import React, { useEffect, useMemo } from 'react'
import styles from '../index.module.less'
import { DataClient } from '@21epub/epub-data-client'
import { SingleLotteryProps } from '../../type'
import {
  ActivityTime,
  RemainTime,
  RulesButton,
  BackgroundPic,
  ContactInfo,
  RollingList,
  MyPrizeButtonEditor
} from '../../Components'
import TurntableEditor from '../../LotteryCategory/Turntable/editor/TurntableEditor'

interface Props {
  isDataChanged: boolean
  prizeListUrl: string
  singleLotteryUrl: string
  prefix: string
}

const LotteryPageEditor = ({
  isDataChanged,
  prizeListUrl,
  singleLotteryUrl,
  prefix
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
  }, [isDataChanged])

  const prizeList = prizeListClient.useData()
  const singleLottery = singleLotteryClient.useData()

  if (singleLottery?.length) {
    const winnerList = 'editor'
    const {
      start_time: startTime,
      end_time: endTime,
      remain_times: remainTime,
      show_background_image: isBgShow,
      show_contact_info: isContactInfoShow,
      show_rolling_list: isWinnerListShow,
      contact_info: contactInfo
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
          <TurntableEditor
            pointerUrl={pointerUrl}
            turntableUrl={turntableUrl}
            prizeList={prizeList}
            prefix={prefix}
          />
        </div>
        <RemainTime remainTimes={remainTime} />
        <MyPrizeButtonEditor url={myPrizeUrl} prefix={prefix} />
        <RulesButton url={ruleUrl} isButtonClickable={false} prefix={prefix} />
        <RollingList winnerList={winnerList} isShow={isWinnerListShow} />
        <ContactInfo contactInfo={contactInfo} isShow={isContactInfoShow} />
      </div>
    )
  } else {
    return <div />
  }
}

export default LotteryPageEditor
