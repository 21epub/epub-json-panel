import React, { FC, useEffect, useRef, useState } from 'react';
import { Modal, Space } from 'antd';
import {
  drawPrizeBlock,
  getPicture,
  getPrizeIndex,
  getRandomInt,
  prizeToAngle,
  formatPictureUrl
} from '../../../util';
import Pointer from './Pointer';
import { LotteryUserInfoType, PrizeType, WinnerType } from '../../../type';
import store from '../../../store';

interface ResultType {
  status: 'success';
  prize: WinnerType;
}

interface TurntableCenterProps {
  prizeList: PrizeType[];
  prizeUrl?: string;
  userInfo?: LotteryUserInfoType;
  getData: () => void;
}

const TurntableCenter: FC<TurntableCenterProps> = (props) => {
  const { prizeList, prizeUrl, userInfo, getData } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [startRadian, setStartRadian] = useState(0); // 定义圆的角度
  const [state] = store.useRxjsStore();
  // 获取保存的状态
  const { lotteryDetail, pictureList, lotteryUrlList, lotteryEvent } = state;
  const turntablePic = getPicture(lotteryDetail?.picture ?? [], 'turntable');
  const defaultTurntablePic = getPicture(pictureList, 'turntable');

  // 渲染抽奖盘
  useEffect(() => {
    if (canvasRef?.current) {
      setCtx(canvasRef?.current?.getContext('2d'));
      if (ctx && prizeList.length !== 0) {
        drawPrizeBlock(ctx, prizeList, startRadian);
      }
    }
  }, [ctx, prizeList, startRadian]);

  // 旋转函数
  const rotate = (prize: WinnerType) => {
    return new Promise<ResultType>((resolve) => {
      // 获取抽奖结果在奖品list中对应的index
      const prizeIndex = getPrizeIndex(prize, prizeList);

      // 获取目标角度： prizeIndex:prize对应第几个，prizeList.length:prize总数
      const target = prizeToAngle(prizeIndex, prizeList.length);

      const result: ResultType = {
        status: 'success',
        prize // 获得的奖品
      };

      // 获取随机圈数
      const turns = getRandomInt(3, 5);

      // 将总旋转度数切割为多少份
      const frame = getRandomInt(200, 400);

      const interval = (target + 2 * Math.PI * turns) / frame;

      let i = 1;
      // 回调函数
      function animloop() {
        i += 1; // 修改图像的位置
        setStartRadian(interval * i);

        if (i < frame) {
          // 在动画没有结束前，递归渲染
          window.requestAnimationFrame(animloop);
        }

        if (i === frame) {
          resolve(result);
        }
      }
      // 第一帧渲染
      window.requestAnimationFrame(animloop);
    });
  };

  const doRotate = (prize: WinnerType) => {
    if (prize && prizeList?.length) {
      rotate(prize).then((res) => {
        // 当promise返回成功时
        if (res.status === 'success') {
          // 延时1000毫秒弹出获奖结果
          setTimeout(() => {
            Modal.info({
              title: res.prize.objective.ranking,
              content: (
                <Space
                  size='large'
                  align='center'
                  style={{ marginLeft: '-38px' }}
                >
                  <img
                    src={formatPictureUrl(
                      res.prize.objective.picture,
                      lotteryUrlList?.web_url
                    )}
                    style={{ width: '100px' }}
                  />
                  <span>奖项名:{res.prize.objective.title}</span>
                </Space>
              ),
              onOk() {
                setStartRadian(0);
                if (lotteryEvent) {
                  if (res?.prize?.objective?.prize_type === 0) {
                    // 抽中空奖时触发
                    lotteryEvent.onLotteryEmpty();
                  } else if (res?.prize?.objective?.prize_type === 1) {
                    // 抽中奖品时触发
                    lotteryEvent.onLotterySuccess();
                  }
                }
                if (
                  res?.prize?.objective?.prize_type &&
                  state.showUserModalAfterLottery
                ) {
                  store.reducers.setIsUserInfoModalShow(true);
                }
                store.reducers.setIsClickable(true);
                // 重新获取后台的值
                getData();
              }
            });
          }, 1000);
        }
      });
    }
  };

  if (prizeList?.length) {
    if (prizeList?.length === 3 || prizeList?.length === 5) {
      for (let i = 0; i < prizeList.length; i += 1) {
        const value = i % 3;
        switch (value) {
          case 0:
            Object.defineProperty(prizeList[i], 'color', { value: '#FFEDD6' });
            break;
          case 1:
            Object.defineProperty(prizeList[i], 'color', { value: '#fff' });
            break;
          case 2:
            Object.defineProperty(prizeList[i], 'color', { value: '#fef8e6' });
            break;
          default:
            break;
        }
      }
    } else if (prizeList.length === 7) {
      for (let i = 0; i < prizeList.length; i += 1) {
        const value = i % 4;
        switch (value) {
          case 0:
            Object.defineProperty(prizeList[i], 'color', { value: '#FFF7E4' });
            break;
          case 1:
            Object.defineProperty(prizeList[i], 'color', { value: '#fff' });
            break;
          case 2:
            Object.defineProperty(prizeList[i], 'color', { value: '#FFEDD6' });
            break;
          case 3:
            Object.defineProperty(prizeList[i], 'color', { value: '#fff' });
            break;
          default:
            break;
        }
      }
    } else {
      for (let i = 0; i < prizeList.length; i += 1) {
        if (i % 2 === 0)
          Object.defineProperty(prizeList[i], 'color', { value: '#fef8e6' });
        else Object.defineProperty(prizeList[i], 'color', { value: '#fff' });
      }
    }

    return (
      <div
        className='turntableCenterWrap'
        style={{
          backgroundImage: `url(${turntablePic || defaultTurntablePic})`,
          backgroundSize: '100% 100%'
        }}
      >
        <canvas
          id='turntableCircle'
          ref={canvasRef}
          width='280px'
          height='280px'
        >
          您的浏览器不支持canvas。
        </canvas>
        <Pointer userInfo={userInfo} prizeUrl={prizeUrl} doRotate={doRotate} />
      </div>
    );
  }
  return <div />;
};

export default TurntableCenter;
