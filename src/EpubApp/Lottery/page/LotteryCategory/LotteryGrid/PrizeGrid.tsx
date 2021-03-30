import React, { FC, useState, useEffect } from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  drawPrizeBlock,
  getPrizeIndex,
  getRandomInt,
  prizeToAngle
} from '../../../util'
import { getLotteryResult } from '../../../data/api'
import styles from './index.module.less'
import { clone } from 'ramda'

interface PrizeGridProps {
  prizeList: any
  prefix: string
  isClickable: boolean
  singleLottery: any
  prizeUrl?: string
  userInfo: any
  getData: Function
  picture: any
}

const PrizeGrid: FC<PrizeGridProps> = (props) => {
  const {
    prizeList,
    picture,
    prefix,
    isClickable,
    singleLottery,
    prizeUrl,
    userInfo,
    getData
  } = props
  const { gridBg1, gridBg2, prizeBg } = picture
  const [borderActive, setBorderActive] = useState(false)
  const dispatch = useDispatch()
  const states = useSelector((state: any) => state)
  const [itemList, setItemList] = useState(prizeList)
  const [start, setStart] = useState(false)

  useEffect(() => {
    setItemList(prizeList)
  }, [prizeList])

  const handleOnClick = (prizeUrl: string | undefined) => {
    if (prizeUrl)
      getLotteryResult(prizeUrl).then((res: any) => {
        // 获取抽奖结果
        const prize = res?.data?.data?.results[0]

        if (prize) {
          let prizeIndex = getPrizeIndex(prize, prizeList)
          //跳过开始抽奖按钮
          if (prizeIndex > 3) prizeIndex = prizeIndex + 1
          console.log('prizeIndex', prizeIndex)
          setStart(true)

          // setBorderActive((b) => !b)
          // prizeList.forEach((item: any, index: number) => {
          //   if (index === 4)
          //     Object.defineProperty(item, 'active', { value: false })
          // })
        }
      })
  }

  useEffect(() => {
    if (start) {
      const temp = clone(itemList)

      for (let i = 0; i < 9; i++) {
        setTimeout(() => {
          console.log(i, 'ssss')
          temp.forEach((ite: any, index: number) => {
            if (index === i) ite.active = true
          })
          setItemList(temp)
        }, 1000)
      }
    }
  }, [start, itemList])

  console.log('itemList', itemList)

  if (prizeList?.length) {
    prizeList?.length === 8 && itemList.splice(4, 0, { id: 'lotteryButton' })
    if (!start) {
      itemList.forEach((item: any) => {
        item['active'] = false
      })
    }

    const prizeBackground = `url(${
      prizeBg || `${prefix}diazo/images/lottery/lotteryGrid/prizeBg.png`
    })`
    const startBackground = `url(${
      prizeBg || `${prefix}diazo/images/lottery/lotteryGrid/start.png`
    })`

    return (
      <div className={styles.prizeGridWrap}>
        <div
          className='gridBg'
          style={{
            backgroundImage: `url(${
              borderActive
                ? gridBg1 ||
                  `${prefix}diazo/images/lottery/lotteryGrid/gridBg1.png`
                : gridBg2 ||
                  `${prefix}diazo/images/lottery/lotteryGrid/gridBg2.png`
            })`,
            backgroundSize: '100% 100%',
            height: '300px',
            width: '300px',
            display: 'grid',
            paddingTop: '26px',
            paddingLeft: '25px',
            gridTemplateColumns: '83px 83px 83px',
            gridTemplateRows: '83px 83px 83px'
          }}
        >
          {itemList.map((it: any, index: number) => {
            return (
              <div
                key={it.id}
                className={it.active ? 'test' : 'test2'}
                style={{
                  backgroundImage: `${
                    index === 4 ? startBackground : prizeBackground
                  }`,
                  backgroundSize: '100% 100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: `${
                    index === 4 && isClickable ? 'pointer' : 'default'
                  }`,
                  margin: '4px'
                }}
                onClick={
                  index === 4 ? () => handleOnClick(prizeUrl) : undefined
                }
              >
                {index !== 4 && (
                  <img
                    src={
                      it.objective?.picture ||
                      `${prefix}diazo/images/lottery/common/prize.png`
                    }
                    width='40%'
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return <div />
}

export default PrizeGrid
