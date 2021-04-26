import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'antd';
import store from '../../../store';
import {
  getIndexList,
  getPicture,
  getPrizeIndex,
  formatPictureUrl
} from '../../../util';
import { getLotteryResult } from '../../../data/api';
import styles from './index.module.less';
import { cloneDeep } from 'lodash';
import type { UserInfoType, PrizeType } from '../../../type';

interface PrizeGridProps {
  prizeList: PrizeType[];
  prizeUrl?: string;
  userInfo: UserInfoType;
  getData: () => void;
}

const PrizeGrid: FC<PrizeGridProps> = (props) => {
  const { prizeList, prizeUrl, userInfo, getData } = props;
  const [state] = store.useRxjsStore();
  const {
    lotteryDetail,
    pictureList,
    shouldUserInfoModalShow,
    isClickable,
    lotteryUrlList
  } = state;
  const [activeIndex, setActiveIndex] = useState<undefined | number>();
  const [itemList, setItemList] = useState<PrizeType[]>([]);
  const gridBg1Pic = getPicture(lotteryDetail?.picture ?? [], 'gridBg1');
  const prizeBgPic = getPicture(lotteryDetail?.picture ?? [], 'prizeBg');
  const startBgPic = getPicture(lotteryDetail?.picture ?? [], 'startBg');
  const defaultGridBg1Pic = getPicture(pictureList, 'gridBg1');
  const defaultPrizeBgPic = getPicture(pictureList, 'prizeBg');
  const defaultStartBgPic = getPicture(pictureList, 'startBg');
  const defaultPrizePic = getPicture(pictureList, 'prize');

  const handleOnClick = async (prizeUrl: string | undefined) => {
    if (
      userInfo?.user_id === null &&
      lotteryDetail?.need_user_info &&
      shouldUserInfoModalShow
    ) {
      store.reducers.setIsUserInfoModalShow(true);
    } else if (
      prizeUrl &&
      lotteryDetail?.remain_times &&
      (lotteryDetail?.remain_times === null || lotteryDetail?.remain_times > 0)
    ) {
      try {
        const response = await getLotteryResult(prizeUrl);
        const prize = response?.data?.data?.results[0];
        if (prize) {
          store.reducers.setIsClickable(false);
          let prizeIndex = getPrizeIndex(prize, prizeList);
          // 跳过开始抽奖按钮
          if (prizeIndex > 3) prizeIndex = prizeIndex + 1;
          const turnList = [0, 1, 2, 5, 8, 7, 6, 3];
          const indexList = getIndexList(prizeIndex, turnList);
          let i = 0;
          const timeId = setInterval(() => {
            setActiveIndex(indexList[i]);
            i += 1;
            if (i >= indexList.length) {
              clearInterval(timeId);
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
                    setActiveIndex(undefined);
                    if (
                      prize?.objective?.prize_type &&
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
          }, 100);
          // setBorderActive((b) => !b)
        }
      } catch (error) {
        Modal.info({
          title: error.response.data,
          okText: '查看我的奖品',
          onOk() {
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
        onOk() {}
      });
    }
  };

  useEffect(() => {
    const temp = cloneDeep(prizeList);
    setItemList(temp);
  }, [prizeList]);

  if (itemList?.length) {
    itemList?.length === 8 &&
      itemList.splice(4, 0, {
        id: 'lotteryButton',
        ranking: 'lotteryButton'
      } as PrizeType);

    const prizeBackground = `url(${prizeBgPic || defaultPrizeBgPic})`;
    const startBackground = `url(${startBgPic || defaultStartBgPic})`;

    return (
      <div className={styles.prizeGridWrap}>
        <div
          className='gridBg'
          style={{
            backgroundImage: `url(${gridBg1Pic || defaultGridBg1Pic})`,
            backgroundSize: '100% 100%',
            height: '300px',
            width: '300px',
            display: 'grid',
            paddingTop: '26px',
            paddingLeft: '25px',
            gridTemplateColumns: '83px 83px 83px',
            gridTemplateRows: '83px 83px 83px'
          }}
        >
          {itemList.map((it, index: number) => {
            return (
              <div
                key={it.id}
                className={index === activeIndex ? 'active' : ''}
                style={{
                  backgroundImage: `${
                    index === 4 ? startBackground : prizeBackground
                  }`,
                  backgroundSize: '100% 100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: `${
                    index === 4 && isClickable ? 'pointer' : 'default'
                  }`,
                  margin: '4px'
                }}
                onClick={
                  index === 4 ? () => handleOnClick(prizeUrl) : undefined
                }
              >
                {index !== 4 && (
                  <img
                    src={formatPictureUrl(
                      it.picture || defaultPrizePic,
                      lotteryUrlList?.web_url
                    )}
                    width='40%'
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <div />;
};

export default PrizeGrid;
