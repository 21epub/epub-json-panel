import React, { FC, Fragment, useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import {
  QuerySupporterList,
  QueryObjectiveDetail,
  QueryActivityDetail
} from '../../data/api'
import type { AssistanceDetailType } from '../../type'
import {
  HeadImage,
  CountDown,
  ActivityRules,
  ContactInfo,
  RankingList,
  GoBack,
  PopUpInfo,
  AssistanceProgress
} from '../../components'
import AssistanceInfo from './AssistanceInfo'
import store from '../../store'
import { SavePrevPageNumber } from '../../util'

export interface AssistancePage {
  AssistanceDetail: AssistanceDetailType
  oslug: string
  acslug: string
}

// 帮忙助力页
const AssistancePage: FC<AssistancePage> = (props) => {
  const { AssistanceDetail } = props
  const [state] = store.useRxjsStore()
  const [isPopUp, setIsPopUp] = useState(false)
  const oslug = state.ObjectiveDetail?.slug || props.oslug
  const acslug = state.ActivityDetail?.slug || props.acslug

  // 查询当前活动的助力者列表信息
  const { data: ObjectiveDetail } = useRequest(
    () => QueryObjectiveDetail(AssistanceDetail?.slug, oslug),
    {
      onSuccess: (ObjectiveDetailData) => {
        store.reducers.SetObjectiveDetail(ObjectiveDetailData)
      }
    }
  )

  // 查询最新的活动信息
  const { data: ActivityDetail } = useRequest(
    () => QueryActivityDetail(AssistanceDetail?.slug, oslug, acslug),
    {
      onSuccess: (ActivityDetailData) => {
        store.reducers.SetActivityDetail(ActivityDetailData)
      }
    }
  )

  // 查询当前活动的助力者列表信息
  const { data: SupporterList } = useRequest(() =>
    QuerySupporterList(AssistanceDetail?.slug, oslug, acslug)
  )

  useEffect(() => {
    SavePrevPageNumber('AssistancePage', state.PrevPageNumber)
  }, [])

  return (
    <Fragment>
      <div className='c-div plugin-body'>
        <HeadImage picture={AssistanceDetail.picture} />
        <div className='block-wrap c-div DIV_tzilQM'>
          <CountDown end_time={AssistanceDetail?.end_time} />
          {ActivityDetail && ObjectiveDetail && SupporterList && (
            <Fragment>
              <AssistanceInfo
                AssistanceDetail={AssistanceDetail}
                ActivityDetail={ActivityDetail}
                ObjectiveDetail={ObjectiveDetail}
                SupporterList={SupporterList}
                onOpenPopUp={() => setIsPopUp(true)}
              />
              <AssistanceProgress
                AssistanceDetail={AssistanceDetail}
                ActivityDetail={ActivityDetail}
                ObjectiveDetail={ObjectiveDetail}
                SupporterList={SupporterList}
              />
              <RankingList aslug={AssistanceDetail?.slug} oslug={oslug} />
            </Fragment>
          )}
          <ActivityRules rules={AssistanceDetail?.rules} />
          <ContactInfo contact_info={AssistanceDetail?.contact_info} />
        </div>
      </div>
      <GoBack PageNumber={state.PrevPageNumber} />
      {isPopUp && (
        <PopUpInfo onClose={() => setIsPopUp(false)} value='已帮他助力成功' />
      )}
    </Fragment>
  )
}

export default AssistancePage
