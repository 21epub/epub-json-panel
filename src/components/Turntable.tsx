import { Modal, Input, Row, Form } from 'antd'
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { DataClient } from '@21epub/epub-data-client'
import {
  drawPrizeBlock,
  prizeToAngle,
  getRandomInt,
  getPrizeIndex
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

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [startRadian, setStartRadian] = useState(0)
  const [renew, setRenew] = useState(false)
  const [isModalShow, setIsModalShow] = useState(false)
  const [form] = Form.useForm()
  // const [lotteryResult, setLotteryResult] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [tips, setTips] = useState(<div />) // 填写用户信息时的提示信息

  const prizeListClient = useMemo(() => {
    const client = new DataClient(prizeListUrl)
    return client
  }, [prizeListUrl])

  const singleLotteryClient = useMemo(() => {
    const client = new DataClient<SingleLotteryProps>(singleLotteryUrl)
    return client
  }, [singleLotteryUrl])

  const myPrizeListClient = useMemo(() => {
    const client = new DataClient(myPrizeListUrl)
    return client
  }, [myPrizeListUrl])

  useEffect(() => {
    prizeListClient.getAll()
    singleLotteryClient.getAll()
    myPrizeListClient.getAll()
  }, [renew, isDataChanged, myPrizeListUrl, singleLotteryUrl, prizeListUrl])

  const prizeList = prizeListClient.useData()
  const singleLottery = singleLotteryClient.useData()
  const myPrizeList = myPrizeListClient.useData()

  useEffect(() => {
    dispatch({ type: 'ChangeSingleLotteryInfo', value: singleLottery })
  }, [singleLottery])

  useEffect(() => {
    dispatch({ type: 'ChangeMyPrizeList', value: myPrizeList })
  }, [myPrizeList])

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCtx(canvasRef?.current?.getContext('2d'))
      if (ctx && prizeList.length !== 0) {
        drawPrizeBlock(ctx, prizeList, startRadian)
      }
    }
    queryUserInfo(queryUserInfoUrl).then((res: any) => {
      console.log(res, 'userInfo')
      if (
        res.data.data.results[0].user_id === null &&
        singleLottery[0]?.need_user_info
      ) {
        setIsModalShow(true)
      }
    })
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
        const target = prizeToAngle(prizeIndex, prizeList.length) // prizeIndex:prize对应第几个，prizeList.length:prize总数
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
      addUserInfo(addUserInfoUrl, info).then((res: any) => {
        if (res.data.code === 200) {
          setConfirmLoading(false)
          setIsModalShow(false)
          form.resetFields()
        } else {
          setTips(<p style={{ color: 'red' }}>请求失败，请重新尝试</p>)
          setConfirmLoading(false)
        }
      })
    } else {
      setTips(<p style={{ color: 'red' }}>请填写正确的用户信息</p>)
      setConfirmLoading(false)
    }
  }

  const handleCancel = () => {
    setTips(<p style={{ color: 'red' }}>请填写正确的用户信息</p>)
  }

  if (prizeList?.length && singleLottery?.length) {
    for (let i = 0; i < prizeList.length; i++) {
      if (i % 2 === 0)
        Object.defineProperty(prizeList[i], 'color', { value: '#fef8e6' })
      else Object.defineProperty(prizeList[i], 'color', { value: '#fff' })
    }

    const infoFields =
      singleLottery[0]?.info_fields_list === null ? (
        <div />
      ) : (
        <Row gutter={[16, 16]}>
          <Form name='addUserInfo' form={form}>
            {singleLottery[0]?.info_fields_list.map(
              (el: any, index: number) => {
                return (
                  <Form.Item name={el} key={index}>
                    <Input placeholder={el} />
                  </Form.Item>
                )
              }
            )}
          </Form>
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
