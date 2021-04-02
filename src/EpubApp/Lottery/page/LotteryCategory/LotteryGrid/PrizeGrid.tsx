import React, { FC, useState } from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getIndexList, getPrizeIndex } from '../../../util'
import { getLotteryResult } from '../../../data/api'
import styles from './index.module.less'

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
  const { gridBg1, prizeBg, startBg } = picture
  // const [borderActive, setBorderActive] = useState(false)
  const [activeIndex, setActiveIndex] = useState<undefined | number>()

  const dispatch = useDispatch()
  const states = useSelector((state: any) => state)

  const handleOnClick = async (prizeUrl: string | undefined) => {
    if (
      userInfo[0]?.user_id === null &&
      singleLottery[0].need_user_info &&
      states.shouldUserInfoModalShow
    ) {
      dispatch({ type: 'IsUserInfoModalShow', value: true })
    } else if (
      prizeUrl &&
      (singleLottery[0].remain_times > 0 ||
        singleLottery[0].remain_times === null)
    ) {
      try {
        const respones = await getLotteryResult(prizeUrl)
        const prize = respones?.data?.data?.results[0]
        if (prize) {
          dispatch({ type: 'isClickable', value: false })

          let prizeIndex = getPrizeIndex(prize, prizeList)
          // 跳过开始抽奖按钮
          if (prizeIndex > 3) prizeIndex = prizeIndex + 1
          const turnList = [0, 1, 2, 5, 8, 7, 6, 3]
          const indexList = getIndexList(prizeIndex, turnList)
          let i = 0
          const timeId = setInterval(() => {
            setActiveIndex(indexList[i])
            i += 1

            if (i >= indexList.length) {
              clearInterval(timeId)
              // 延时1000毫秒弹出获奖结果
              setTimeout(() => {
                Modal.info({
                  title: prize.objective.ranking,
                  content: (
                    <div>
                      <hr />
                      奖项名:{prize.objective.title}
                    </div>
                  ),
                  onOk() {
                    setActiveIndex(undefined)

                    if (
                      !prize.objective.is_empty &&
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
          }, 100)

          // setBorderActive((b) => !b)
        }
      } catch (error) {
        Modal.info({
          title: error.response.data,
          okText: '查看我的奖品',
          onOk() {
            dispatch({ type: 'isPrizeModalShow', value: true })
          }
        })
      }
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

  if (prizeList?.length) {
    prizeList?.length === 8 && prizeList.splice(4, 0, { id: 'lotteryButton' })

    const prizeBackground = `url(${
      prizeBg || `${prefix}diazo/images/lottery/lotteryGrid/prizeBg.png`
    })`
    const startBackground = `url(${
      startBg || `${prefix}diazo/images/lottery/lotteryGrid/startBg.png`
    })`

    return (
      <div className={styles.prizeGridWrap}>
        <div
          className='gridBg'
          style={{
            backgroundImage: `url(${
              gridBg1 || `${prefix}diazo/images/lottery/lotteryGrid/gridBg1.png`
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
          {prizeList.map((it: any, index: number) => {
            return (
              <div
                key={it.id}
                className={index === activeIndex ? 'active' : ''}
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
