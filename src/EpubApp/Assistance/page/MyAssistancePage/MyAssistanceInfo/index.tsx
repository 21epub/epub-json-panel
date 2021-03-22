import React, { FC } from 'react'
// import { setShareLink } from 'interaction_view/modules/sharelink';
import type {
  ActivityDetailType,
  ObjectiveDetailType,
  SupporterDetailType
} from '../../../type'
import { statusMap } from '../../../type'
// import { parseLinkArgs } from '../../../util'

interface MyAssistanceInfoProps {
  ActivityDetail: ActivityDetailType
  ObjectiveDetail: ObjectiveDetailType
  SupporterList: SupporterDetailType[]
  urlKey: string
  onOpenPopUp: () => void
  onOpenSingUp: () => void
}

const MyAssistanceInfo: FC<MyAssistanceInfoProps> = (
  props: MyAssistanceInfoProps
) => {
  const {
    ActivityDetail,
    ObjectiveDetail,
    SupporterList,
    // urlKey,
    onOpenPopUp,
    onOpenSingUp
  } = props

  // 点击邀请好友
  const onInvitation = () => {
    // let args: argsType = {
    //   key: urlKey,
    //   value: encodeURIComponent(
    //     'Objective=' + ObjectiveDetail.slug + '&Activity=' + ActivityDetail.slug,
    //   ),
    // };
    // let message_link: string = parseLinkArgs(window.message_link, args);
    // setShareLink(message_link);
    // console.log(message_link);
    // interaction_view.weixin.share();
    onOpenPopUp() // 打开提示弹框
  }

  // 助力成功打开填写信息窗口
  const onReviseInfo = () => {
    onOpenSingUp()
  }

  // 首页内容
  return (
    <div className='block c-div DIV_5eZtqX'>
      <div className='bottom-border c-div LI_735Cot'>
        <div className='c-div DIV_QOQc8O2'>
          <img
            src={ObjectiveDetail?.picture}
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
        {statusMap[ActivityDetail?.status] === '已完成' ? (
          <a
            className='btn c-linkblock A_54k3OP2'
            href='#'
            onClick={onReviseInfo}
          >
            <p className='c-paragraph P_j3Tuu52'>您已助力成功，完善联系信息</p>
          </a>
        ) : (
          <a
            className='btn c-linkblock A_54k3OP'
            href='#'
            onClick={onInvitation}
          >
            <p className='c-paragraph P_j3Tuu5'>邀请好友</p>
          </a>
        )}
      </div>
    </div>
  )
}

export default MyAssistanceInfo
