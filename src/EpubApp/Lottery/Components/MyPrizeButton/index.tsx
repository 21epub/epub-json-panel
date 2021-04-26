import React, { FC, useMemo, useEffect } from 'react';
import { DataClient } from '@21epub/epub-data-client';
import { Button, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { WinnerType } from '../../type';
import { getPicture } from '../../util';
import styles from './index.module.less';
import MyPrizeContent from './MyPrizeContent';
import { StateType } from '../../store/reducer';

interface MyPrizeButtonProps {
  myPrizeListUrl?: string;
}

const MyPrizeButton: FC<MyPrizeButtonProps> = (props) => {
  const { myPrizeListUrl = '' } = props;
  const dispatch = useDispatch();
  const {
    lotteryDetail,
    pictureList,
    shouldUserInfoModalShow,
    isPrizeModalShow,
    isCopySuccess
  } = useSelector((state: StateType) => state); // 获取保存的状态
  const defaultMyPrizePic = getPicture(pictureList, 'myPrize');
  const myPrizePic = getPicture(lotteryDetail.picture, 'myPrize');

  const myPrizeListClient = useMemo(() => {
    return new DataClient<WinnerType>(myPrizeListUrl);
  }, [myPrizeListUrl]);

  useEffect(() => {
    myPrizeListUrl && myPrizeListClient.getAll();
  }, [myPrizeListUrl]);

  const myPrizeList = myPrizeListClient.useData();

  const getMyPrize = () => {
    myPrizeListClient.getAll();
    dispatch({ type: 'isPrizeModalShow', value: true });
  };

  const handleOk = (myPrizeList: WinnerType[]) => {
    dispatch({ type: 'isPrizeModalShow', value: false });
    if (shouldUserInfoModalShow && myPrizeList?.length) {
      dispatch({ type: 'IsUserInfoModalShow', value: true });
    }
  };

  return (
    <div className={styles.myPrize}>
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
  );
};

export default MyPrizeButton;
