import React, { FC, useState } from 'react';
import { Modal } from 'antd';
import { getLotteryResult } from '../../../data/api';
import styles from './index.module.less';
import type { LotteryUserInfoType } from '../../../type';
import { getPicture } from '../../../util';
import store from '../../../store';

interface TreasureBoxProps {
  prizeUrl?: string;
  userInfo?: LotteryUserInfoType;
  getData: () => void;
}

const TreasureBox: FC<TreasureBoxProps> = (props) => {
  const { prizeUrl, userInfo, getData } = props;
  const [state] = store.useRxjsStore();
  const { lotteryDetail, pictureList, shouldUserInfoModalShow } = state;
  const openBoxPic = getPicture(lotteryDetail?.picture ?? [], 'openBox');
  const closeBoxPic = getPicture(lotteryDetail?.picture ?? [], 'closeBox');
  const defaultOpenBoxPic = getPicture(pictureList, 'openBox');
  const defaultCloseBoxPic = getPicture(pictureList, 'closeBox');

  const [modalVisible, setModalVisible] = useState(false);
  // 开始抽奖
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
              store.reducers.setIsClickable(true);
              setModalVisible(false);
              if (prize?.objective?.prize_type && shouldUserInfoModalShow) {
                store.reducers.setIsUserInfoModalShow(true);
              }
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
      {console.log(openBoxPic, defaultOpenBoxPic)}
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
