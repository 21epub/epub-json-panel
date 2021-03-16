import React, { FC, useState } from 'react'
import { useRequest } from 'ahooks'
import { AddSupporter } from '../../../data/api'
import type {
  AssistanceDetailType,
  ObjectiveDetailType,
  ActivityDetailType,
  SupporterDetailType
} from '../../../type'
import store from '../../../store'

interface AssistanceInfoProps {
  SupporterList: SupporterDetailType[]
  AssistanceDetail: AssistanceDetailType
  ObjectiveDetail: ObjectiveDetailType
  ActivityDetail: ActivityDetailType
  onOpenPopUp: () => void
}

// 助力信息
const AssistanceInfo: FC<AssistanceInfoProps> = (props) => {
  const {
    AssistanceDetail,
    ObjectiveDetail,
    ActivityDetail,
    SupporterList,
    onOpenPopUp
  } = props
  const [canInitOrSupport, setCanInitOrSupport] = useState(
    ActivityDetail.identify_and_can_operate.can_init_or_support
  ) // 是否可以创建助力活动和帮他人助力

  const { run: RunAddSupporter } = useRequest(AddSupporter, {
    manual: true,
    onSuccess: () => {
      onOpenPopUp() // 打开提示弹框
      setCanInitOrSupport(true)
    }
  })

  // 帮TA助力
  const onHelp = () => {
    if (canInitOrSupport) {
      // 帮他助力
      RunAddSupporter(
        AssistanceDetail.slug,
        ObjectiveDetail.slug,
        ActivityDetail.slug
      )
    }
  }

  // 我也参加，跳转到首页，让用户选择商品
  const onJoin = () => {
    store.reducers.ChangePage('HomePage')
  }

  return (
    <div className='block c-div DIV_5eZtqX'>
      <div className='bottom-border c-div LI_735Cot'>
        <div className='c-div DIV_QOQc8O2'>
          <img
            src={ObjectiveDetail.picture}
            alt=''
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className='c-div DIV_WF5y9X'>
          <p className='c-paragraph P_jSOUJu'>{ObjectiveDetail.title}</p>
          <p className='c-paragraph P_75CUYE'>剩余：{ObjectiveDetail.remain}</p>
          <p className='c-paragraph P_75CUYE'>
            已有{ObjectiveDetail.has_participated}人参与
          </p>
          <p className='c-paragraph P_75CUYE'>
            需{ObjectiveDetail.target_score}人助力
          </p>
        </div>
      </div>
      <div className='bottom-border c-div LI_735Cot3'>
        {SupporterList?.map((item: SupporterDetailType) => {
          return (
            <div
              className='c-inlineblock c-imageblock DIV_yIKrnU'
              key={item.slug}
              style={{
                backgroundSize: '100% 100%',
                backgroundPosition: ' 0% 0%',
                backgroundRepeat: 'no-repeat',
                backgroundImage: 'url(' + item.supporter_avatar + ')'
              }}
            />
          )
        })}
        <p className='c-paragraph P_75CUYE4'>
          已有{SupporterList?.length}位好友助力
        </p>
      </div>
      <div className='btn-wrap c-div DIV_PJeoHZ'>
        {!canInitOrSupport ? (
          <a className='btn c-linkblock A_54k3OP2' href='#' onClick={onJoin}>
            <p className='c-paragraph P_j3Tuu52'>我也参加</p>
          </a>
        ) : (
          <a className='btn c-linkblock A_54k3OP' href='#' onClick={onHelp}>
            <p className='c-paragraph P_j3Tuu5'>帮TA助力</p>
          </a>
        )}
      </div>
    </div>
  )
}

export default AssistanceInfo
