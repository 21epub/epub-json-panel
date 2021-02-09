import { Button, Col, Row, Space } from 'antd'
import React from 'react'
import copy from 'copy-to-clipboard'
import styles from './index.module.less'

interface Props {
  myPrizeList: any
  prefix: string
}

const MyPrizeContent = ({ myPrizeList, prefix }: Props) => {
  const copyContent = (id: string) => {
    copy(id)
  }

  if (myPrizeList?.length) {
    return (
      <div className={styles.myPrizeContent}>
        {myPrizeList.map((item: any) => {
          return (
            <div key={item.id}>
              <Row>
                <Col span={6} offset={2}>
                  <img
                    src={
                      item.objective.picture ||
                      `${prefix}diazo/images/lottery/prize.png`
                    }
                    alt='err'
                    width='100%'
                  />
                </Col>
                <Col span={14} offset={2}>
                  <div>
                    {item.initiator_username &&
                      `姓名：${item.initiator_username}`}
                  </div>
                  <div>
                    {item.objective.ranking &&
                      `奖项：${item.objective.ranking}`}
                  </div>
                  <div>
                    {item.objective.title && `名称：${item.objective.title}`}
                  </div>
                  <div>
                    {String(item.received) &&
                      `已领取：${item.received === 0 ? '是' : '否'}`}
                  </div>
                  <div>{item.created && `中奖时间：${item.created}`}</div>
                  <Space size='large'>
                    中奖码：
                    <Button onClick={() => copyContent(item.id)} size='small'>
                      复制中奖码
                    </Button>
                  </Space>
                  <div>{item.id}</div>
                </Col>
              </Row>
              <br />
            </div>
          )
        })}
      </div>
    )
  } else {
    return <div key='noPrize'>暂无奖品</div>
  }
}

export default MyPrizeContent
