import React, { FC, Fragment, useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import { QueryActivityDetail, QuerySupporterList } from '../../data/api'
import type { AssistanceDetailType } from '../../type'
// 引入各组件
import {
  HeadImage,
  CountDown,
  ActivityRules,
  ContactInfo,
  RankingList,
  GoBack,
  PopUpInfo,
  AssistanceProgress,
  SignUpInfo
} from '../../components'
import MyAssistanceInfo from './MyAssistanceInfo'
import store from '../../store'
import { SavePrevPageNumber } from '../../util'

interface MyAssistancePageProps {
  AssistanceDetail: AssistanceDetailType
  urlKey: string
}

// 助力目标详情页
const MyAssistancePage: FC<MyAssistancePageProps> = (props) => {
  const { AssistanceDetail, urlKey } = props
  const [state] = store.useRxjsStore()
  const { ObjectiveDetail } = state // 获取保存的状态
  const [isPopUp, setIsPopUp] = useState(false)
  const [isSignUp, setSignUp] = useState(false)

  // 查询最新的活动信息
  const { data: ActivityDetail } = useRequest(
    () =>
      QueryActivityDetail(
        AssistanceDetail?.slug,
        ObjectiveDetail?.slug!,
        state.ActivityDetail?.slug!
      ),
    {
      onSuccess: (ActivityDetailData) => {
        store.reducers.SetActivityDetail(ActivityDetailData)
      }
    }
  )

  // 查询当前活动的助力者列表信息
  const { data: SupporterList } = useRequest(() =>
    QuerySupporterList(
      AssistanceDetail?.slug,
      ObjectiveDetail?.slug!,
      state.ActivityDetail?.slug!
    )
  )

  useEffect(() => {
    SavePrevPageNumber('MyAssistancePage', state.PrevPageNumber)
  }, [])

  return (
    <Fragment>
      <div className='c-div plugin-body'>
        <HeadImage picture={AssistanceDetail?.picture} />
        <div className='block-wrap c-div DIV_tzilQM'>
          <CountDown end_time={AssistanceDetail?.end_time} />
          {ActivityDetail && ObjectiveDetail && SupporterList && (
            <Fragment>
              <MyAssistanceInfo
                ActivityDetail={ActivityDetail}
                ObjectiveDetail={ObjectiveDetail}
                SupporterList={SupporterList}
                urlKey={urlKey}
                onOpenPopUp={() => setIsPopUp(true)}
                onOpenSingUp={() => setSignUp(true)}
              />
              <AssistanceProgress
                AssistanceDetail={AssistanceDetail}
                ActivityDetail={ActivityDetail}
                ObjectiveDetail={ObjectiveDetail}
                SupporterList={SupporterList}
              />
              <RankingList
                aslug={AssistanceDetail?.slug}
                oslug={ObjectiveDetail?.slug}
              />
            </Fragment>
          )}
          <ActivityRules rules={AssistanceDetail?.rules} />
          <ContactInfo contact_info={AssistanceDetail?.contact_info} />
        </div>
      </div>
      <GoBack PageNumber={state.PrevPageNumber} />
      {isPopUp && (
        <PopUpInfo
          onClose={() => setIsPopUp(false)}
          value='点击右上角分享邀请好友'
        />
      )}
      {isSignUp && (
        <SignUpInfo
          AssistanceDetail={AssistanceDetail}
          ObjectiveDetail={ObjectiveDetail!}
          onClose={() => setSignUp(false)}
        />
      )}
    </Fragment>
  )
}

export default MyAssistancePage
