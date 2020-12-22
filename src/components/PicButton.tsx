import * as React from 'react'
import styles from './index.module.less'
// import buttonImg from './img/myPrize.png'

interface Props {
  remainTimes: number | null
}

// const buttonPic = buttonImg
const PicButton = ({ remainTimes }: Props) => {
  return (
    <div className={styles.PicButton}>
      <img
        className='buttonImg'
        src={require('./img/myPrize.png')}
        onClick={() => console.log('111')}
      />
    </div>
  )
}

export default PicButton
