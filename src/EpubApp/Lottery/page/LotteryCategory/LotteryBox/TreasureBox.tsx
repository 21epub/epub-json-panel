import React, { FC, useState, useEffect } from 'react';
import { Modal, Space } from 'antd';
import { getLotteryResult } from '../../../data/api';
import styles from './index.module.less';
import type { LotteryUserInfoType } from '../../../type';
import { getPicture, formatPictureUrl } from '../../../util';
import store from '../../../store';

interface TreasureBoxProps {
  prizeUrl?: string;
  userInfo?: LotteryUserInfoType;
  getData: () => void;
}

const TreasureBox: FC<TreasureBoxProps> = (props) => {
  const { prizeUrl, userInfo, getData } = props;
  const [state] = store.useRxjsStore();
  const {
    lotteryDetail,
    pictureList,
    isClickable,
    lotteryUrlList,
    lotteryEvent
  } = state;
  const openBoxPic = getPicture(lotteryDetail?.picture ?? [], 'openBox');
  const closeBoxPic = getPicture(lotteryDetail?.picture ?? [], 'closeBox');
  const defaultOpenBoxPic = getPicture(pictureList, 'openBox');
  const defaultCloseBoxPic = getPicture(pictureList, 'closeBox');
  const [pointerEvents, setPointerEvents] = useState<'none' | 'auto'>('auto');
  const [modalVisible, setModalVisible] = useState(false);
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
        if (userInfo?.user_id) {
          if (state.showUserModalAfterLottery) {
            store.reducers.setShowUserModalAfterLottery(false);
          }
          setLotteryState('lottery');
        } else {
          setLotteryState('checkUserInfoFillRules');
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
          setModalVisible(true);
          // 延时1000毫秒弹出获奖结果
          setTimeout(() => {
            Modal.info({
              title: prize.objective.ranking,
              visible: modalVisible,
              content: (
                <Space
                  size='large'
                  align='center'
                  style={{ marginLeft: '-38px' }}
                >
                  <img
                    src={formatPictureUrl(
                      prize.objective.picture,
                      lotteryUrlList?.web_url
                    )}
                    style={{ width: '100px' }}
                  />
                  <span>奖项名:{prize.objective.title}</span>
                </Space>
              ),
              onOk() {
                if (lotteryEvent) {
                  if (prize?.objective?.prize_type === 0) {
                    // 抽中空奖时触发
                    lotteryEvent.onLotteryEmpty();
                  } else if (prize?.objective?.prize_type === 1) {
                    // 抽中奖品时触发
                    lotteryEvent.onLotterySuccess();
                  }
                }

                setModalVisible(false);
                if (
                  prize?.objective?.prize_type &&
                  state.showUserModalAfterLottery
                ) {
                  store.reducers.setIsUserInfoModalShow(true);
                }

                store.reducers.setIsClickable(true);
                // 重新获取后台的值
                getData();
              }
            });
          }, 500);
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

  useEffect(() => {
    // 处理先填写后抽奖，填写信息后的逻辑
    if (
      state.filledUserInfo &&
      userInfo?.id &&
      !state.showUserModalAfterLottery
    ) {
      setLotteryState('checkTime');
      store.reducers.setFilledUserInfo(false);
    }

    // 处理先抽奖后填写，填写信息后的逻辑
    if (
      state.filledUserInfo &&
      userInfo?.id &&
      state.showUserModalAfterLottery
    ) {
      setLotteryState(undefined);
      store.reducers.setFilledUserInfo(false);
    }
  }, [state.filledUserInfo, userInfo]);

  const lottery = async () => {
    setLotteryState('checkTime');
  };

  useEffect(() => {
    setPointerEvents(isClickable ? 'auto' : 'none');
  }, [isClickable]);

  return (
    <div
      className={styles.lotteryBoxPic}
      style={{ pointerEvents: lotteryEvent ? pointerEvents : 'none' }}
    >
      {modalVisible ? (
        <img className='lotteryBoxPic' src={openBoxPic || defaultOpenBoxPic} />
      ) : (
        <img
          className='lotteryBoxPic'
          src={closeBoxPic || defaultCloseBoxPic}
          onClick={lottery}
        />
      )}
    </div>
  );
};

export default TreasureBox;
