import React, { FC, useState, useEffect } from 'react';
import { useInViewport } from 'ahooks';
import store from '../../store';
import { getPicture } from '../../util';
import { Wrapper } from './Styled';
import RankingModal from './RankingModal';

interface RankingButtonProps {}

const RankingButton: FC<RankingButtonProps> = () => {
  const [state] = store.useRxjsStore();
  const { pollPicture, pollDetail, pollEvent } = state;
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const [rankingBtnPic, setRankingBtnPic] = useState<string>('');
  const defaultRankingBtn = getPicture(pollPicture, 'rankingBtn');
  const inViewPort = useInViewport(() =>
    document.querySelector('#RankingWrapper')
  );

  // 点击显示参赛信息框
  const onClick = () => {
    setIsModalShow(true);
  };

  // 关闭弹窗
  const onCloseModal = () => {
    setIsModalShow(false);
    if (pollEvent && pollEvent.runQueryPollDetail) {
      pollEvent.runQueryPollDetail();
    }
  };

  useEffect(() => {
    if (pollDetail) {
      setRankingBtnPic(
        getPicture(pollDetail?.picture ?? [], 'rankingBtn') ?? ''
      );
    }
  }, [pollDetail]);

  useEffect(() => {
    if (!inViewPort) {
      setIsModalShow(false);
    }
  }, [inViewPort]);

  return (
    <Wrapper id='RankingWrapper'>
      <img
        className='buttonImg'
        src={rankingBtnPic || defaultRankingBtn}
        onClick={onClick}
      />
      {isModalShow && (
        <RankingModal visible={isModalShow} onCloseModal={onCloseModal} />
      )}
    </Wrapper>
  );
};

export default RankingButton;
