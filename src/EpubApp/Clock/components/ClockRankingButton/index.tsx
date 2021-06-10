import React, { FC, useState, useEffect } from 'react';
import RankingModal from './RankingModal';
import store from '../../store';
import { getPicture } from '../../util';
import { Wrapper } from './Styled';

interface ClockRankingButtonProps {}

const ClockRankingButton: FC<ClockRankingButtonProps> = (props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [clockRankingPic, setClockRankingPic] = useState<string>('');
  const [state] = store.useRxjsStore();
  const { pictureList, clockDetail } = state;
  const defaultClockRankingPic = getPicture(pictureList, 'clockRanking');

  const onClick = () => {
    setVisibleModal(true);
  };

  const onCloseModal = () => {
    setVisibleModal(false);
  };

  useEffect(() => {
    if (clockDetail) {
      setClockRankingPic(
        getPicture(clockDetail?.picture ?? [], 'clockRanking') ?? ''
      );
    }
  }, [clockDetail]);

  return (
    <Wrapper className='clockRankingButton'>
      <img
        className='clockRankingButtonImg'
        src={clockRankingPic || defaultClockRankingPic}
        onClick={onClick}
      />
      <RankingModal
        title='签到排行'
        okText='确认'
        cancelText='取消'
        zIndex={1040}
        destroyOnClose
        visible={visibleModal}
        onCloseModal={onCloseModal}
      />
    </Wrapper>
  );
};

export default ClockRankingButton;
