import React, { FC, useState, useEffect, Fragment } from 'react';
import store from '../../store';
import { getPicture } from '../../util';
import { Wrapper } from './Styled';
import PersonalInfo from '../PersonalInfo';
import PersonalSign from '../PersonalSign';
import { message } from 'antd';

interface EnrollButtonProps {}

const EnrollButton: FC<EnrollButtonProps> = () => {
  const [state] = store.useRxjsStore();
  const { pollPicture, pollDetail } = state;
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const [enrollBtnPic, setEnrollBtnPic] = useState<string>('');
  const defaultEnrollPic = getPicture(pollPicture, 'enrollBtn');

  // 点击立即参与
  const onClick = () => {
    if (pollDetail?.status === 1) {
      message.error('活动未开始，请稍后再试');
    } else if (pollDetail?.status === 2) {
      setIsModalShow(true);
    } else if (pollDetail?.status === 3) {
      message.error('活动已结束，谢谢参与');
    }
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
        <Fragment>
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
        </Fragment>
      )}
    </div>
  );
};

export default EnrollButton;
