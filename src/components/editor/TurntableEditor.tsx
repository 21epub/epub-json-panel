// import { Modal, Input, Row, Col } from 'antd'
import React, { useRef, useEffect, useState } from 'react'
import { drawPrizeBlock } from '../util'
// import turntableImg from '../img/turntable.png'
// import pointImg from '../img/point.png'
import styles from '../turnTable.less'
import 'antd/dist/antd.css'

interface Props {
  prizeList: any
}

const TurntableEditor = ({ prizeList }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  // const [startRadian, setStartRadian] = useState(0)
  // const [prizeList, setPrizeList] = useState(state.prizeList)

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCtx(canvasRef?.current?.getContext('2d'))
      if (ctx && prizeList.length !== 0) {
        drawPrizeBlock(ctx, prizeList, 0)
      }
    }
  }, [ctx, prizeList])

  // useEffect(() => {
  //     if (canvasRef && canvasRef.current) {
  //         setCtx(canvasRef?.current?.getContext('2d'))
  //         if (ctx && prizeList.length !== 0) {
  //             drawPrizeBlock(ctx, prizeList, startRadian)
  //         }
  //     }
  // }, [prizeList])

  if (prizeList?.length) {
    const prizeListLocal = prizeList
    for (let i = 0; i < prizeListLocal.length; i++) {
      if (i % 2 === 0)
        Object.defineProperty(prizeListLocal[i], 'color', { value: '#fef8e6' })
      else Object.defineProperty(prizeListLocal[i], 'color', { value: '#fff' })
    }
    // debugger
    // setPrizeList(prizeListLocal)

    return (
      <div>
        <div className={styles.turntableEditorWrap}>
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
          />
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

export default TurntableEditor
