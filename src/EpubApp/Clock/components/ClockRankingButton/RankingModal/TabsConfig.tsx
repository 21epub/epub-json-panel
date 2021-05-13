import React from 'react';
import type { ColumnsType } from 'antd/lib/table';

export const rankingColumns: ColumnsType<[]> = [
  {
    title: '序号',
    dataIndex: 'key',
    width: '50px',
    align: 'center'
  },
  {
    title: '头像',
    dataIndex: 'prize_type',
    width: 100 / 8,
    align: 'center',
    render: (record: string) => (
      <span>{String(record) === '0' ? '非奖品' : '实物'}</span>
    )
  },
  {
    title: '昵称',
    dataIndex: 'ranking',
    width: 100 / 8,
    align: 'center'
  },
  {
    title: '累计签到次数',
    dataIndex: 'title',
    width: 100 / 8,
    align: 'center'
  },
  {
    title: '连续签到次数',
    dataIndex: 'total_num',
    width: 100 / 8,
    align: 'center'
  }
];
