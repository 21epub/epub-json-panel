import React, { FC, useEffect, useState } from 'react';
import TweenOne from 'rc-tween-one';
import { IAnimObject } from 'rc-tween-one/typings/AnimObject';
import { random } from 'lodash';
import { useDebounceFn } from 'ahooks';
import store from '../../../store';
import { animationList } from './AnimationConfig';
import { PrizeType } from '../../../type';
import { getPicture } from '../../../util';

interface eggWrapperProps {
  playEgg: boolean;
  prizeList: PrizeType[];
  onComplete: () => void;
}

const eggWrapper: FC<eggWrapperProps> = (props) => {
  const { playEgg, prizeList, onComplete } = props;
  const [visible, setVisible] = useState(true);
  const [state] = store.useRxjsStore();
  const { lotteryDetail, pictureList } = state;
  const upPic = getPicture(lotteryDetail?.picture ?? [], 'up');
  const defaultUpPic = getPicture(pictureList, 'up');
  const defaultEgg1Pic = getPicture(pictureList, 'egg1');
  const eggList = ['egg1', 'egg2', 'egg3'];

  // 防抖处理，动画重复多次。最后一次结束后触发
  const { run: runComplete } = useDebounceFn(onComplete, { wait: 500 });

  // 扭蛋出口动画
  const animation0: IAnimObject[] = [
    {
      bottom: '60%',
      left: '42%',
      duration: 200
    },
    {
      bottom: '30%',
      left: '72%',
      duration: 200
    },
    {
      bottom: '0%',
      left: '62%',
      duration: 200,
      onComplete: runComplete
    }
  ];

  if (animationList.length === 7) {
    animationList.unshift(animation0);
  }

  // 随机返回一个扭蛋的图片
  const getEggPicture = () => {
    return getPicture(lotteryDetail?.picture ?? [], eggList[random(0, 2)]);
  };

  useEffect(() => {
    if (!playEgg) {
      setVisible(false);
      setTimeout(() => {
        setVisible(true);
      }, 100);
    }
  }, [playEgg]);

  return (
    <div
      className='eggWrapper'
      style={{
        backgroundImage: `url(${upPic || defaultUpPic})`
      }}
    >
      {visible &&
        prizeList.map((prize, index) => {
          return (
            index <= 7 && (
              <TweenOne
                key={prize.id}
                className={`${'egg' + index} egg`}
                animation={animationList[index]}
                paused={!playEgg}
                reverse={false}
                repeat={2}
                yoyo={false}
                style={{
                  backgroundImage: `url(${getEggPicture() || defaultEgg1Pic})`
                }}
              />
            )
          );
        })}
    </div>
  );
};

export default eggWrapper;
