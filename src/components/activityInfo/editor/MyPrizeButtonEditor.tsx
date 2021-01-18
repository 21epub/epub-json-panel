import React from 'react'
import styles from '../index.module.less'

const MyPrizeButtonEditor = () => {
  return (
    <div className={styles.myPrize}>
      <img
        className='prizeButton'
        src='http://dev.epub360.com/staticfs2/diazo/images/lottery/myPrize.png'
      />
    </div>
  )
}

export default MyPrizeButtonEditor
