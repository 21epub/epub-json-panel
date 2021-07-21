import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
import { getNow } from '../../util';
import store from '../../store';
import styles from './index.module.less';

interface ActivityTimeModalProps {
  startTime: string | null;
  endTime: string | null;
  isModalShow: boolean;
}

const ActivityTimeModal: FC<ActivityTimeModalProps> = (props) => {
  const { startTime, endTime, isModalShow } = props;
  const [content, setContent] = useState('');

  const format = 'YYYY-MM-DD hh:mm:ss';

  useEffect(() => {
    const beforeTime = moment(startTime, format);
    const afterTime = moment(endTime, format);
    const now = moment(getNow(), format);

    if (startTime && endTime) {
      if (now.isBefore(beforeTime)) {
        setContent('活动未开始，请耐心等待！');
        store.reducers.setBetweenActivityTime(false);
      } else if (now.isAfter(afterTime)) {
        setContent('活动已结束，感谢参与！');
        store.reducers.setBetweenActivityTime(false);
      }
    }
  }, [startTime, endTime]);

  const handleOk = () => {
    store.reducers.setIsActivityTimeModalShow(false);
  };

  return (
    <div className={styles.activityTimeModal}>
      <Modal
        visible={isModalShow}
        footer={[
          <Button onClick={handleOk} type='primary' key='activityTimeButton'>
            确定
          </Button>
        ]}
        closable={false}
      >
        <div className='activityTimeModal'>
          <br />
          {content}
        </div>
      </Modal>
    </div>
  );
};

export default ActivityTimeModal;
