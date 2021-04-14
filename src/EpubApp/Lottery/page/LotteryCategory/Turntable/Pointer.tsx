import React, { FC } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLotteryResult } from '../../../data/api';
import { SingleLotteryType, UserInfoType, WinnerType } from '../../../type';
import { StateType } from '../../../store/reducer';
import styles from './index.module.less';

interface PointerProps {
  pointer?: string;
  isClickable: boolean;
  singleLottery: SingleLotteryType;
  prizeUrl?: string;
  userInfo?: UserInfoType;
  prefix: string;
  doRotate: (prize: WinnerType) => void;
}

const Pointer: FC<PointerProps> = (props) => {
  const {
    pointer,
    isClickable,
    singleLottery,
    prizeUrl,
    userInfo,
    prefix,
    doRotate
  } = props;
  const dispatch = useDispatch();
  const state = useSelector((state: StateType) => state); // 获取保存的状态
  const lottery = async () => {
    // 先判断是否需要填写信息
    if (
      userInfo?.user_id === null &&
      singleLottery?.need_user_info &&
      state.shouldUserInfoModalShow
    ) {
      dispatch({ type: 'IsUserInfoModalShow', value: true });
    } else if (
      prizeUrl &&
      (singleLottery.remain_times > 0 || singleLottery.remain_times === null)
    ) {
      dispatch({ type: 'isClickable', value: false });
      // 抽奖
      try {
        const prize = await getLotteryResult(prizeUrl);
        // 通知旋转
        doRotate(prize);
      } catch (error) {
        Modal.info({
          title: error.response.data,
          okText: '查看我的奖品',
          onOk() {
            dispatch({ type: 'isPrizeModalShow', value: true });
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
        <a>
          <img
            className='point'
            src={
              pointer || `${prefix}diazo/images/lottery/turntable/pointer.png`
            }
            onClick={lottery}
          />
        </a>
      ) : (
        <a style={{ cursor: 'default' }}>
          <img
            className='point'
            src={
              pointer || `${prefix}diazo/images/lottery/turntable/pointer.png`
            }
          />
        </a>
      )}
    </div>
  );
};

export default Pointer;
