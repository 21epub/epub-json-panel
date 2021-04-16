import React, { FC, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLotteryResult } from '../../../data/api';
import styles from './index.module.less';
import { SingleLotteryType, UserInfoType, PrizeType } from '../../../type';
import { StateType } from '../../../store/reducer';

interface TreasureBoxProps {
  openBox?: string;
  closeBox?: string;
  prizeList: PrizeType[];
  singleLottery: SingleLotteryType;
  prizeUrl?: string;
  userInfo?: UserInfoType;
  prefix: string;
  getData: () => void;
}

const TreasureBox: FC<TreasureBoxProps> = (props) => {
  const {
    openBox,
    closeBox,
    singleLottery,
    prizeUrl,
    userInfo,
    prefix,
    getData
  } = props;
  const dispatch = useDispatch();
  const state = useSelector((state: StateType) => state); // 获取保存的状态
  const [modalVisible, setModalVisible] = useState(false);
  const openBoxUrl =
    openBox || `${prefix}diazo/images/lottery/lotteryBox/openBox.png`;
  const closeBoxUrl =
    closeBox || `${prefix}diazo/images/lottery/lotteryBox/closeBox.png`;

  // 开始抽奖
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
      (singleLottery?.remain_times === null || singleLottery?.remain_times > 0)
    ) {
      dispatch({ type: 'isClickable', value: false });
      // 抽奖
      try {
        const response = await getLotteryResult(prizeUrl);
        const prize = response?.data?.data?.results[0];
        setModalVisible(true);
        // 延时1000毫秒弹出获奖结果
        setTimeout(() => {
          Modal.info({
            title: prize.objective.ranking,
            visible: modalVisible,
            content: (
              <div>
                <hr />
                奖项名:{prize.objective.title}
              </div>
            ),
            onOk() {
              // 重新获取后台的值
              getData();
              dispatch({ type: 'isClickable', value: true });
              setModalVisible(false);
              if (
                prize?.objective?.prize_type &&
                state.shouldUserInfoModalShow
              ) {
                dispatch({ type: 'IsUserInfoModalShow', value: true });
              }
            }
          });
        }, 500);
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
    <div className={styles.lotteryBoxPic}>
      {modalVisible ? (
        <img className='lotteryBoxPic' src={openBoxUrl} />
      ) : (
        <img className='lotteryBoxPic' src={closeBoxUrl} onClick={lottery} />
      )}
    </div>
  );
};

export default TreasureBox;
