import React, { FC, useState, useEffect } from 'react';
import ErrorPrompt from '../ErrorPrompt';
import { getEndTime } from '../../util';

interface CountDownProp {
  end_time: string;
}

const CountDown: FC<CountDownProp> = (props) => {
  const { end_time } = props;
  const [remainTime, setRemainTime] = useState<number[]>([]); // 倒计时剩余时间

  useEffect(() => {
    // 打开页面时开启计时器
    const time = window.setInterval(() => {
      const endTime = getEndTime(end_time);
      if (endTime) {
        setRemainTime(endTime);
      } else {
        ErrorPrompt('活动已结束');
        window.clearInterval(time); //  清除定时器
        setRemainTime([0, 0, 0, 0]);
      }
    }, 1000); // 倒计时
    return () => {
      window.clearInterval(time); // 卸载组件时清除定时器
    };
  }, []);

  // 首页内容
  return (
    <div className='block c-div DIV_5eZtqX'>
      <div className='c-div DIV_uOIS6L'>
        <p className='c-paragraph P_3D7UNz'>活动倒计时：</p>
        <p className='c-paragraph P_Pjxaj3'>{remainTime[0]}</p>
        <p className='c-paragraph P_3D7UNz'>天</p>
        <p className='c-paragraph P_Pjxaj3'>{remainTime[1]}</p>
        <p className='c-paragraph P_3D7UNz'>时</p>
        <p className='c-paragraph P_Pjxaj3'>{remainTime[2]}</p>
        <p className='c-paragraph P_3D7UNz'>分</p>
        <p className='c-paragraph P_Pjxaj3'>{remainTime[3]}</p>
        <p className='c-paragraph P_3D7UNz'>秒</p>
      </div>
    </div>
  );
};

export default CountDown;
