import { DataClient } from '@21epub/epub-data-client'
import { Button, Col, Row } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SinglePrizeProps } from '../types'
import styles from './index.module.less'
import MyPrizeContent from './MyPrizeContent'

interface Props {
  myPrizeListUrl: string
  prefix: string
  url: string
}

const MyPrizeButton = ({ myPrizeListUrl, prefix, url }: Props) => {
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state) // 获取保存的状态

  const [isModalShow, setIsModalShow] = useState(false)

  const myPrizeListClient = useMemo(() => {
    const client = new DataClient<SinglePrizeProps>(myPrizeListUrl)
    return client
  }, [myPrizeListUrl])

  useEffect(() => {
    myPrizeListClient.getAll()
  }, [myPrizeListUrl])

  const myPrizeList = myPrizeListClient.useData()

  const getMyPrize = () => {
    myPrizeListClient.getAll()
    setIsModalShow(true)
  }

  const handleOk = (myPrizeList: any) => {
    setIsModalShow(false)
    if (state.shouldUserInfoModalShow && myPrizeList?.length) {
      dispatch({ type: 'IsUserInfoModalShow', value: true })
    }
  }

  return (
    <div className={styles.myPrize}>
      <img
        className='prizeButton'
        src={url || `${prefix}diazo/images/lottery/myPrize.png`}
        onClick={getMyPrize}
      />
      <Modal
        title={
          <Row style={{ height: '20px' }}>
            <Col span={10}>我的奖品</Col>
            <Col>
              {state.isCopySuccess && (
                <Button
                  type='primary'
                  size='small'
                  style={{ cursor: 'default' }}
                >
                  复制成功！
                </Button>
              )}
            </Col>
          </Row>
        }
        visible={isModalShow}
        footer={[
          <Button
            onClick={() => handleOk(myPrizeList)}
            type='primary'
            key='myPrizeButtonPic'
          >
            确定
          </Button>
        ]}
        closable={false}
      >
        <MyPrizeContent myPrizeList={myPrizeList} prefix={prefix} />
      </Modal>
    </div>
  )
}

export default MyPrizeButton
