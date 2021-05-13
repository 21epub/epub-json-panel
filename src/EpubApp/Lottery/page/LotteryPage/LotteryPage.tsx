import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useInViewport } from 'ahooks';
import { DataClient } from '@21epub/epub-data-client';
import { isEmpty } from 'lodash';
import {
  LotteryDetailType,
  LotteryUserInfoType,
  LotteryType,
  LotteryUrlListType,
  LotteryPictureType
} from '../../type';
import { getLotteryComponent } from '../LotteryCategory';
import { UserInfoModal, ActivityTimeModal } from '../../Components';
import { getPictureList, getPicture } from '../../util';
import store from '../../store';
import styles from './index.module.less';

export interface LotteryPageProps {
  lotteryType: LotteryType;
  lotteryUrlList: LotteryUrlListType;
  lotteryPicture: LotteryPictureType;
  isDataChanged: boolean;
}

const LotteryPage: FC<LotteryPageProps> = (props) => {
  const { lotteryType, lotteryUrlList, lotteryPicture, isDataChanged } = props;
  // 获取当前抽奖页面用户是否可见
  const inViewPort = useInViewport(() =>
    document.querySelector('#LotteryPage')
  );
  const {
    prizeListUrl,
    lotteryDetailUrl,
    prizeUrl,
    userInfoUrl,
    winnersUrl
  } = lotteryUrlList;
  const [state] = store.useRxjsStore();
  const { shouldUserInfoModalShow, IsUserInfoModalShow } = state;
  const LotteryComponent = getLotteryComponent(lotteryType);
  const pictureList = getPictureList(lotteryPicture, lotteryType);

  const prizeListClient = useMemo(() => {
    return new DataClient(prizeListUrl);
  }, [prizeListUrl]);

  const lotteryDetailClient = useMemo(() => {
    return new DataClient<LotteryDetailType>(lotteryDetailUrl);
  }, [lotteryDetailUrl]);

  const winnersClient = useMemo(() => {
    return new DataClient(winnersUrl ?? '');
  }, [winnersUrl]);

  const userInfoClient = useMemo(() => {
    return new DataClient<LotteryUserInfoType>(userInfoUrl ?? '');
  }, [userInfoUrl]);

  // 初始，以及预留监听外部修改状态
  useEffect(() => {
    prizeListUrl && prizeListClient.getAll();
    lotteryDetailUrl && lotteryDetailClient.getAll();
    winnersUrl && winnersClient.getAll();
    userInfoUrl && userInfoClient.getAll();
  }, [isDataChanged, lotteryType]);

  const getData = useCallback(() => {
    prizeListUrl && prizeListClient.getAll();
    lotteryDetailUrl && lotteryDetailClient.getAll();
    winnersUrl && winnersClient.getAll();
  }, []);

  const getUser = useCallback(() => {
    userInfoUrl && userInfoClient.getAll();
  }, []);

  const prizeList = prizeListClient.useData();
  const lotteryDetail = lotteryDetailClient.useData()?.[0] ?? {};
  const userInfo = userInfoClient.useData()?.[0];
  const winnerList = winnersClient.useData();

  const {
    start_time,
    end_time,
    show_background_image,
    picture = []
  } = lotteryDetail;
  const background = getPicture(picture, 'background');
  const defaultBackground = getPicture(pictureList, 'background');

  useEffect(() => {
    if (!isEmpty(lotteryDetail)) {
      store.reducers.setLotteryUrlList(lotteryUrlList);
      store.reducers.setLotteryDetail(lotteryDetail);
      store.reducers.setPictureList(pictureList);
      if (userInfo?.user_id === null && lotteryDetail?.need_user_info) {
        store.reducers.setIsUserInfoModalShow(true);
      } else if (userInfo?.user_id === null) {
        store.reducers.setShouldUserInfoModalShow(true);
      } else if (userInfo?.user_id !== null && shouldUserInfoModalShow) {
        store.reducers.setShouldUserInfoModalShow(false);
      }
    }
  }, [userInfo, lotteryDetail]);

  return (
    <div
      id='LotteryPage'
      className={styles.lotteryPageWrap}
      style={{
        backgroundImage: show_background_image
          ? `url(${background || defaultBackground})`
          : ''
      }}
    >
      <LotteryComponent
        winnerList={winnerList}
        prizeList={prizeList}
        userInfo={userInfo}
        prizeUrl={prizeUrl}
        getData={getData}
      />
      {userInfoUrl && inViewPort && (
        <div>
          <UserInfoModal
            isModalShow={IsUserInfoModalShow}
            addUserInfoUrl={userInfoUrl}
            getUser={getUser}
          />
          <ActivityTimeModal startTime={start_time} endTime={end_time} />
        </div>
      )}
    </div>
  );
};

export default LotteryPage;
