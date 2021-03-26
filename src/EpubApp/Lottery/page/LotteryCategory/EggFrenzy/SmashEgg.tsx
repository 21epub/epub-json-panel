import React, { FC, Fragment, useState, useEffect } from 'react'

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
  const goodEggUrl =
    goodEgg || `${prefix}diazo/images/lottery/eggFrenzy/goodEgg.png`
  const badEggUrl =
    badEgg || `${prefix}diazo/images/lottery/eggFrenzy/goodEgg.png`
  const hammerUrl =
    hammer || `${prefix}diazo/images/lottery/eggFrenzy/hammer.png`

  const onLotteryClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()
    onClick()
    setIsClick(true)
  }

  useEffect(() => {
    if (!isLotterySuccess) {
      setIsClick(false)
    }
  }, [isLotterySuccess])

  return (
    <div className='SmashEgg'>
      {isClick && isLotterySuccess ? (
        <img className='goldenEggPic' src={badEggUrl} />
      ) : (
        <Fragment>
          <img
            className='goldenEggPic'
            src={goodEggUrl}
            onClick={(e) => onLotteryClick(e)}
          />
          <img className='hammer' src={hammerUrl} />
        </Fragment>
      )}
    </div>
  )
}

export default SmashEgg
