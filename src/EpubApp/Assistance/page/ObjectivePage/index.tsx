import React, { FC, useState, Fragment, useEffect } from 'react'
import { QueryObjectiveDetail } from '../../data/api'
import type { AssistanceDetailType } from '../../type'
import { useRequest } from 'ahooks'
import {
  HeadImage,
  CountDown,
  ActivityRules,
  ContactInfo,
  RankingList,
  GoBack,
  SignUpInfo
} from '../../components'
import ObjectiveDetails from './ObjectiveDetail'
import store from '../../store'
import { SavePrevPageNumber } from '../../util'

interface ObjectivePageProps {
  AssistanceDetail: AssistanceDetailType
}

// 助力目标详情页
const ObjectivePage: FC<ObjectivePageProps> = (props) => {
  const { AssistanceDetail } = props
  const [state] = store.useRxjsStore()
  const [isSignUp, setSignUp] = useState(false)
  // 查询最新的目标详情
  const { data: ObjectiveDetail } = useRequest(
    QueryObjectiveDetail(AssistanceDetail?.slug, state.ObjectiveDetail?.slug!)
  )

  useEffect(() => {
    SavePrevPageNumber('ObjectivePage', state.PrevPageNumber)
  }, [])

  return ObjectiveDetail ? (
    <Fragment>
      <div className='c-div plugin-body'>
        <HeadImage picture={AssistanceDetail?.picture} />
        <div className='block-wrap c-div DIV_tzilQM'>
          <CountDown end_time={AssistanceDetail?.end_time} />
          <ObjectiveDetails
            ObjectiveDetail={ObjectiveDetail}
            onPartake={() => {
              setSignUp(true)
            }}
          />
          <RankingList
            aslug={AssistanceDetail?.slug}
            oslug={ObjectiveDetail?.slug}
          />
          <ActivityRules rules={AssistanceDetail?.rules} />
          <ContactInfo contact_info={AssistanceDetail?.contact_info} />
        </div>
      </div>
      <GoBack PageNumber={state.PrevPageNumber} />
      {isSignUp && (
        <SignUpInfo
          AssistanceDetail={AssistanceDetail}
          ObjectiveDetail={ObjectiveDetail}
          onClose={() => setSignUp(false)}
        />
      )}
    </Fragment>
  ) : null
}

export default ObjectivePage
