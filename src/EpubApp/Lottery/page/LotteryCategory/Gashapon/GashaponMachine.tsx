import React, { FC } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLotteryResult } from '../../../data/api';
import styles from './index.module.less';
import {
  SingleLotteryType,
  UserInfoType,
  PrizeType,
  ImageType
} from '../../../type';
import { getPicture } from '../../../util';

interface TreasureBoxProps {
  prizeList: PrizeType[];
  singleLottery: SingleLotteryType;
  prizeUrl?: string;
  userInfo?: UserInfoType;
  prefix: string;
  getData: () => void;
  picture: ImageType[];
}

const GashaponMachine: FC<TreasureBoxProps> = (props) => {
  const { picture, singleLottery, prizeUrl, userInfo, prefix, getData } = props;
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state); // 获取保存的状态
  const { up, glass, down, start, exportBg } = picture;
  const up = getPicture(picture, 'up');
  const glass = getPicture(picture, 'glass');
  const down = getPicture(picture, 'down');
  const start = getPicture(picture, 'start');
  const exportBg = getPicture(picture, 'exportBg');

  const lottery = async (
    singleLottery: any,
    userInfo: any,
    prizeUrl?: string
  ) => {
    // 先判断是否需要填写信息
    if (
      userInfo[0]?.user_id === null &&
      singleLottery[0].need_user_info &&
      state.shouldUserInfoModalShow
    ) {
      dispatch({ type: 'IsUserInfoModalShow', value: true });
    } else if (
      prizeUrl &&
      (singleLottery[0].remain_times > 0 ||
        singleLottery[0].remain_times === null)
    ) {
      dispatch({ type: 'isClickable', value: false });
      // 抽奖
      try {
        const response = await getLotteryResult(prizeUrl);
        const prize = response?.data?.data?.results[0];

        // 延时1000毫秒弹出获奖结果
        setTimeout(() => {
          Modal.info({
            title: prize.objective.ranking,

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
    <div className={styles.gashaponWrap}>
      <img
        src={up || `${prefix}diazo/images/lottery/gashapon/up.png`}
        className='up'
      />
      <img
        src={up || `${prefix}diazo/images/lottery/gashapon/egg1.png`}
        className='egg1'
      />
      <img
        src={up || `${prefix}diazo/images/lottery/gashapon/egg2.png`}
        className='egg2'
      />
      <img
        src={up || `${prefix}diazo/images/lottery/gashapon/egg3.png`}
        className='egg3'
      />
      <img
        src={glass || `${prefix}diazo/images/lottery/gashapon/glass.png`}
        className='glass'
      />
      <img
        src={down || `${prefix}diazo/images/lottery/gashapon/down.png`}
        className='down'
      />
      <img
        src={start || `${prefix}diazo/images/lottery/gashapon/start.png`}
        className='start'
        onClick={() => lottery(singleLottery, userInfo, prizeUrl)}
        style={{ cursor: state.isClickable ? 'pointer' : 'default' }}
      />
      <img
        src={exportBg || `${prefix}diazo/images/lottery/gashapon/export.png`}
        className='exportBg'
      />
    </div>
  );
};

export default GashaponMachine;
