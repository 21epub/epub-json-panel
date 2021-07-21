import React, { FC, useMemo, useEffect } from 'react';
import { DataClient } from '@21epub/epub-data-client';
import { Button, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { WinnerType } from '../../type';
import { getPicture } from '../../util';
import styles from './index.module.less';
import MyPrizeContent from './MyPrizeContent';
import store from '../../store';

interface MyPrizeButtonProps {
  myPrizeListUrl?: string;
  isShow?: boolean;
}

const MyPrizeButton: FC<MyPrizeButtonProps> = (props) => {
  const { myPrizeListUrl = '', isShow } = props;
  const [state] = store.useRxjsStore();
  const { lotteryDetail, pictureList, isPrizeModalShow, isCopySuccess } = state;
  const defaultMyPrizePic = getPicture(pictureList, 'myPrize');
  const myPrizePic = getPicture(lotteryDetail?.picture ?? [], 'myPrize');

  const myPrizeListClient = useMemo(() => {
    return new DataClient<WinnerType>(myPrizeListUrl);
  }, [myPrizeListUrl]);

  useEffect(() => {
    myPrizeListUrl && myPrizeListClient.getAll();
  }, [myPrizeListUrl]);

  const myPrizeList = myPrizeListClient.useData();

  const getMyPrize = () => {
    myPrizeListClient.getAll();
    store.reducers.setIsPrizeModalShow(true);
  };

  const handleOk = () => {
    store.reducers.setIsPrizeModalShow(false);
  };

  return (
    <div className={styles.myPrize}>
      {isShow && (
        <div>
          <img
            className='prizeButton'
            src={myPrizePic || defaultMyPrizePic}
            onClick={getMyPrize}
          />
          <Modal
            title={
              <Row style={{ height: '20px' }}>
                <Col span={10}>我的奖品</Col>
                <Col>
                  {isCopySuccess && (
                    <Button
                      type='primary'
                      size='small'
                      style={{ cursor: 'default' }}
                    >
                      复制成功！
                    </Button>
                  )}
                </Col>
              </Row>
            }
            visible={isPrizeModalShow}
            footer={[
              <Button
                onClick={() => handleOk(myPrizeList)}
                type='primary'
                key='myPrizeButtonPic'
              >
                确定
              </Button>
            ]}
            closable={false}
          >
            <MyPrizeContent myPrizeList={myPrizeList} />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default MyPrizeButton;
