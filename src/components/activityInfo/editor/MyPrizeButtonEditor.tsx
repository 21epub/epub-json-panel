import React from 'react'
import styles from '../index.module.less'

const MyPrizeButtonEditor = () => {
  return (
    <div className={styles.myPrize}>
      <img
        className='prizeButton'
        src={`${window.web_url}diazo/images/lottery/myPrize.png`}
      />
    </div>
  )
}

export default MyPrizeButtonEditor
