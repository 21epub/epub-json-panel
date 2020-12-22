import { Modal, Input, Row, Col } from 'antd'
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { DataClient } from '@21epub/epub-data-client'
import {
  drawPrizeBlock,
  prizeToAngle,
  getRandomInt,
  getPrizeIndex
} from './util'
import { getLotteryResult } from './api'
import { SingleLotteryProps } from './types'
// import Point from './img/point.png'
// import TurntablePic from './img/turntable.png'
import styles from './turnTable.less'
import 'antd/dist/antd.css'

//     "color": '#fef8e6'
interface Props {
  prizeListUrl: string
  prizeUrl: string
  singleLotteryUrl: string
}
// interface Result{
//   status:string,
//   prize:SinglePrizeProps
// }

const Turntable = ({ prizeListUrl, prizeUrl, singleLotteryUrl }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [startRadian, setStartRadian] = useState(0)
  const [renew, setRenew] = useState(false)
  const [isModalShow, setIsModalShow] = useState(false)
  // const [lotteryResult, setLotteryResult] = useState(false)
  // const [confirmLoading, setConfirmLoading] = useState(false)

  const prizeListClient = useMemo(() => {
    const client = new DataClient(prizeListUrl)
    return client
  }, [prizeListUrl])

  const singleLotteryClient = useMemo(() => {
    const client = new DataClient<SingleLotteryProps>(singleLotteryUrl)
    return client
  }, [singleLotteryUrl])

  useEffect(() => {
    prizeListClient.getAll()
    singleLotteryClient.getAll()
    if (renew) setRenew(false)
  }, [prizeListUrl, renew])

  const prizeList = prizeListClient.useData()
  const singleLottery = singleLotteryClient.useData()
  // console.log(prizeList, prizes, singleLottery)

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCtx(canvasRef?.current?.getContext('2d'))
      if (ctx && prizeList.length !== 0) {
        drawPrizeBlock(ctx, prizeList, startRadian)
      }
    }
    if (singleLottery[0]?.need_user_info) {
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

  const rotate = (prizeList: any, prizeUrl: string) => {
    return new Promise((resolve) => {
      getLotteryResult(prizeUrl).then((res: any) => {
        // console.log("res",res?.data?.data?.results[0])
        const prize = res?.data?.data?.results[0]
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
      })
    })
  }

  const lottery = (prizeList: any, singleLottery: any, prizeUrl: string) => {
    if (singleLottery[0].remain_times > 0) {
      rotate(prizeList, prizeUrl).then((res: any) => {
        if (res.status === 'success') {
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

    const infoFields =
      singleLottery[0]?.info_fields === null ? (
        <div />
      ) : (
        <Row gutter={[16, 16]}>
          {singleLottery[0]?.info_fields.map((el: any) => {
            return (
              <Col span={24} key={singleLottery[0].id}>
                <Input placeholder={el} />
              </Col>
              // <Form name="importWorks" form={form}>
              //   <Form.Item label="作品网址" name="workUrl">
              //     <Input />
              //   </Form.Item>
              // </Form>
            )
          })}
        </Row>
      )
    return (
      <div>
        <div className={styles.turntableWrap}>
          <img src={require('./img/turntable.png')} />
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
            src={require('./img/point.png')}
            onClick={() => lottery(prizeList, singleLottery, prizeUrl)}
          />
        </div>
        <Modal
          title='请填写信息'
          visible={isModalShow}
          onOk={handleOk}
          onCancel={handleCancel}
          // confirmLoading={confirmLoading}
        >
          {infoFields}
        </Modal>
      </div>
    )
  } else {
    return <div />
  }
}

export default Turntable
