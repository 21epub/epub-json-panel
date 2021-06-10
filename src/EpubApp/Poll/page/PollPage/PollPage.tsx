import React, { FC, useEffect, useState } from 'react';
import { useRequest, useUpdateEffect } from 'ahooks';
import type {
  PollApiPropsType,
  PollPictureType,
  PollEventType
} from '../../type';
import { getPicture } from '../../util';
import { queryPollDetail } from '../../data/api';
import store from '../../store';
import { getPollComponent } from '../PollCategory';
import { Wrapper } from './Styled';

export interface PollPageProps {
  pollApiProps: PollApiPropsType;
  pollPicture: PollPictureType;
  pollEvent?: PollEventType;
  isDataChanged?: boolean;
}

const PollPage: FC<PollPageProps> = (props) => {
  const { pollApiProps, pollPicture, pollEvent, isDataChanged } = props;
  const picturePollPic = pollPicture.picturePollPic;
  const { slug } = pollApiProps;
  const [background, setBackground] = useState<string>('');
  const [isShowBackground, setIsShowBackground] = useState<boolean>(true);
  const defaultBackground = getPicture(picturePollPic, 'background');
  const PollComponent = getPollComponent('picturePoll');

  // 查询投票详情接口
  const { data: pollDetail, loading, run: runQueryPollDetail } = useRequest(
    () => queryPollDetail(slug),
    {
      throwOnError: true
    }
  );

  // 配置面板数据变化时，重新加载最新应用详情
  useUpdateEffect(() => {
    runQueryPollDetail();
  }, [isDataChanged]);

  // 请求接口数据
  useEffect(() => {
    store.reducers.setPollApiProps(pollApiProps);
    store.reducers.setPollPicture(picturePollPic);
    store.reducers.setPollEvent(
      pollEvent && { ...pollEvent, runQueryPollDetail }
    );
    if (!loading && pollDetail) {
      store.reducers.setPollDetail(pollDetail);
      setBackground(getPicture(pollDetail?.picture ?? [], 'background') ?? '');
      setIsShowBackground(pollDetail?.show_background_image);
    }
  }, [loading]);

  return (
    <Wrapper
      backgroundImage={isShowBackground ? background || defaultBackground : ''}
    >
      {!loading && <PollComponent />}
    </Wrapper>
  );
};

export default PollPage;
