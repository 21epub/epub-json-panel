import { Modal, Input, Row, Col } from 'antd'
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { DataClient } from '@21epub/epub-data-client'
import {
  drawPrizeBlock,
  prizeToAngle,
  getRandomInt,
  getPrizeIndex
} from './util'
import Point from './img/point.png'
import TurntablePic from './img/turntable.png'
import styles from './turnTable.less'
import 'antd/dist/antd.css'

interface Props {
  prizeListUrl: string
  prizeUrl: string
  singleLotteryUrl: string
}
//     "color": '#fef8e6'

const TestCanvas = ({ prizeListUrl, prizeUrl, singleLotteryUrl }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [startRadian, setStartRadian] = useState(0)
  const [renew, setRenew] = useState(false)
  const [isModalShow, setIsModalShow] = useState(false)
  // const [confirmLoading, setConfirmLoading] = useState(false)

  const singlePrizeClient = useMemo(() => {
    const opt = {
      contentType: 'application/x-www-form-urlencoded' as 'application/x-www-form-urlencoded'
    }
    const client = new DataClient(prizeUrl, opt)
    return client
  }, [prizeUrl])

  const prizeListClient = useMemo(() => {
    const client = new DataClient(prizeListUrl)
    return client
  }, [prizeListUrl])

  const singleLotteryClient = useMemo(() => {
    const client = new DataClient(singleLotteryUrl)
    return client
  }, [singleLotteryUrl])

  useEffect(() => {
    singlePrizeClient.post().then((res) => {
      singlePrizeClient.updateLocal(res)
    })
    prizeListClient.getAll()
    singleLotteryClient.getAll()
    setRenew(false)
  }, [prizeUrl, prizeListUrl, singleLotteryUrl, renew])

  const prizeList = prizeListClient.useData()
  const prizes = singlePrizeClient.useData()
  const singleLottery = singleLotteryClient.useData()
  // console.log(prizeList, prizes, singleLottery)

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCtx(canvasRef?.current?.getContext('2d'))
      if (ctx && prizeList.length !== 0) {
        drawPrizeBlock(ctx, prizeList, startRadian)
      }
    }
    if (!singleLottery[0]?.need_user_info) {
      setIsModalShow(true)
    }
  }, [prizeList, singleLottery])

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCtx(canvasRef?.current?.getContext('2d'))
      if (ctx && prizeList.length !== 0) {
        drawPrizeBlock(ctx, prizeList, startRadian)
      }
    }
  }, [ctx, startRadian])

  const testFunc = (prizeList: any) => {
    return new Promise((resolve) => {
      if (prizes.length !== 0) {
        const prize = prizes[0]
        // debugger
        const prizeIndex = getPrizeIndex(prize, prizeList)
        const target = prizeToAngle(prizeIndex, prizeList.length) // prize对应第几个，prize总数
        const turns = getRandomInt(5, 15)
        const frame = getRandomInt(100, 400)

        const result = {
          status: 'success',
          prize: prize
        }

        for (let i = 1; i <= frame; i += 1) {
          const interval = (target + 2 * Math.PI * turns) / frame
          setTimeout(() => {
            setStartRadian(interval * i)
            if (i === frame) resolve(result)
          }, 100)
        }
      }
    })
  }

  const lottery = (prizeList: any, singleLottery: any) => {
    if (singleLottery[0].remain_times > 0) {
      testFunc(prizeList).then((res) => {
        if (res.status === 'success') {
          // console.log('res', res.prize.objective)
          setTimeout(() => {
            Modal.info({
              title: res.prize.objective.title,
              content: (
                <div>
                  <hr />
                  {res.prize.objective.description}
                </div>
              ),
              onOk() {
                setStartRadian(0)
                setRenew(true)
              }
            })
          }, 1000)
        }
      })
    } else {
      Modal.info({
        title: '抽奖次数用完啦',
        content: (
          <div>
            <hr />
            <p>您的抽奖次数用完啦！</p>
            <p>无法抽奖，感谢您的参与！</p>
          </div>
        ),
        onOk() {}
      })
    }
  }

  const handleOk = () => {
    setIsModalShow(false)
  }

  const handleCancel = () => {
    setIsModalShow(false)
  }

  if (prizeList?.length && singleLottery?.length) {
    for (let i = 0; i < prizeList.length; i++) {
      if (i % 2 === 0)
        Object.defineProperty(prizeList[i], 'color', { value: '#fef8e6' })
      else Object.defineProperty(prizeList[i], 'color', { value: '#fff' })
    }

    return (
      <div>
        <div className={styles.turntableWrap}>
          <img src={TurntablePic} />
          <canvas
            id='turnTableCircle'
            ref={canvasRef}
            width='435px'
            height='435px'
          >
            您的浏览器不支持canvas。
          </canvas>
          <img
            className='point'
            src={Point}
            onClick={() => lottery(prizeList, singleLottery)}
          />
        </div>
        <Modal
          title='请填写信息'
          visible={isModalShow}
          onOk={handleOk}
          onCancel={handleCancel}
          // confirmLoading={confirmLoading}
        >
          <Row gutter={[16, 16]}>
            {singleLottery[0]?.info_fields.map((el: any) => {
              return (
                <Col span={24} key={singleLottery[0].id}>
                  <Input placeholder={el} />
                </Col>
              )
            })}
          </Row>
          {/* <Form name="importWorks" form={form}>
            <Form.Item label="作品网址" name="workUrl">
              <Input />
            </Form.Item>
          </Form> */}
        </Modal>
      </div>
    )
  } else {
    return <></>
  }
}

export default TestCanvas
