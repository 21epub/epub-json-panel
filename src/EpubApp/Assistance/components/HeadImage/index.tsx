import React, { FC } from 'react';
import type { AssistanceDetailType } from '../../type';

interface HeadImageProps {
  picture?: AssistanceDetailType['picture'];
}

const HeadImage: FC<HeadImageProps> = (props) => {
  const {
    picture = 'http://qty83k.creatby.com/materials/2/origin/55bc33f6f6d6189de0eb2d559349048a_origin.jpg'
  } = props;

  // 首页内容
  return (
    <div className='headImage' style={{ width: '100%', height: '233px' }}>
      <img
        className='c-image'
        style={{ width: '100%', height: '100%' }}
        src={picture}
      />
    </div>
  );
};

export default HeadImage;
