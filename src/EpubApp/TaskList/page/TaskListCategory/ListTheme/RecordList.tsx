import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Avatar, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd/lib/table';
import type { ModalProps } from 'antd/lib/modal';
import { useRequest, useInViewport } from 'ahooks';
import { queryTaskRecord } from '../../../data/api';
import type { TaskListApiPropsType } from '../../../type';
import { RecordListWrapper } from './Styled';

type RecordListProps = TableProps<any> &
  ModalProps & {
    taskListApiProps: TaskListApiPropsType;
  };

// 浏览记录列表
const RecordList: React.FC<RecordListProps> = (props) => {
  const { taskListApiProps, ...rest } = props;
  const { slug } = taskListApiProps ?? {};
  const inViewPort = useInViewport(() =>
    document.querySelector('#TaskRecordListPage')
  );

  const {
    data: taskListRecord,
    loading,
    run: runQueryPollRecordList
  } = useRequest((page) => queryTaskRecord(slug ?? '', page), {
    manual: true,
    ready: !!slug,
    throwOnError: true
  });

  // 请求数据接口
  const loadMore = (page: number) => {
    runQueryPollRecordList(page * 10);
  };

  useEffect(() => {
    if (inViewPort) {
      // 每次进入当前页时，请求最新数据
      runQueryPollRecordList(10);
    }
  }, [inViewPort, runQueryPollRecordList]);

  return (
    <Modal
      className='RankingModal'
      centered
      title='任务浏览记录'
      footer={null}
      destroyOnClose
      {...rest}
    >
      <RecordListWrapper id='TaskRecordListPage'>
        <InfiniteScroll
          initialLoad={false}
          pageStart={1}
          loadMore={loadMore}
          hasMore={!loading}
          useWindow={false}
        >
          <List
            itemLayout='horizontal'
            dataSource={taskListRecord}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} src={item.avatar} />}
                  title={item.username}
                  description={`在 ${item.created} 浏览了 ${item.task_title}`}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </RecordListWrapper>
    </Modal>
  );
};

export default RecordList;
