import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
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
      return <Avatar icon={<UserOutlined />} src={record} />;
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

// 测试mock数据
// export const tableList = () => {
//   const data: ClockRankingType[] = [];
//   for (let i = 0; i < 100; i++) {
//     data.push({
//       key: i + 1,
//       initiator_avatar:
//         '//cdn1.zhizhucms.com/weixin/cr4fig/8089a61e74314d77379ba7c7f00a655a.png',
//       initiator_username: `${32 + i}`,
//       total_clock_num_each_one: i,
//       keep_clock_num_each_one: i,
//     });
//   }
//   return data;
// };

// export const listData = () => {
//   const data: ClockRecordType[] = [];
//   for (let i = 0; i < 100; i++) {
//     data.push({
//       created: `${i}`,
//       initiator_avatar:
//         '//cdn1.zhizhucms.com/weixin/cr4fig/8089a61e74314d77379ba7c7f00a655a.png',
//       initiator_name: `${i}`,
//       initiator_username: `${32 + i}`,
//     });
//   }
//   return data;
// };
