import React, { FC, useEffect, useState } from 'react';
import TweenOne from 'rc-tween-one';
import { random } from 'lodash';
import { ImageType } from '../../../type';
import { getPicture } from '../../../util';

interface ExportWrapperProps {
  playExport: boolean;
  prefix: string;
  picture: ImageType[];
  onClick: () => void;
}

const ExportWrapper: FC<ExportWrapperProps> = (props) => {
  const { playExport = true, picture, prefix, onClick } = props;
  const [visible, setVisible] = useState(true);
  const exportBg = getPicture(picture, 'exportBg');
  const eggList = ['egg1', 'egg2', 'egg3'];

  // 随机返回一个扭蛋的图片
  const getEggPicture = () => {
    return getPicture(picture, eggList[random(0, 2)]);
  };

  // 扭蛋出口动画
  const animation = {
    top: '10%',
    duration: 2000,
    onComplete: onClick
  };

  useEffect(() => {
    if (!playExport) {
      setVisible(false);
      setTimeout(() => {
        setVisible(true);
      }, 100);
    }
  }, [playExport]);

  return (
    <div
      className='exportWrapper'
      style={{
        backgroundImage: `url(${
          exportBg || `${prefix}diazo/images/lottery/gashapon/export.png`
        })`
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
              backgroundImage: `url(${
                getEggPicture() ||
                `${prefix}diazo/images/lottery/gashapon/egg1.png`
              })`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ExportWrapper;
