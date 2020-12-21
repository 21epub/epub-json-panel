import { Table } from 'antd'
import * as React from 'react'
// import styles from './index.module.less'
import 'antd/es/table/style/index.css'

interface Props {
  url: string
}

const columns = [
  {
    title: '序号',
    dataIndex: 'keys',
    width: 100 / 7
  },
  {
    title: '奖项',
    dataIndex: 'prize',
    width: 100 / 7
  },
  {
    title: '奖项名称',
    dataIndex: 'prizeName',
    width: 100 / 7
  },
  {
    title: '奖项图片',
    dataIndex: 'prizePic',
    width: 100 / 7
  },
  {
    title: '奖项数量',
    dataIndex: 'prizeNum',
    width: 100 / 7
  },
  {
    title: '中奖概率（%）',
    dataIndex: 'prizeProbability',
    width: 100 / 7
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 100 / 7
  }
]

const data: any = []
const TableEditor = ({ url }: Props) => {
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default TableEditor
