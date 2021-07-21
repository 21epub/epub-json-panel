import React, { FC, useState } from 'react';
import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import store from '../../store';
import { getPicture } from '../../util';
import styles from './index.module.less';

interface RulesButtonProps {
  rules?: string;
  isShow?: boolean;
}

const RulesButton: FC<RulesButtonProps> = (props) => {
  const { rules, isShow } = props;
  const [isModalShow, setIsModalShow] = useState(false);
  const [state] = store.useRxjsStore();
  const { pictureList, lotteryDetail } = state;
  const rulePic = getPicture(lotteryDetail?.picture ?? [], 'rule');
  const defaultRulePic = getPicture(pictureList, 'rule');

  const getRules = () => {
    setIsModalShow(true);
  };

  const handleOk = () => {
    setIsModalShow(false);
  };

  return (
    <div className={styles.rulesButtonBox}>
      {isShow && (
        <div>
          <img
            className='ruleButton'
            src={rulePic || defaultRulePic}
            onClick={getRules}
          />
          <Modal
            title='规则说明'
            visible={isModalShow}
            footer={[
              <Button onClick={handleOk} type='primary' key='rulesPic'>
                确定
              </Button>
            ]}
            closable={false}
          >
            <div
              className={styles.ruleBox}
              dangerouslySetInnerHTML={{ __html: rules ?? '' }}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default RulesButton;
