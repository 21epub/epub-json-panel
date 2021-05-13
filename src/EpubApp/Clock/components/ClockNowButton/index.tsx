import React, { FC } from 'react';
import { Modal } from 'antd';
import store from '../../store';
import { getPicture } from '../../util';
import { Wrapper } from './Styled';

interface ClockNowButtonProps {}

const ClockNowButton: FC<ClockNowButtonProps> = (props) => {
  const [state] = store.useRxjsStore();
  const { pictureList } = state;
  const clockNow = getPicture([], 'clockNow');
  const defaultClockNow = getPicture(pictureList, 'clockNow');
  const clockNowButtonPic = clockNow || defaultClockNow;

  // 点击立即打卡
  const onClick = () => {
    Modal.success({
      title: '打卡成功',
      content: '恭喜您签到成功',
      onOk() {}
    });
  };

  return (
    <Wrapper className='clockNowButton'>
      <img
        className='clockNowButtonImg'
        src={clockNowButtonPic}
        onClick={onClick}
      />
    </Wrapper>
  );
};

export default ClockNowButton;
