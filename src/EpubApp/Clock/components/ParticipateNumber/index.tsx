import React, { FC } from 'react';
import { Wrapper } from './Styled';

interface ParticipateNumberProps {
  number: number;
}

// 参与人数展示
const ParticipateNumber: FC<ParticipateNumberProps> = (props) => {
  const { number } = props;
  return (
    <Wrapper className='participateNumber'>
      当前有<span>{number}</span>人参与打卡
    </Wrapper>
  );
};
export default ParticipateNumber;
