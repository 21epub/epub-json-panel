import React, { FC, useEffect, useState } from 'react';
import TweenOne from 'rc-tween-one';
import { random } from 'lodash';
import { useUpdateEffect } from 'ahooks';
import store from '../../../store';
import { getPicture } from '../../../util';

interface ExportWrapperProps {
  playExport: boolean;
  onExportComplete: () => void;
}

const ExportWrapper: FC<ExportWrapperProps> = (props) => {
  const { playExport = true, onExportComplete } = props;
  const [visible, setVisible] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [state] = store.useRxjsStore();
  const { lotteryDetail, pictureList } = state;
  const exportBgPic = getPicture(lotteryDetail?.picture ?? [], 'exportBg');
  const defaultExportBgPic = getPicture(pictureList, 'exportBg');
  const defaultEgg1Pic = getPicture(pictureList, 'egg1');
  const eggList = ['egg1', 'egg2', 'egg3'];

  // 随机返回一个扭蛋的图片
  const getEggPicture = () => {
    return getPicture(lotteryDetail?.picture ?? [], eggList[random(0, 2)]);
  };

  // 扭蛋出口动画
  const animation = {
    top: '10%',
    duration: 2000,
    onComplete: () => setIsComplete(true)
  };

  useEffect(() => {
    if (!playExport) {
      setVisible(false);
      setTimeout(() => {
        setVisible(true);
      }, 100);
    }
  }, [playExport]);

  useUpdateEffect(() => {
    if (isComplete) {
      onExportComplete();
    }
  }, [isComplete]);

  return (
    <div
      className='exportWrapper'
      style={{
        backgroundImage: `url(${exportBgPic || defaultExportBgPic})`
      }}
    >
      {visible && (
        <div className='exportBox'>
          <TweenOne
            className='exportEgg'
            animation={animation}
            reverse={false}
            paused={!playExport}
            repeat={0}
            yoyo={false}
            style={{
              backgroundImage: `url(${getEggPicture() || defaultEgg1Pic})`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ExportWrapper;
