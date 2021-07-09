import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Avatar, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd/lib/table';
import type { ModalProps } from 'antd/lib/modal';
import { useRequest, useInViewport } from 'ahooks';
import { queryTaskRecord } from '../../../data/api';
import { StateType } from '../../../store';
import { RecordListWrapper } from './Styled';

interface RecordProps extends ModalProps {}

type RecordListProps = TableProps<any> & RecordProps;

// 浏览记录列表
const RecordList: FC<RecordListProps> = (props) => {
  const { ...rest } = props;
  const { taskListApiProps } = useSelector((state: StateType) => state);
  const { slug } = taskListApiProps ?? {};
  // const [hasMore, setHasMore] = useState<boolean>(false);
  const inViewPort = useInViewport(() =>
    document.querySelector('#TaskRecordListPage')
  );

  const { data: taskListRecord, run: runQueryPollRecordList } = useRequest(
    () => queryTaskRecord(slug ?? ''),
    {
      manual: true,
      ready: !!slug,
      throwOnError: true
    }
  );

  // 请求数据接口
  const loadMore = (page: number) => {
    // console.log('加载更多');
    // runQueryPollRecordList();
  };

  useEffect(() => {
    if (inViewPort) {
      // 每次进入当前页时，请求最新数据
      runQueryPollRecordList();
    }
  }, [inViewPort]);

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
          pageStart={0}
          loadMore={loadMore}
          hasMore
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
