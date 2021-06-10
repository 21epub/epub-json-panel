import React, { FC } from 'react';
import { Modal, Tabs } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import ParticipantsList from './ParticipantsList';
import RecordList from './RecordList';
import { Wrapper } from './Styled';

export interface RankingModalProps extends ModalProps {
  onCloseModal: () => void;
}

// 用于添加奖品与修改奖品
const RankingModal: FC<RankingModalProps> = (props) => {
  const { onCloseModal, ...rest } = props;

  return (
    <Wrapper>
      <Modal
        className='RankingModal'
        centered
        footer={null}
        destroyOnClose
        onCancel={onCloseModal}
        {...rest}
      >
        <Tabs size='small' defaultActiveKey='1'>
          <Tabs.TabPane tab='所有选手' key='signList'>
            <ParticipantsList />
          </Tabs.TabPane>
          <Tabs.TabPane tab='投票记录' key='pollRecords'>
            <RecordList />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </Wrapper>
  );
};

export default RankingModal;
