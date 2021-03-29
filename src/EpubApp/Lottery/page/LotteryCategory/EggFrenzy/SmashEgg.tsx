import React, { FC, Fragment, useState, useEffect } from 'react'
import TweenOne from 'rc-tween-one'
import BezierPlugin from 'rc-tween-one/lib/plugin/BezierPlugin'
TweenOne.plugins.push(BezierPlugin)

interface SmashEggProps {
  prefix: string
  goodEgg?: string
  badEgg?: string
  hammer?: string
  isLotterySuccess: boolean
  onClick: () => void
}

const SmashEgg: FC<SmashEggProps> = (props) => {
  const { prefix, goodEgg, badEgg, hammer, isLotterySuccess, onClick } = props
  const [isClick, setIsClick] = useState(false)
  const [play, setPlay] = useState(false)
  const goodEggUrl =
    goodEgg || `${prefix}diazo/images/lottery/eggFrenzy/goodEgg.png`
  const badEggUrl =
    badEgg || `${prefix}diazo/images/lottery/eggFrenzy/goodEgg.png`
  const hammerUrl =
    hammer || `${prefix}diazo/images/lottery/eggFrenzy/hammer.png`

  const onLotteryClick = () => {
    // 隐藏锤子
    setPlay(false)
    // 避免重复点击，只允许点击一次
    if (!isClick) {
      onClick()
      setIsClick(true)
    }
  }

  // 开始播放锤子动画
  const onPlay = () => {
    setPlay(true)
  }

  const animation = {
    bezier: {
      type: 'soft',
      vars: [
        { x: -40, y: 30 },
        { x: -60, y: 50 },
        { x: -70, y: 60 },
        { x: -100, y: 100 }
      ]
    },
    duration: 600,
    onComplete: onLotteryClick
  }

  useEffect(() => {
    if (!isLotterySuccess) {
      setIsClick(false)
    }
  }, [isLotterySuccess])

  return (
    <div className='SmashEgg' onClick={onPlay}>
      {isClick && isLotterySuccess ? (
        <img className='goldenEggPic' src={badEggUrl} />
      ) : (
        <Fragment>
          <img className='goldenEggPic' src={goodEggUrl} />
          {play && (
            <TweenOne
              className='code-box-hammer'
              animation={animation}
              reverse={false}
              yoyo={false}
              style={{ backgroundImage: `url(${hammerUrl})` }}
            />
          )}
        </Fragment>
      )}
    </div>
  )
}

export default SmashEgg
