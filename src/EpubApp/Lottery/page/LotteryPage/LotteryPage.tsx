import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataClient } from '@21epub/epub-data-client';
import {
  SingleLotteryType,
  UserInfoType,
  LotteryType,
  LotteryUrlListType
} from '../../type';
import { getLotteryComponent } from '../LotteryCategory';
import { UserInfoModal, ActivityTimeModal } from '../../Components';
import { getPicture } from '../../util';
import styles from './index.module.less';
import { StateType } from '../../store/reducer';

export interface LotteryPageProps {
  lotteryType: LotteryType;
  lotteryUrlList: LotteryUrlListType;
  isDataChanged: boolean;
}

const LotteryPage: FC<LotteryPageProps> = (props) => {
  const { lotteryType, lotteryUrlList, isDataChanged } = props;
  const {
    prizeListUrl,
    singleLotteryUrl,
    picturePrefix,
    prizeUrl,
    userInfoUrl,
    winnersUrl
  } = lotteryUrlList;

  const state = useSelector((stateValue: StateType) => stateValue); // 获取保存的状态
  const dispatch = useDispatch();
  const LotteryComponent = getLotteryComponent(lotteryType);

  const prizeListClient = useMemo(() => {
    return new DataClient(prizeListUrl);
  }, [prizeListUrl]);

  const singleLotteryClient = useMemo(() => {
    return new DataClient<SingleLotteryType>(singleLotteryUrl);
  }, [singleLotteryUrl]);

  const winnersClient = useMemo(() => {
    return new DataClient(winnersUrl ?? '');
  }, [winnersUrl]);

  const userInfoClient = useMemo(() => {
    return new DataClient<UserInfoType>(userInfoUrl ?? '');
  }, [userInfoUrl]);

  // 初始，以及预留监听外部修改状态
  useEffect(() => {
    prizeListUrl && prizeListClient.getAll();
    singleLotteryUrl && singleLotteryClient.getAll();
    winnersUrl && winnersClient.getAll();
    userInfoUrl && userInfoClient.getAll();
  }, [isDataChanged, lotteryType]);

  const getData = useCallback(() => {
    prizeListUrl && prizeListClient.getAll();
    singleLotteryUrl && singleLotteryClient.getAll();
    winnersUrl && winnersClient.getAll();
  }, []);

  const getUser = useCallback(() => {
    userInfoUrl && userInfoClient.getAll();
  }, []);

  const prizeList = prizeListClient.useData();
  const singleLottery = singleLotteryClient.useData()?.[0];
  const userInfo = userInfoClient.useData()?.[0];
  const winnerList = winnersClient.useData();

  useEffect(() => {
    if (singleLottery && userInfo) {
      if (userInfo.user_id === null && singleLottery?.need_user_info) {
        dispatch({ type: 'IsUserInfoModalShow', value: true });
      } else if (userInfo.user_id === null) {
        dispatch({ type: 'shouldUserInfoModalShow', value: true });
      } else if (userInfo.user_id !== null && state.shouldUserInfoModalShow) {
        dispatch({ type: 'shouldUserInfoModalShow', value: false });
      }
    }
  }, [userInfo, singleLottery]);

  const { start_time, end_time, show_background_image, picture = [] } =
    singleLottery ?? {};

  const background = getPicture(picture, 'background');

  return (
    <div
      className={styles.lotteryPageWrap}
      style={{
        backgroundImage: show_background_image
          ? `url(${
              background ||
              picturePrefix + 'diazo/images/lottery/turntable/bg.png'
            })`
          : ''
      }}
    >
      <LotteryComponent
        singleLottery={singleLottery}
        winnerList={winnerList}
        prizeList={prizeList}
        userInfo={userInfo}
        isClickable={state.isClickable}
        prefix={picturePrefix}
        prizeUrl={prizeUrl}
        getData={getData}
      />
      {userInfoUrl && (
        <div>
          <UserInfoModal
            isModalShow={state.IsUserInfoModalShow}
            singleLottery={singleLottery}
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
