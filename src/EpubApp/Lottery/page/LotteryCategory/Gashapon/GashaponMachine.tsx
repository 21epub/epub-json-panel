import React, { FC, useState } from 'react';
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
import ExportWrapper from './ExportWrapper';
import EggWrapper from './EggWrapper';
import { getPicture } from '../../../util';
import { StateType } from '../../../store/reducer';

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
  const {
    prizeList,
    picture,
    singleLottery,
    prizeUrl,
    userInfo,
    prefix,
    getData
  } = props;
  const dispatch = useDispatch();
  const state = useSelector((stateValue: StateType) => stateValue); // 获取保存的状态
  const glass = getPicture(picture, 'glass');
  const down = getPicture(picture, 'down');
  const start = getPicture(picture, 'start');
  const [playEgg, setPlayEgg] = useState(false);
  const [playExport, setPlayExport] = useState(false);

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
              // 重置动画状态
              setPlayEgg(false);
              setPlayExport(false);
            }
          });
        }, 500);
      } catch (error) {
        Modal.info({
          title: error.response.data,
          okText: '查看我的奖品',
          onOk() {
            setPlayEgg(false);
            setPlayExport(false);
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
        onOk() {
          setPlayEgg(false);
          setPlayExport(false);
        }
      });
    }
  };

  const onPlayEgg = () => {
    setPlayEgg(true);
  };

  const onComplete = () => {
    if (!playExport) {
      // 防止多次触发
      setPlayExport(true);
    }
  };

  return (
    <div className={styles.gashaponWrap}>
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
        onClick={onPlayEgg}
        style={{ cursor: state.isClickable ? 'pointer' : 'default' }}
      />
      <EggWrapper
        playEgg={playEgg}
        prizeList={prizeList}
        picture={picture}
        prefix={prefix}
        onComplete={onComplete}
      />
      <ExportWrapper
        playExport={playExport}
        picture={picture}
        prefix={prefix}
        onClick={lottery}
      />
    </div>
  );
};

export default GashaponMachine;
