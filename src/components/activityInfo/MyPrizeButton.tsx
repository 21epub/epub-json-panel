import { DataClient } from '@21epub/epub-data-client'
import { Button, Col, Row, Space } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import copy from 'copy-to-clipboard'
import React, { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SinglePrizeProps } from '../types'
import styles from './index.module.less'

interface Props {
  myPrizeListUrl: string
  prefix: string
}

const MyPrizeButton = ({ myPrizeListUrl, prefix }: Props) => {
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state) // 获取保存的状态

  const [isModalShow, setIsModalShow] = useState(false)
  const [content, setContent] = useState(<div key='noPrize'>暂无奖品</div>)

  const myPrizeListClient = useMemo(() => {
    const client = new DataClient<SinglePrizeProps>(myPrizeListUrl)
    return client
  }, [myPrizeListUrl])

  useEffect(() => {
    myPrizeListClient.getAll()
  }, [myPrizeListUrl])

  const myPrizeList = myPrizeListClient.useData()

  const copyContent = (id: string) => {
    copy(id)
  }

  const getMyPrize = () => {
    myPrizeListClient.getAll()
    console.log('myPrizeList', myPrizeList)

    if (myPrizeList?.length) {
      const prize = (
        <div key='myPrizeList'>
          {myPrizeList.map((item) => {
            return (
              <div key={item.id}>
                <Row>
                  <Col span={8}>
                    <img
                      src={
                        item.objective.picture ||
                        `${prefix}diazo/images/lottery/prize.png`
                      }
                      alt='err'
                      width='100%'
                    />
                  </Col>
                  <Col span={15} offset={1}>
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
                        `已领取：${item.received === 0 ? '否' : '是'}`}
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

      setContent(prize)
      setIsModalShow(true)
    } else {
      setIsModalShow(true)
    }
  }

  const handleOk = () => {
    setIsModalShow(false)
    if (state.shouldUserInfoModalShow && myPrizeList?.length) {
      dispatch({ type: 'IsUserInfoModalShow', value: true })
    }
  }

  return (
    <div className={styles.myPrize}>
      <img
        className='prizeButton'
        src={`${prefix}diazo/images/lottery/myPrize.png`}
        onClick={getMyPrize}
      />
      <Modal
        title='我的奖品'
        visible={isModalShow}
        footer={[
          <Button onClick={handleOk} type='primary' key='myPrizeButtonPic'>
            确定
          </Button>
        ]}
        closable={false}
      >
        <div className={styles.myPrizeContent}>{content}</div>
      </Modal>
    </div>
  )
}

export default MyPrizeButton
