import React, { FC, useState, useEffect } from 'react';
import store from '../../store';
import { getPicture } from '../../util';
import { Wrapper } from './Styled';
import PersonalInfo from '../PersonalInfo/';
import PersonalSign from '../PersonalSign/';

interface EnrollButtonProps {}

const EnrollButton: FC<EnrollButtonProps> = () => {
  const [state] = store.useRxjsStore();
  const { pollPicture, pollDetail } = state;
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const [enrollBtnPic, setEnrollBtnPic] = useState<string>('');
  const defaultEnrollPic = getPicture(pollPicture, 'enrollBtn');

  // 点击立即参与
  const onClick = () => {
    setIsModalShow(true);
  };

  useEffect(() => {
    if (pollDetail) {
      setEnrollBtnPic(getPicture(pollDetail?.picture ?? [], 'enrollBtn') ?? '');
    }
  }, [pollDetail]);

  return (
    <div>
      <Wrapper>
        <img
          className='buttonImg'
          src={enrollBtnPic || defaultEnrollPic}
          onClick={onClick}
        />
      </Wrapper>
      {isModalShow && (
        <>
          {pollDetail?.sign_slug ? (
            <PersonalInfo
              isSelf
              sign_slug={pollDetail?.sign_slug}
              slug={pollDetail?.slug}
              visible={isModalShow}
              onCancel={() => setIsModalShow(false)}
            />
          ) : (
            <PersonalSign
              slug={pollDetail?.slug}
              visible={isModalShow}
              onCancel={() => setIsModalShow(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EnrollButton;
