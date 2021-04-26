import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataClient } from '@21epub/epub-data-client';
import { isEmpty } from 'lodash';
import {
  LotteryDetailType,
  UserInfoType,
  LotteryType,
  LotteryUrlListType,
  LotteryPictureType
} from '../../type';
import { getLotteryComponent } from '../LotteryCategory';
import { UserInfoModal, ActivityTimeModal } from '../../Components';
import { getPictureList, getPicture } from '../../util';
import styles from './index.module.less';
import { StateType } from '../../store/reducer';

export interface LotteryPageProps {
  lotteryType: LotteryType;
  lotteryUrlList: LotteryUrlListType;
  lotteryPicture: LotteryPictureType;
  isDataChanged: boolean;
}

const LotteryPage: FC<LotteryPageProps> = (props) => {
  const { lotteryType, lotteryUrlList, lotteryPicture, isDataChanged } = props;
  const {
    prizeListUrl,
    lotteryDetailUrl,
    prizeUrl,
    userInfoUrl,
    winnersUrl
  } = lotteryUrlList;
  const { shouldUserInfoModalShow, IsUserInfoModalShow } = useSelector(
    (stateValue: StateType) => stateValue
  ); // 获取保存的状态
  const dispatch = useDispatch();
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
    return new DataClient<UserInfoType>(userInfoUrl ?? '');
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
    dispatch({ type: 'lotteryUrlList', value: lotteryUrlList });
    if (!isEmpty(lotteryDetail) && userInfo) {
      dispatch({ type: 'lotteryDetail', value: lotteryDetail });
      dispatch({ type: 'pictureList', value: pictureList });
      if (userInfo.user_id === null && lotteryDetail?.need_user_info) {
        dispatch({ type: 'IsUserInfoModalShow', value: true });
      } else if (userInfo.user_id === null) {
        dispatch({ type: 'shouldUserInfoModalShow', value: true });
      } else if (userInfo.user_id !== null && shouldUserInfoModalShow) {
        dispatch({ type: 'shouldUserInfoModalShow', value: false });
      }
    }
  }, [userInfo, lotteryDetail]);

  return (
    <div
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
      {userInfoUrl && (
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
