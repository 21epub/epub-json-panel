import React, { FC } from 'react';
import { Progress } from 'antd';
import { useCountDown } from 'ahooks';
import type {
  ObjectiveDetailType,
  ActivityDetailType,
  SupporterDetailType,
  AssistanceDetailType
} from '../../type';
import { statusMap } from '../../type';
import { Wrapper } from './Styled';

interface AssistanceProgressProps {
  AssistanceDetail: AssistanceDetailType;
  SupporterList: SupporterDetailType[];
  ObjectiveDetail: ObjectiveDetailType;
  ActivityDetail: ActivityDetailType;
}

// 助力进度模块
const AssistanceProgress: FC<AssistanceProgressProps> = (props) => {
  const {
    AssistanceDetail,
    SupporterList,
    ObjectiveDetail,
    ActivityDetail
  } = props;

  // eslint-disable-next-line
  const [_countdown, _setTargetDate, formattedRes] = useCountDown({
    targetDate: AssistanceDetail?.end_time
  });
  const { days, hours, minutes, seconds } = formattedRes;

  // 首页内容
  return (
    <Wrapper>
      <div className='c-div DIV_sVS1zF'>
        <i className='fa fa-bolt c-icon' />
        <p className='c-paragraph P_PedtjQ'>
          助力进度：{statusMap[ActivityDetail?.status]}
        </p>
      </div>
      <div className='bottom-border c-div DIV_uOIS6L'>
        <p className='c-paragraph P_3D7UNz'>助力倒计时：</p>
        <p className='c-paragraph P_Pjxaj3'>{days}</p>
        <p className='c-paragraph P_3D7UNz'>天</p>
        <p className='c-paragraph P_Pjxaj3'>{hours}</p>
        <p className='c-paragraph P_3D7UNz'>时</p>
        <p className='c-paragraph P_Pjxaj3'>{minutes}</p>
        <p className='c-paragraph P_3D7UNz'>分</p>
        <p className='c-paragraph P_Pjxaj3'>{seconds}</p>
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
          );
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
    </Wrapper>
  );
};

export default AssistanceProgress;
