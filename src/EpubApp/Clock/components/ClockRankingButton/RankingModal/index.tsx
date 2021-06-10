import React, { FC } from 'react';
import { Modal, Table, Tabs, List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ModalProps } from 'antd/lib/modal';
import { useRequest, useUpdateEffect } from 'ahooks';
import { isEmpty } from 'lodash';
import { queryClockRanking } from '../../../data/api';
import store from '../../../store';
import { rankingColumns } from './TabsConfig';
import { Wrapper } from './Styled';
import { ClockRankingType } from '../../../type';

export interface RankingModalProps extends ModalProps {
  onCloseModal: () => void;
}

// 用于添加奖品与修改奖品
const RankingModal: FC<RankingModalProps> = (props) => {
  const { onCloseModal, ...rest } = props;
  const [state] = store.useRxjsStore();
  const { clockApiProps, clockEvent, clockRecord } = state;
  const slug = clockApiProps?.slug ?? '';

  // 查询签到排行榜详情接口
  const {
    data: clockRanking,
    loading: rankingLoading,
    run: runQueryClockRanking
  } = useRequest(() => queryClockRanking(slug ?? ''), {
    ready: !!clockApiProps?.slug && !!clockEvent,
    manual: true,
    throwOnError: true
  });

  // 点击确定时
  const onOk = () => {
    onCloseModal();
  };

  // 点击取消时
  const onCancel = () => {
    onCloseModal();
  };

  useUpdateEffect(() => {
    if (!rankingLoading && clockRanking) {
      // 处理表单返回的奖品列表数据，使之符合表格的数据格式
      clockRanking.forEach((draft: ClockRankingType, index: number) => {
        // 给数据添加key用于表格组件渲染
        draft.key = index + 1;
      });
    }
  }, [rankingLoading, clockRanking]);

  useUpdateEffect(() => {
    if (clockRecord) {
      runQueryClockRanking();
    }
  }, [clockRecord]);

  return (
    <Wrapper>
      <Modal
        centered
        className='clockRankingModal'
        onOk={onOk}
        onCancel={onCancel}
        {...rest}
      >
        <Tabs size='small' defaultActiveKey='1'>
          <Tabs.TabPane tab='打卡排行' key='clockRanking'>
            {!rankingLoading && (
              <Table
                size='small'
                columns={rankingColumns}
                dataSource={clockRanking}
                scroll={{ y: 370 }}
                pagination={false}
                locale={{ emptyText: '暂无数据' }}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab='打卡记录' key='clockRecords'>
            {!isEmpty(clockRecord) && (
              <List
                itemLayout='horizontal'
                dataSource={clockRecord}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={<UserOutlined />}
                          src={item.initiator_avatar}
                        />
                      }
                      title={item.initiator_name || item.initiator_username}
                      description={`在${item.created}打卡成功`}
                    />
                  </List.Item>
                )}
              />
            )}
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </Wrapper>
  );
};

export default RankingModal;
