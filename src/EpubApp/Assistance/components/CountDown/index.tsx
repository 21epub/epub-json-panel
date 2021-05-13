import React, { FC } from 'react';
import { useCountDown } from 'ahooks';
import { Wrapper } from './Styled';

interface CountDownProp {
  end_time?: string;
}

const CountDown: FC<CountDownProp> = (props) => {
  const { end_time } = props;

  // eslint-disable-next-line
  const [_countdown, _setTargetDate, formattedRes] = useCountDown({
    targetDate: end_time
  });
  const { days, hours, minutes, seconds } = formattedRes;

  // 首页内容
  return (
    <Wrapper>
      <div className='c-div DIV_uOIS6L'>
        <p className='c-paragraph P_3D7UNz'>活动倒计时：</p>
        <p className='c-paragraph P_Pjxaj3'>{days}</p>
        <p className='c-paragraph P_3D7UNz'>天</p>
        <p className='c-paragraph P_Pjxaj3'>{hours}</p>
        <p className='c-paragraph P_3D7UNz'>时</p>
        <p className='c-paragraph P_Pjxaj3'>{minutes}</p>
        <p className='c-paragraph P_3D7UNz'>分</p>
        <p className='c-paragraph P_Pjxaj3'>{seconds}</p>
        <p className='c-paragraph P_3D7UNz'>秒</p>
      </div>
    </Wrapper>
  );
};

export default CountDown;
