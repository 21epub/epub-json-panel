import React, { FC } from 'react';
import { Wrapper } from './Styled';

interface ClockRecordProps {
  totalNum: number;
  continuousNum: number;
}

// 签到记录统计
const ClockRecord: FC<ClockRecordProps> = (props) => {
  const { totalNum, continuousNum } = props;
  return (
    <Wrapper className='clockRecord'>
      您已累计签到<span>{totalNum}</span>天，已连续签到
      <span>{continuousNum}</span>天
    </Wrapper>
  );
};
export default ClockRecord;
