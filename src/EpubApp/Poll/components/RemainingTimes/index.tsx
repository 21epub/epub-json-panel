import React, { FC } from 'react';
import { Wrapper } from './Styled';

interface RemainingTimesProps {
  remainTimes?: number | -1;
  poll_rule?: number | -1;
}

const RemainingTimes: FC<RemainingTimesProps> = (props) => {
  const { remainTimes, poll_rule } = props;
  return (
    <Wrapper>
      <span>
        {remainTimes !== -1 &&
          `${poll_rule ? '今日' : '本次活动'} 您还剩余${remainTimes}次投票机会`}
      </span>
    </Wrapper>
  );
};

export default RemainingTimes;
