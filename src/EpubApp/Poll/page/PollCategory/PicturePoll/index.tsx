import React, { FC } from 'react';
import { Space } from 'antd';
import {
  CountDownZone,
  EnrollButton,
  RankingButton,
  RemainingTimes
} from '../../../components';
import store from '../../../store';
import { Wrapper } from './Styled';

export interface PicturePollProps {}

// 图片投票
const PicturePoll: FC<PicturePollProps> = (props) => {
  const [state] = store.useRxjsStore();
  const { pollDetail } = state;

  return (
    <Wrapper>
      <CountDownZone pollDetail={pollDetail} />
      <RemainingTimes
        poll_rule={pollDetail?.poll_rule}
        remainTimes={pollDetail?.remain_times}
      />
      <Space size='large'>
        <EnrollButton />
        <RankingButton />
      </Space>
    </Wrapper>
  );
};

export default PicturePoll;
