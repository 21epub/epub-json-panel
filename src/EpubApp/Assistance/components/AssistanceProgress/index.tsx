import React, { FC, useState, useEffect } from 'react'
import { Progress } from 'antd'
import type {
  AssistanceDetailType,
  ObjectiveDetailType,
  ActivityDetailType,
  SupporterDetailType
} from '../../type'
import { statusMap } from '../../page/MyAssistancePage'
import ErrorPrompt from '../ErrorPrompt'
import { getEndTime } from '../../util'
import 'antd/dist/antd.css'

interface AssistanceProgressProps {
  SupporterList: SupporterDetailType[]
  AssistanceDetail: AssistanceDetailType
  ObjectiveDetail: ObjectiveDetailType
  ActivityDetail: ActivityDetailType
}

// 助力进度模块
const AssistanceProgress: FC<AssistanceProgressProps> = (props) => {
  const {
    AssistanceDetail,
    ObjectiveDetail,
    ActivityDetail,
    SupporterList
  } = props
  const [remainTime, setRemainTime] = useState<number[]>([]) // 倒计时剩余时间

  // 助力倒计时
  useEffect(() => {
    const time = window.setInterval(() => {
      const endTime = getEndTime(AssistanceDetail?.end_time)
      if (endTime) {
        setRemainTime(endTime)
      } else {
        ErrorPrompt('活动已结束')
        window.clearInterval(time) //  清除定时器
        setRemainTime([0, 0, 0, 0])
      }
    }, 1000) // 倒计时
    return () => {
      window.clearInterval(time) // 卸载组件时清除定时器
    }
  }, [])

  // 首页内容
  return (
    <div className='block c-div DIV_5eZtqX'>
      <div className='c-div DIV_sVS1zF'>
        <i className='fa fa-bolt c-icon' />
        <p className='c-paragraph P_PedtjQ'>
          助力进度：{statusMap[ActivityDetail?.status]}
        </p>
      </div>
      <div className='bottom-border c-div DIV_uOIS6L'>
        <p className='c-paragraph P_3D7UNz'>助力倒计时：</p>
        <p className='c-paragraph P_Pjxaj3'>{remainTime[0]}</p>
        <p className='c-paragraph P_3D7UNz'>天</p>
        <p className='c-paragraph P_Pjxaj3'>{remainTime[1]}</p>
        <p className='c-paragraph P_3D7UNz'>时</p>
        <p className='c-paragraph P_Pjxaj3'>{remainTime[2]}</p>
        <p className='c-paragraph P_3D7UNz'>分</p>
        <p className='c-paragraph P_Pjxaj3'>{remainTime[3]}</p>
        <p className='c-paragraph P_3D7UNz'>秒</p>
      </div>
      <div className='c-div LI_735Cot3'>
        {SupporterList.map((item: SupporterDetailType) => {
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
      </div>
      <div className='c-div DIV_PJeoHZ'>
        <div className='c-vcomponent'>
          <div id='e_d0a3fd46'>
            <Progress
              percent={parseFloat(
                (
                  (SupporterList?.length / ObjectiveDetail?.target_score) *
                  100
                ).toFixed(0)
              )}
              status='active'
            />
          </div>
        </div>
        <div className='c-div DIV_X5B0Gy'>
          <span>0</span>
          <span>{ObjectiveDetail?.target_score}人</span>
        </div>
      </div>
    </div>
  )
}

export default AssistanceProgress
