import React, { useEffect, useRef, useState } from 'react'
import { drawPrizeBlock } from '../../../../util'
import styles from '../index.module.less'

interface Props {
  prizeList: any
}

const TurntableCenterEditor = ({ prizeList }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  // 渲染抽奖盘
  useEffect(() => {
    if (canvasRef?.current) {
      setCtx(canvasRef?.current?.getContext('2d'))
      if (ctx && prizeList.length !== 0) {
        drawPrizeBlock(ctx, prizeList, 0)
      }
    }
  }, [ctx, prizeList, 0])

  if (prizeList?.length) {
    for (let i = 0; i < prizeList.length; i++) {
      if (i % 2 === 0)
        Object.defineProperty(prizeList[i], 'color', { value: '#fef8e6' })
      else Object.defineProperty(prizeList[i], 'color', { value: '#fff' })
    }

    return (
      <div className={styles.turntableRotateWrap}>
        <canvas
          id='turntableCircle'
          ref={canvasRef}
          width='280px'
          height='280px'
        >
          您的浏览器不支持canvas。
        </canvas>
      </div>
    )
  } else {
    return <div />
  }
}

export default TurntableCenterEditor
