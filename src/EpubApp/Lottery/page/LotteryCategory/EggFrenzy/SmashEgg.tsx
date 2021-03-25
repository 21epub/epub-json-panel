import React, { FC } from 'react'

interface SmashEggProps {
  prefix: string
  goodEgg: string
  badEgg: string
  hammer: string
  isClickable: boolean
  onClick: () => void
}

const SmashEgg: FC<SmashEggProps> = (props) => {
  const { prefix, goodEgg, badEgg, hammer, isClickable, onClick } = props

  return (
    <div className='SmashEgg'>
      <img
        className='goldenEggPic'
        src={
          isClickable
            ? goodEgg
            : badEgg ||
              `${prefix}diazo/images/lottery/eggFrenzy/${
                isClickable ? 'goodEgg' : 'badEgg'
              }.png`
        }
        onClick={onClick}
      />
      <img
        className='hammer'
        src={
          isClickable
            ? ''
            : hammer || `${prefix}diazo/images/lottery/eggFrenzy/hammer.png`
        }
      />
    </div>
  )
}

export default SmashEgg
