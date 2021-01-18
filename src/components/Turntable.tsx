import { Modal, Input, Row, Form, Col } from 'antd'
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { DataClient } from '@21epub/epub-data-client'
import {
  drawPrizeBlock,
  prizeToAngle,
  getRandomInt,
  getPrizeIndex,
  translateTitle
} from './util'
import { getLotteryResult, addUserInfo, queryUserInfo } from './api'
import { SingleLotteryProps } from './types'
import { useDispatch } from 'react-redux'
import styles from './turnTable.less'
import 'antd/dist/antd.css'

//     "color": '#fef8e6'
interface Props {
  prizeListUrl: string
  prizeUrl: string
  singleLotteryUrl: string
  isDataChanged: boolean
  myPrizeListUrl: string
  addUserInfoUrl: string
  queryUserInfoUrl: string
}

const Turntable = ({
  prizeListUrl,
  prizeUrl,
  singleLotteryUrl,
  isDataChanged,
  myPrizeListUrl,
  addUserInfoUrl,
  queryUserInfoUrl
}: Props) => {
  const dispatch = useDispatch()

  const canvasRef = useRef<HTMLCanvasElement>(null) // 获取canvas元素
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [startRadian, setStartRadian] = useState(0) // 定义圆的角度
  const [renew, setRenew] = useState(false)
  const [isModalShow, setIsModalShow] = useState(false)
  const [form] = Form.useForm() // 用户信息
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [tips, setTips] = useState(<div />) // 填写用户信息时的提示信息

  // 奖品list
  const prizeListClient = useMemo(() => {
    const client = new DataClient(prizeListUrl)
    return client
  }, [prizeListUrl])

  // 抽奖信息
  const singleLotteryClient = useMemo(() => {
    const client = new DataClient<SingleLotteryProps>(singleLotteryUrl)
    return client
  }, [singleLotteryUrl])

  // 我的奖品list
  const myPrizeListClient = useMemo(() => {
    const client = new DataClient(myPrizeListUrl)
    return client
  }, [myPrizeListUrl])

  useEffect(() => {
    prizeListClient.getAll()
    singleLotteryClient.getAll()
    myPrizeListClient.getAll()
    // renew 重新抽奖时更新这个值，从而重新获取奖品list、抽奖信息（剩余抽奖次数）、我的奖品信息
  }, [renew, isDataChanged, myPrizeListUrl, singleLotteryUrl, prizeListUrl])

  const prizeList = prizeListClient.useData()
  const singleLottery = singleLotteryClient.useData()
  const myPrizeList = myPrizeListClient.useData()

  // 监听到更新抽奖信息后dispatch
  useEffect(() => {
    dispatch({ type: 'ChangeSingleLotteryInfo', value: singleLottery })
  }, [singleLottery])

  // 监听到更新我的奖品后dispatch
  useEffect(() => {
    dispatch({ type: 'ChangeMyPrizeList', value: myPrizeList })
  }, [myPrizeList])

  // 渲染初始抽奖盘
  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      // 当canvas元素存在时，定义canvas的上下文进行绘制
      setCtx(canvasRef?.current?.getContext('2d'))
      if (ctx && prizeList.length !== 0) {
        drawPrizeBlock(ctx, prizeList, startRadian)
      }
    }
    // 获取用户list判断用户是否已经填写信息
    queryUserInfo(queryUserInfoUrl).then((res: any) => {
      if (
        res.data.data.results[0].user_id === null &&
        singleLottery[0]?.need_user_info
      ) {
        // 如果用户未填写信息并且必填为true则显示Modal
        setIsModalShow(true)
      }
    })
  }, [prizeList, singleLottery])

  // 监听startRadian旋转角度，绘制旋转对应度数的抽奖盘
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
      // 抽奖post
      getLotteryResult(prizeUrl).then((res: any) => {
        // console.log("res",res?.data?.data?.results[0])

        // 获取抽奖结果
        const prize = res?.data?.data?.results[0]

        // 获取抽奖结果在奖品list中对应的index
        const prizeIndex = getPrizeIndex(prize, prizeList)

        // 获取目标角度： prizeIndex:prize对应第几个，prizeList.length:prize总数
        const target = prizeToAngle(prizeIndex, prizeList.length)

        // 获取随机圈数
        const turns = getRandomInt(5, 15)

        // 将总旋转度数切割为多少份
        const frame = getRandomInt(100, 400)

        const result = {
          status: 'success',
          prize: prize // 获得的奖品
        }

        for (let i = 1; i <= frame; i += 1) {
          // target为目标角度， 2 * Math.PI 为一圈 ，获取每份度数的大小
          const interval = (target + 2 * Math.PI * turns) / frame
          setTimeout(() => {
            // 设定每次相对原点的旋转度数
            setStartRadian(interval * i)
            // 当到达目标度数时返回结果
            if (i === frame) resolve(result)
          }, 100)
        }
      })
    })
  }

  const lottery = (prizeList: any, singleLottery: any, prizeUrl: string) => {
    // null的时候为不限，还有次数时可以抽奖否则显示抽奖次数用完
    if (
      singleLottery[0].remain_times > 0 ||
      singleLottery[0].remain_times === null
    ) {
      // prizeList为奖品list,prizeUrl为抽奖url
      rotate(prizeList, prizeUrl).then((res: any) => {
        // 当promise返回成功时
        if (res.status === 'success') {
          // 延时1000毫秒弹出获奖结果
          setTimeout(() => {
            Modal.info({
              title: res.prize.objective.ranking,
              content: (
                <div>
                  <hr />
                  奖项名:{res.prize.objective.title}
                </div>
              ),
              onOk() {
                setStartRadian(0)

                // 完成抽奖后重新获取奖品list与抽奖信息
                if (renew) setRenew(false)
                else setRenew(true)
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
    setConfirmLoading(true)
    // if(singleLottery[0]?.info_fields!==null)
    const address: string = form.getFieldInstance('address').props.value
    const phone: string = form.getFieldInstance('phone').props.value
    const email: string = form.getFieldInstance('email').props.value
    const name: string = form.getFieldInstance('name').props.value
    let info: any
    if (address && phone && email && name) {
      info = {
        address: address,
        phone: phone,
        email: email,
        name: name
      }
      // 添加用户信息
      addUserInfo(addUserInfoUrl, info).then((res: any) => {
        if (res.status === 201) {
          setConfirmLoading(false)
          setIsModalShow(false)
          form.resetFields()
          // 成功则清除内容
        } else {
          setTips(<p style={{ color: 'red' }}>请求失败，请重新尝试</p>)
          setConfirmLoading(false)
        }
      })
    } else {
      // 用户信息填写不完整
      setTips(<p style={{ color: 'red' }}>请填写正确的用户信息</p>)
      setConfirmLoading(false)
    }
  }

  const handleCancel = () => {
    // 不允许用户取消
    setTips(<p style={{ color: 'red' }}>请填写正确的用户信息</p>)
  }

  if (prizeList?.length && singleLottery?.length) {
    // 给奖品list定扇形颜色
    for (let i = 0; i < prizeList.length; i++) {
      if (i % 2 === 0)
        Object.defineProperty(prizeList[i], 'color', { value: '#fef8e6' })
      else Object.defineProperty(prizeList[i], 'color', { value: '#fff' })
    }

    // 用户信息填写框，如果不为null则渲染对应内容
    const infoFields =
      singleLottery[0]?.info_fields_list === null ? (
        <div />
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form name='addUserInfo' form={form}>
              {singleLottery[0]?.info_fields_list.map(
                (el: any, index: number) => {
                  return (
                    <Form.Item name={el} key={index}>
                      <Input placeholder={translateTitle(el)} />
                    </Form.Item>
                  )
                }
              )}
            </Form>
          </Col>
        </Row>
      )
    return (
      <div>
        <div className={styles.turntableWrap}>
          <img
            src='http://dev.epub360.com/staticfs2/diazo/images/lottery/turntable.png'
            className='turntableImg'
          />
          <canvas
            id='turnTableCircle'
            ref={canvasRef}
            width='280px'
            height='280px'
          >
            您的浏览器不支持canvas。
          </canvas>
          <img
            className='point'
            src='http://dev.epub360.com/staticfs2/diazo/images/lottery/point.png'
            onClick={() => lottery(prizeList, singleLottery, prizeUrl)}
          />
        </div>
        <Modal
          title='请填写信息'
          visible={isModalShow}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={confirmLoading}
        >
          {infoFields}
          {tips}
        </Modal>
      </div>
    )
  } else {
    return <div />
  }
}

export default Turntable
