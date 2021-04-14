import React, { FC } from 'react';

interface PopUpInfoProps {
  value: string;
  onClose: () => void;
}

// 弹出菜单
const PopUpInfo: FC<PopUpInfoProps> = (props) => {
  const { value, onClose } = props;
  return (
    <div className='c-div DIV_R5WrBr'>
      <div className='block c-div DIV_5eZtqX2'>
        <div className='bottom-border c-div'>
          <div className='c-div DIV_bEvLxo2'>
            <p className='c-paragraph'>{value}</p>
          </div>
        </div>
        <div className='c-div DIV_PJeoHZ'>
          <a className='btn c-linkblock A_54k3OP' href='#' onClick={onClose}>
            <p className='c-paragraph P_j3Tuu5'>关 闭</p>
          </a>
        </div>
      </div>
      {value === '点击右上角分享邀请好友' && (
        <img
          className='c-image IMG_W475jw'
          src='http://qty83k.creatby.com/materials/2/origin/6de751c5d68e24b092484fd79396a490_origin.png'
        />
      )}
    </div>
  );
};

export default PopUpInfo;
