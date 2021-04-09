import React, { FC, useEffect, useRef, useState } from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  drawPrizeBlock,
  getPrizeIndex,
  getRandomInt,
  prizeToAngle
} from '../../../util'
import Pointer from './Pointer'
import {
  SingleLotteryType,
  UserInfoType,
  PrizeType,
  WinnerListType
} from '../../../type'
import { StateType } from '../../../store/reducer'

interface ResultType {
  status: 'success'
  prize: WinnerListType
}

interface TurntableCenterProps {
  prizeList: PrizeType[]
  turntable?: string
  prefix: string
  pointer?: string
  isClickable: boolean
  singleLottery: SingleLotteryType
  prizeUrl?: string
  userInfo?: UserInfoType
  getData: Function
}

const TurntableCenter: FC<TurntableCenterProps> = (props) => {
  const {
    prizeList,
    turntable,
    prefix,
    pointer,
    isClickable,
    singleLottery,
    prizeUrl,
    userInfo,
    getData
  } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [startRadian, setStartRadian] = useState(0) // 定义圆的角度
  const dispatch = useDispatch()
  const states = useSelector((state: StateType) => state) // 获取保存的状态

  // 渲染抽奖盘
  useEffect(() => {
    if (canvasRef?.current) {
      setCtx(canvasRef?.current?.getContext('2d'))
      if (ctx && prizeList.length !== 0) {
        drawPrizeBlock(ctx, prizeList, startRadian)
      }
    }
  }, [ctx, prizeList, startRadian])

  // 旋转函数
  const rotate = (prize: WinnerListType) => {
    return new Promise<ResultType>((resolve) => {
      // 获取抽奖结果在奖品list中对应的index
      const prizeIndex = getPrizeIndex(prize, prizeList)

      // 获取目标角度： prizeIndex:prize对应第几个，prizeList.length:prize总数
      const target = prizeToAngle(prizeIndex, prizeList.length)

      const result: ResultType = {
        status: 'success',
        prize // 获得的奖品
      }

      // 获取随机圈数
      const turns = getRandomInt(5, 15)

      // 将总旋转度数切割为多少份
      const frame = getRandomInt(100, 400)

      for (let i = 1; i <= frame; i += 1) {
        // target为目标角度， 2 * Math.PI 为一圈 ，获取每份度数的大小
        const interval = (target + 2 * Math.PI * turns) / frame
        const timeId = setTimeout(() => {
          // 设定每次相对原点的旋转度数
          setStartRadian(interval * i)
          // 当到达目标度数时返回结果
          if (i === frame) {
            resolve(result)
            clearTimeout(timeId)
          }
        }, 100)
      }
    })
  }

  const doRotate = (prize: WinnerListType) => {
    if (prize && prizeList?.length) {
      rotate(prize).then((res) => {
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

                if (
                  !res.prize.objective.is_default &&
                  states.shouldUserInfoModalShow
                ) {
                  dispatch({ type: 'IsUserInfoModalShow', value: true })
                }
                dispatch({ type: 'isClickable', value: true })

                // 重新获取后台的值
                getData()
              }
            })
          }, 1000)
        }
      })
    }
  }

  if (prizeList?.length) {
    for (let i = 0; i < prizeList.length; i += 1) {
      if (i % 2 === 0)
        Object.defineProperty(prizeList[i], 'color', { value: '#fef8e6' })
      else Object.defineProperty(prizeList[i], 'color', { value: '#fff' })
    }

    return (
      <div
        className='turntableCenterWrap'
        style={{
          backgroundImage: `url(${
            turntable || `${prefix}diazo/images/lottery/turntable/turntable.png`
          })`,
          backgroundSize: '100% 100%'
        }}
      >
        <canvas
          id='turntableCircle'
          ref={canvasRef}
          width='280px'
          height='280px'
        >
          您的浏览器不支持canvas。
        </canvas>
        <Pointer
          pointer={pointer}
          isClickable={isClickable}
          singleLottery={singleLottery}
          userInfo={userInfo}
          prefix={prefix}
          prizeUrl={prizeUrl}
          doRotate={doRotate}
        />
      </div>
    )
  }
  return <div />
}

export default TurntableCenter
