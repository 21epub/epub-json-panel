import React, { FC, useState } from 'react';
import RankingModal from './RankingModal';
import store from '../../store';
import { getPicture } from '../../util';
import { Wrapper } from './Styled';

interface ClockRankingButtonProps {}

const ClockRankingButton: FC<ClockRankingButtonProps> = (props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [state] = store.useRxjsStore();
  const { pictureList } = state;
  const clockRanking = getPicture([], 'clockRanking');
  const defaultClockRanking = getPicture(pictureList, 'clockRanking');
  const clockRankingButtonPic = clockRanking || defaultClockRanking;

  const onClick = () => {
    setVisibleModal(true);
  };

  const onCloseModal = () => {
    setVisibleModal(false);
  };

  return (
    <Wrapper className='clockRankingButton'>
      <img
        className='clockRankingButtonImg'
        src={clockRankingButtonPic}
        onClick={onClick}
      />
      <RankingModal
        title='签到排行'
        okText='确认'
        cancelText='取消'
        zIndex={1040}
        destroyOnClose
        getContainer={false}
        visible={visibleModal}
        onCloseModal={onCloseModal}
      />
    </Wrapper>
  );
};

export default ClockRankingButton;
