import React, { FC } from 'react'
import type { ObjectiveDetailType } from '../../../type'

interface ObjectiveDetailProps {
  ObjectiveDetail: ObjectiveDetailType
  onPartake: () => void
}

// 助力目标详情页
const ObjectiveDetail: FC<ObjectiveDetailProps> = (props) => {
  const { ObjectiveDetail, onPartake } = props

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
      <div className='c-div DIV_PJeoHZ'>
        <a className='btn c-linkblock A_54k3OP' href='#' onClick={onPartake}>
          <p className='c-paragraph P_j3Tuu5'>我要参与</p>
        </a>
      </div>
    </div>
  )
}

export default ObjectiveDetail
