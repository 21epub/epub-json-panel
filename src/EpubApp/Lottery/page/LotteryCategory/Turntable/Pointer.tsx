import React, { FC, useState, useEffect } from 'react';
import { Modal } from 'antd';
import { getLotteryResult } from '../../../data/api';
import { LotteryUserInfoType, WinnerType } from '../../../type';
import { getPicture } from '../../../util';
import store from '../../../store';
import styles from './index.module.less';

interface PointerProps {
  prizeUrl?: string;
  userInfo?: LotteryUserInfoType;
  doRotate: (prize: WinnerType) => void;
}

const Pointer: FC<PointerProps> = (props) => {
  const { prizeUrl, userInfo, doRotate } = props;
  const [state] = store.useRxjsStore();
  // 获取保存的状态
  const { lotteryEvent, lotteryDetail, isClickable, pictureList } = state;
  const pointerPic = getPicture(lotteryDetail?.picture ?? [], 'pointer');
  const defaultPointerPic = getPicture(pictureList, 'pointer');
  const [pointerEvents, setPointerEvents] = useState<'none' | 'auto'>('auto');
  const [lotteryState, setLotteryState] = useState<string | undefined>();

  const getState = async () => {
    switch (lotteryState) {
      case 'checkTime':
        if (state.betweenActivityTime) {
          setLotteryState('checkRemainTimes');
        } else {
          store.reducers.setIsActivityTimeModalShow(true);
          setLotteryState(undefined);
        }
        break;
      case 'checkRemainTimes':
        if (
          lotteryDetail?.remain_times === null ||
          lotteryDetail?.remain_times === undefined ||
          lotteryDetail?.remain_times > 0
        ) {
          setLotteryState('checkNeedUserInfo');
        } else {
          Modal.info({
            title: '抽奖次数用完啦',
            content: (
              <div>
                <hr />
                <p>您的抽奖次数用完啦！</p>
                <p>无法抽奖，感谢您的参与！</p>
              </div>
            ),
            onOk() {}
          });
        }
        break;
      case 'checkNeedUserInfo':
        if (lotteryDetail?.need_user_info) {
          setLotteryState('checkIsUserInfoFilled');
        } else {
          setLotteryState('lottery');
        }
        break;
      case 'checkIsUserInfoFilled':
        if (userInfo?.user_id === null) {
          setLotteryState('checkUserInfoFillRules');
        } else {
          setLotteryState('lottery');
        }
        break;
      case 'checkUserInfoFillRules':
        if (lotteryDetail?.fill_rules === 0) {
          // 先填写后抽奖
          store.reducers.setIsUserInfoModalShow(true);
        } else {
          // 先抽奖后填写
          store.reducers.setShowUserModalAfterLottery(true);
          setLotteryState('lottery');
        }
        break;
      case 'lottery':
        store.reducers.setIsClickable(false);
        // 抽奖
        try {
          if (!prizeUrl) return false;
          const response = await getLotteryResult(prizeUrl);
          const prize = response?.data?.data?.results[0];
          // 通知旋转
          doRotate(prize);
        } catch (error) {
          Modal.info({
            title: error.response.data,
            okText: '查看我的奖品',
            onOk() {
              store.reducers.setIsPrizeModalShow(true);
            }
          });
        }
        break;
      default:
        break;
    }
    return true;
  };

  useEffect(() => {
    if (lotteryState) {
      getState();
    }
  }, [lotteryState]);

  const lottery = async () => {
    setLotteryState('checkTime');
  };

  useEffect(() => {
    setPointerEvents(isClickable ? 'auto' : 'none');
  }, [isClickable]);

  return (
    <div
      className={styles.pointer}
      style={{ pointerEvents: lotteryEvent ? pointerEvents : 'none' }}
    >
      {isClickable ? (
        <img
          className='point'
          src={pointerPic || defaultPointerPic}
          onClick={lottery}
        />
      ) : (
        <img className='point' src={pointerPic || defaultPointerPic} />
      )}
    </div>
  );
};

export default Pointer;
