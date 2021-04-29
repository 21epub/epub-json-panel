import React, { FC } from 'react';
import { Modal } from 'antd';
import { getLotteryResult } from '../../../data/api';
import { UserInfoType, WinnerType } from '../../../type';
import { getPicture } from '../../../util';
import store from '../../../store';
import styles from './index.module.less';

interface PointerProps {
  prizeUrl?: string;
  userInfo?: UserInfoType;
  doRotate: (prize: WinnerType) => void;
}

const Pointer: FC<PointerProps> = (props) => {
  const { prizeUrl, userInfo, doRotate } = props;
  const [state] = store.useRxjsStore();
  // 获取保存的状态
  const {
    lotteryDetail,
    shouldUserInfoModalShow,
    isClickable,
    pictureList
  } = state;
  const pointerPic = getPicture(lotteryDetail?.picture ?? [], 'pointer');
  const defaultPointerPic = getPicture(pictureList, 'pointer');

  const lottery = async () => {
    // 先判断是否需要填写信息
    if (
      userInfo?.user_id === null &&
      lotteryDetail?.need_user_info &&
      shouldUserInfoModalShow
    ) {
      store.reducers.setIsUserInfoModalShow(true);
    } else if (
      prizeUrl &&
      (lotteryDetail?.remain_times === null ||
        lotteryDetail?.remain_times === undefined ||
        lotteryDetail?.remain_times > 0)
    ) {
      store.reducers.setIsClickable(false);
      // 抽奖
      try {
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
  };

  return (
    <div className={styles.pointer}>
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
