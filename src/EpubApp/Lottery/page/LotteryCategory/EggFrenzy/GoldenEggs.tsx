import React, { FC, useState } from 'react';
import { Modal } from 'antd';
import { getLotteryResult } from '../../../data/api';
import SmashEgg from './SmashEgg';
import { UserInfoType, PrizeType } from '../../../type';
import store from '../../../store';

interface GoldenEggsProps {
  prizeList: PrizeType[];
  prizeUrl?: string;
  userInfo: UserInfoType;
  getData: Function;
}

const GoldenEggs: FC<GoldenEggsProps> = (props) => {
  const { prizeUrl, userInfo, getData } = props;
  const [state] = store.useRxjsStore();
  const [isLotterySuccess, setIsLotterySuccess] = useState(false);
  const { lotteryDetail, shouldUserInfoModalShow } = state;

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
      lotteryDetail?.remain_times &&
      (lotteryDetail?.remain_times === null || lotteryDetail?.remain_times > 0)
    ) {
      store.reducers.setIsClickable(false);
      // 抽奖
      try {
        const response = await getLotteryResult(prizeUrl);
        const prize = response?.data?.data?.results[0];
        setIsLotterySuccess(true);
        // 延时1000毫秒弹出获奖结果
        setTimeout(() => {
          Modal.info({
            title: prize.objective.ranking,
            visible: isLotterySuccess,
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
              setIsLotterySuccess(false);
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

  const SmashEggProps = {
    isLotterySuccess,
    onClick: lottery
  };

  return (
    <div className='eggFrenzyContainer'>
      <div className='egg1'>
        <SmashEgg {...SmashEggProps} />
      </div>
      <div className='egg2'>
        <SmashEgg {...SmashEggProps} />
      </div>
      <div className='egg3'>
        <SmashEgg {...SmashEggProps} />
      </div>
    </div>
  );
};

export default GoldenEggs;
