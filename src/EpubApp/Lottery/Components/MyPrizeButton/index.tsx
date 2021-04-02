import React, { FC, useMemo, useEffect } from 'react'
import { DataClient } from '@21epub/epub-data-client'
import { Button, Col, Row } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { SinglePrizeProps } from '../../type'
import styles from './index.module.less'
import MyPrizeContent from '../MyPrizeContent'

interface MyPrizeButtonProps {
  myPrizeListUrl?: string
  prefix: string
  url: string
}

const MyPrizeButton: FC<MyPrizeButtonProps> = (props) => {
  const { myPrizeListUrl = '', prefix, url } = props
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state) // 获取保存的状态

  const myPrizeListClient = useMemo(() => {
    return new DataClient<SinglePrizeProps>(myPrizeListUrl)
  }, [myPrizeListUrl])

  useEffect(() => {
    myPrizeListUrl && myPrizeListClient.getAll()
  }, [myPrizeListUrl])

  const myPrizeList = myPrizeListClient.useData()

  const getMyPrize = () => {
    myPrizeListClient.getAll()
    dispatch({ type: 'isPrizeModalShow', value: true })
  }

  const handleOk = (myPrizeList: any) => {
    dispatch({ type: 'isPrizeModalShow', value: false })

    if (state.shouldUserInfoModalShow && myPrizeList?.length) {
      dispatch({ type: 'IsUserInfoModalShow', value: true })
    }
  }

  return (
    <div className={styles.myPrize}>
      <img
        className='prizeButton'
        src={url || `${prefix}diazo/images/lottery/common/myPrize.png`}
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
        visible={state.isPrizeModalShow}
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
