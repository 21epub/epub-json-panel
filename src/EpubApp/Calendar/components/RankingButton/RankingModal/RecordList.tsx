import React, { FC, useEffect } from 'react';
import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd/lib/table';
import InfiniteScroll from 'react-infinite-scroller';
import { useRequest, useInViewport } from 'ahooks';
import { queryPollRecordList } from '../../../data/api';
import store from '../../../store';
import { RecordListWrapper } from './Styled';

interface RecordProps {}

type RecordListProps = TableProps<any> & RecordProps;

// 个人投票记录列表
const RecordList: FC<RecordListProps> = () => {
  const [state] = store.useRxjsStore();
  const { pollApiProps } = state;
  const { slug } = pollApiProps ?? {};
  // const [hasMore, setHasMore] = useState<boolean>(false);
  const inViewPort = useInViewport(() =>
    document.querySelector('#RecordListPage')
  );

  const { data: pollRecordList, run: runQueryPollRecordList } = useRequest(
    () => queryPollRecordList(slug ?? ''),
    {
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
    <RecordListWrapper id='RecordListPage'>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={loadMore}
        hasMore
        useWindow={false}
      >
        <List
          itemLayout='horizontal'
          dataSource={pollRecordList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar icon={<UserOutlined />} src={item.poll_avatar} />
                }
                title={item.poll_name}
                description={`在 ${item.created} 给 ${item.player_number}号 投了一票`}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </RecordListWrapper>
  );
};

export default RecordList;
