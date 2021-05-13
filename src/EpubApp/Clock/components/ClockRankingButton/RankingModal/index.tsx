import React, { FC } from 'react';
import { Modal, Table, Tabs, List, Avatar } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { rankingColumns } from './TabsConfig';
import { Wrapper } from './Styled';

export interface RankingModalProps extends ModalProps {
  onCloseModal: () => void;
}

// 用于添加奖品与修改奖品
const RankingModal: FC<RankingModalProps> = (props) => {
  const { onCloseModal, ...rest } = props;
  // const [dataSource, setDataSource] = useState<[]>();
  const dataSource: any = [];

  const onTabsChange = (value: string) => {
    console.log('切换对应的配置面板', value);
  };

  const listData = [
    {
      userName: 'Ant Design Title 1'
    },
    {
      userName: 'Ant Design Title 2'
    },
    {
      userName: 'Ant Design Title 3'
    },
    {
      userName: 'Ant Design Title 4'
    }
  ];

  // 点击确定时
  const onOk = () => {
    onCloseModal();
  };

  // 点击取消时
  const onCancel = () => {
    onCloseModal();
  };

  return (
    <Wrapper>
      <Modal onOk={onOk} onCancel={onCancel} {...rest}>
        <Tabs size='small' defaultActiveKey='1' onChange={onTabsChange}>
          <Tabs.TabPane tab='打卡排行' key='clockRanking'>
            <Table
              size='small'
              columns={rankingColumns}
              dataSource={dataSource}
              locale={{ emptyText: '暂无数据' }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='打卡记录' key='clockRecords'>
            <List
              itemLayout='horizontal'
              dataSource={listData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                    }
                    title={<a href='https://ant.design'>{item.userName}</a>}
                    description='在5月1日打卡获得10积分'
                  />
                </List.Item>
              )}
            />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </Wrapper>
  );
};

export default RankingModal;
