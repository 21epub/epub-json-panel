import React, { FC, useState } from 'react';
import { Button, Card, List, message, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import InfiniteScroll from 'react-infinite-scroller';
import {
  ParticipantsListWrapper,
  ParticipantsInfoWrapper,
  RankingBgWrapper
} from './Styled';
import PersonalInfo from '../../PersonalInfo';
import { querySignList, createPollRecord } from '../../../data/api';
import { getPicture } from '../../../util';
import store from '../../../store';

interface RankMapType {
  [key: number]: string;
}

interface ParticipantsListProps {}

// 参赛选手列表
const ParticipantsList: FC<ParticipantsListProps> = () => {
  const [state] = store.useRxjsStore();
  const { pollApiProps, pollPicture, pollDetail, pollEvent } = state;
  const { slug } = pollApiProps ?? {};
  // const [hasMore, setHasMore] = useState<boolean>(true);
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const [signSlug, setSignSlug] = useState<string>('');
  // const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(30);
  const [fuzzyQuery, setFuzzyQuery] = useState<string>('');
  const defaultRankingBg = getPicture(pollPicture || [], 'rankingBg') ?? '';

  //  返回排名图片
  const getRankPicture = (rank: number) => {
    const rankMap: RankMapType = {
      1: 'first',
      2: 'second',
      3: 'third'
    };
    return getPicture(pollPicture || [], rankMap[rank]) ?? '';
  };

  const { data: signList, run: runQuerySignList, loading } = useRequest(
    () => querySignList(slug ?? '', { page: 1, size, fuzzy_query: fuzzyQuery }),
    {
      ready: !!slug,
      throwOnError: true
    }
  );

  // 新建投票记录
  const { loading: pollRecordLoading, run: runCreatePollRecord } = useRequest(
    (sign_slug) => createPollRecord(slug ?? '', sign_slug),
    {
      ready: !!slug,
      manual: true,
      throwOnError: true,
      onSuccess: () => {
        message.success('投票成功');
        // 投票成功后，重新查询最新的数据
        runQuerySignList();
        if (pollEvent) {
          pollEvent.onPollSuccess();
        }
      },
      onError: (err: any) => {
        if (pollEvent) {
          pollEvent.onPollFail();
        }
        message.error(err?.response?.data?.non_field_errors?.[0]);
      }
    }
  );

  // 加载更多
  const loadMore = (page: number) => {
    // setPage(page);
    setSize(page * 30);
    runQuerySignList();
  };

  // 投票按钮
  const onPollClick = (sign_slug?: string) => {
    if (sign_slug) {
      runCreatePollRecord(sign_slug);
    }
  };

  // 打开参赛选手详情面板
  const onOpenParticipantInfoModal = (sign_slug?: string) => {
    if (sign_slug) {
      setSignSlug(sign_slug);
      setIsModalShow(true);
    }
  };

  // 关闭投票详情页时
  const onCancel = () => {
    setIsModalShow(false);
    // 请求最新数据
    runQuerySignList();
  };

  // 搜索输入框输入文字时
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 设置模糊查询需要的关键字
    setFuzzyQuery(e.target.value);
  };

  // 关闭投票详情页时
  const onSearch = () => {
    runQuerySignList();
  };

  return (
    <ParticipantsListWrapper>
      <Input
        placeholder='请输入选手姓名或编号'
        allowClear
        size='small'
        onChange={onInputChange}
        style={{ width: '90%' }}
        suffix={
          <Button type='text' icon={<SearchOutlined />} onClick={onSearch} />
        }
      />
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={loadMore}
        hasMore={!loading}
        // loader={<Spin />}
        useWindow={false}
      >
        <List
          grid={{ gutter: 10, column: 2 }}
          dataSource={signList}
          renderItem={(item) => (
            <List.Item>
              <RankingBgWrapper backgroundImage={defaultRankingBg}>
                {item?.player_rank <= 3 ? (
                  <img src={getRankPicture(item?.player_rank)} />
                ) : (
                  <div>{item?.player_rank}</div>
                )}
              </RankingBgWrapper>
              <Card
                cover={
                  <>
                    <img
                      src={item.cover}
                      onClick={() => onOpenParticipantInfoModal(item.slug)}
                    />
                    <div className='cardTitle'>{item.sign_title}</div>
                  </>
                }
              >
                <ParticipantsInfoWrapper>
                  <span>{item.player_number}号</span>
                  <span className='playerPollNum'>
                    {item.player_poll_num}票
                  </span>
                </ParticipantsInfoWrapper>
                <Button
                  type='primary'
                  style={{ width: '100%' }}
                  loading={pollRecordLoading}
                  onClick={() => onPollClick(item.slug)}
                >
                  投票
                </Button>
              </Card>
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <PersonalInfo
        sign_slug={signSlug}
        slug={pollDetail?.slug}
        visible={isModalShow}
        onCancel={onCancel}
      />
    </ParticipantsListWrapper>
  );
};

export default ParticipantsList;
