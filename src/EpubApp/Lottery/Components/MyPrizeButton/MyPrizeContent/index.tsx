import React, { FC } from 'react';
import { Button, Col, Row, Space } from 'antd';
import copy from 'copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { getPicture, formatPictureUrl } from '../../../util';
import type { WinnerType } from '../../../type';
import styles from './index.module.less';
import { StateType } from '../../../store/reducer';

interface MyPrizeContentProps {
  myPrizeList: WinnerType[];
}

const MyPrizeContent: FC<MyPrizeContentProps> = (props) => {
  const { myPrizeList } = props;
  const dispatch = useDispatch();
  const { pictureList, lotteryUrlList } = useSelector(
    (state: StateType) => state
  ); // 获取保存的状态
  const defaultPrizePic = getPicture(pictureList, 'prize');
  const copyContent = (id: string) => {
    if (copy(id)) {
      dispatch({ type: 'isCopySuccess', value: true });
      setTimeout(() => {
        dispatch({ type: 'isCopySuccess', value: false });
      }, 800);
    }
  };

  if (myPrizeList?.length) {
    return (
      <div className={styles.myPrizeContent}>
        {myPrizeList.map((item: any) => {
          return (
            <div key={item.id}>
              <Row>
                <Col span={6} offset={2}>
                  <img
                    src={formatPictureUrl(
                      item.objective?.picture || defaultPrizePic,
                      lotteryUrlList.web_url
                    )}
                    alt='err'
                    width='80%'
                  />
                </Col>
                <Col span={14} offset={2}>
                  <div>{item.name && `姓名：${item.name}`}</div>
                  <div>
                    {item.objective.ranking &&
                      `奖项：${item.objective.ranking}`}
                  </div>
                  <div>
                    {item.objective.title && `名称：${item.objective.title}`}
                  </div>
                  <div>
                    {String(item.received) &&
                      `已领取：${item.received === 0 ? '是' : '否'}`}
                  </div>
                  <div>{item.created && `中奖时间：${item.created}`}</div>
                  <Space size='large'>
                    中奖码：
                    <Button onClick={() => copyContent(item.id)} size='small'>
                      复制中奖码
                    </Button>
                  </Space>
                  <div>{item.id}</div>
                </Col>
              </Row>
              <br />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div key='noPrize'>暂无奖品</div>;
  }
};

export default MyPrizeContent;
