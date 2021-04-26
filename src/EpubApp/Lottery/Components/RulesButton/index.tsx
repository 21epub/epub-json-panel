import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';
import { StateType } from '../../store/reducer';
import { getPicture } from '../../util';
import styles from './index.module.less';

interface RulesButtonProps {
  rules: string;
}

const RulesButton: FC<RulesButtonProps> = (props) => {
  const { rules } = props;
  const [isModalShow, setIsModalShow] = useState(false);
  const { pictureList, lotteryDetail } = useSelector(
    (state: StateType) => state
  ); // 获取保存的状态
  const rulePic = getPicture(lotteryDetail.picture, 'rule');
  const defaultRulePic = getPicture(pictureList, 'rule');

  const getRules = () => {
    setIsModalShow(true);
  };

  const handleOk = () => {
    setIsModalShow(false);
  };

  return (
    <div className={styles.rulesButton}>
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
        <div dangerouslySetInnerHTML={{ __html: rules }} />
      </Modal>
    </div>
  );
};

export default RulesButton;
