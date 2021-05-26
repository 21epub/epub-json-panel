import React from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { ClockRankingType } from '../../../type';

export const rankingColumns: ColumnsType<ClockRankingType> = [
  {
    title: '序号',
    dataIndex: 'key',
    width: '15%',
    align: 'center'
  },
  {
    title: '头像',
    dataIndex: 'initiator_avatar',
    width: '15%',
    align: 'center',
    render: (record: string) => {
      return <img src={record} />;
    }
  },
  {
    title: '昵称',
    dataIndex: 'initiator_username',
    width: '25%',
    align: 'center',
    ellipsis: true
  },
  {
    title: '累计签到',
    dataIndex: 'total_clock_num_each_one',
    width: '25%',
    align: 'center'
  },
  {
    title: '连续签到',
    dataIndex: 'keep_clock_num_each_one',
    width: '25%',
    align: 'center'
  }
];
