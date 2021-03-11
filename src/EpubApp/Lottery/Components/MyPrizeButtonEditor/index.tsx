import React from 'react'
import styles from './index.module.less'

interface Props {
  prefix: string
  url: string
}

const MyPrizeButtonEditor = ({ prefix, url }: Props) => {
  return (
    <div className={styles.myPrize}>
      <img
        className='prizeButton'
        src={url || `${prefix}diazo/images/lottery/common/myPrize.png`}
      />
    </div>
  )
}

export default MyPrizeButtonEditor
