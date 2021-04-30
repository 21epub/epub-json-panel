import React, { FC, useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import {
  drawPrizeBlock,
  getPicture,
  getPrizeIndex,
  getRandomInt,
  prizeToAngle
} from '../../../util';
import Pointer from './Pointer';
import { UserInfoType, PrizeType, WinnerType } from '../../../type';
import store from '../../../store';

interface ResultType {
  status: 'success';
  prize: WinnerType;
}

interface TurntableCenterProps {
  prizeList: PrizeType[];
  prizeUrl?: string;
  userInfo?: UserInfoType;
  getData: () => void;
}

const TurntableCenter: FC<TurntableCenterProps> = (props) => {
  const { prizeList, prizeUrl, userInfo, getData } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [startRadian, setStartRadian] = useState(0); // 定义圆的角度
  const [state] = store.useRxjsStore();
  // 获取保存的状态
  const { lotteryDetail, pictureList, shouldUserInfoModalShow } = state;
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
      const turns = getRandomInt(5, 15);

      // 将总旋转度数切割为多少份
      const frame = getRandomInt(100, 400);

      for (let i = 1; i <= frame; i += 1) {
        // target为目标角度， 2 * Math.PI 为一圈 ，获取每份度数的大小
        const interval = (target + 2 * Math.PI * turns) / frame;
        const timeId = setTimeout(() => {
          // 设定每次相对原点的旋转度数
          setStartRadian(interval * i);
          // 当到达目标度数时返回结果
          if (i === frame) {
            resolve(result);
            clearTimeout(timeId);
          }
        }, 100);
      }
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
                <div>
                  <hr />
                  奖项名:{res.prize.objective.title}
                </div>
              ),
              onOk() {
                setStartRadian(0);
                if (
                  res?.prize?.objective?.prize_type &&
                  shouldUserInfoModalShow
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
