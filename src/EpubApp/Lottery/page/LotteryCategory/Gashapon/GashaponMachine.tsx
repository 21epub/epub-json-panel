import React, { FC, useState, useEffect } from 'react';
import { Modal, Space } from 'antd';
import { getLotteryResult } from '../../../data/api';
import styles from './index.module.less';
import { LotteryUserInfoType, PrizeType, WinnerType } from '../../../type';
import ExportWrapper from './ExportWrapper';
import EggWrapper from './EggWrapper';
import { getPicture, formatPictureUrl } from '../../../util';
import store from '../../../store';

interface TreasureBoxProps {
  prizeList: PrizeType[];
  prizeUrl?: string;
  userInfo?: LotteryUserInfoType;
  getData: () => void;
}

const GashaponMachine: FC<TreasureBoxProps> = (props) => {
  const { prizeList, prizeUrl, userInfo, getData } = props;
  const [state] = store.useRxjsStore();
  const {
    lotteryDetail,
    pictureList,
    shouldUserInfoModalShow,
    isClickable,
    lotteryUrlList,
    lotteryEvent
  } = state;
  const glassPic = getPicture(lotteryDetail?.picture ?? [], 'glass');
  const downPic = getPicture(lotteryDetail?.picture ?? [], 'down');
  const startPic = getPicture(lotteryDetail?.picture ?? [], 'start');
  const defaultGlassPic = getPicture(pictureList, 'glass');
  const defaultDownPic = getPicture(pictureList, 'down');
  const defaultStartPic = getPicture(pictureList, 'start');
  const [playEgg, setPlayEgg] = useState(false);
  const [playExport, setPlayExport] = useState(false);
  const [pointerEvents, setPointerEvents] = useState<'none' | 'auto'>('auto');
  const [prize, setPrize] = useState<WinnerType>();

  const onPlayEgg = () => {
    setPlayEgg(true);
  };

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
        setPrize(response?.data?.data?.results[0]);
        // 开始播放扭蛋机动画
        onPlayEgg();
      } catch (error) {
        Modal.info({
          title: error.response.data,
          okText: '查看我的奖品',
          onOk() {
            setPlayEgg(false);
            setPlayExport(false);
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
        onOk() {
          setPlayEgg(false);
          setPlayExport(false);
        }
      });
    }
  };

  const onComplete = () => {
    if (!playExport) {
      // 防止多次触发
      setPlayExport(true);
    }
  };

  // 动画全部完成后
  const onExportComplete = () => {
    // 延时1000毫秒弹出获奖结果
    setTimeout(() => {
      Modal.info({
        title: prize?.objective?.ranking,
        content: (
          <Space size='large' align='center' style={{ marginLeft: '-38px' }}>
            <img
              src={formatPictureUrl(
                prize?.objective?.picture,
                lotteryUrlList?.web_url
              )}
              style={{ width: '100px' }}
            />
            <span>奖项名:{prize?.objective?.title}</span>
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
          // 重新获取后台的值
          getData();
          store.reducers.setIsClickable(true);
          if (prize?.objective?.prize_type && shouldUserInfoModalShow) {
            store.reducers.setIsUserInfoModalShow(true);
          }
          // 重置动画状态
          setPlayEgg(false);
          setPlayExport(false);
        }
      });
    }, 500);
  };

  useEffect(() => {
    setPointerEvents(isClickable ? 'auto' : 'none');
  }, [isClickable]);

  return (
    <div
      className={styles.gashaponWrap}
      style={{ pointerEvents: lotteryEvent ? pointerEvents : 'none' }}
    >
      <img src={glassPic || defaultGlassPic} className='glass' />
      <img src={downPic || defaultDownPic} className='down' />
      <img
        src={startPic || defaultStartPic}
        className='start'
        onClick={lottery}
        style={{ cursor: isClickable ? 'pointer' : 'default' }}
      />
      <EggWrapper
        playEgg={playEgg}
        prizeList={prizeList}
        onComplete={onComplete}
      />
      <ExportWrapper
        playExport={playExport}
        onExportComplete={onExportComplete}
      />
    </div>
  );
};

export default GashaponMachine;
