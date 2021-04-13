import React, { FC, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLotteryResult } from '../../../data/api';
import SmashEgg from './SmashEgg';
import { SingleLotteryType, UserInfoType, PrizeType } from '../../../type';
import { getPicture } from '../../../util';
import { StateType } from '../../../store/reducer';

interface GoldenEggsProps {
  prizeList: PrizeType[];
  singleLottery: SingleLotteryType;
  prizeUrl?: string;
  userInfo: UserInfoType;
  prefix: string;
  getData: Function;
}

const GoldenEggs: FC<GoldenEggsProps> = (props) => {
  const { singleLottery, prizeUrl, userInfo, prefix, getData } = props;
  const dispatch = useDispatch();
  const state = useSelector((stateValue: StateType) => stateValue); // 获取保存的状态
  const [isLotterySuccess, setIsLotterySuccess] = useState(false);
  const { picture = [] } = singleLottery ?? {};
  const goodEgg = getPicture(picture, 'goodEgg');
  const badEgg = getPicture(picture, 'badEgg');
  const hammer = getPicture(picture, 'hammer');

  const lottery = async () => {
    // 先判断是否需要填写信息
    if (
      userInfo?.user_id === null &&
      singleLottery.need_user_info &&
      state.shouldUserInfoModalShow
    ) {
      dispatch({ type: 'IsUserInfoModalShow', value: true });
    } else if (
      prizeUrl &&
      (singleLottery?.remain_times > 0 || singleLottery?.remain_times === null)
    ) {
      dispatch({ type: 'isClickable', value: false });
      // 抽奖
      try {
        const prize = await getLotteryResult(prizeUrl);
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
              dispatch({ type: 'isClickable', value: true });
              setIsLotterySuccess(false);
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

  const SmashEggProps = {
    prefix,
    goodEgg,
    badEgg,
    hammer,
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
