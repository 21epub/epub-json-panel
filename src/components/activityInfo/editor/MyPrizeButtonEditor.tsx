import React from 'react'
import styles from '../index.module.less'

interface Props {
  prefix: string
}

const MyPrizeButtonEditor = ({ prefix }: Props) => {
  return (
    <div className={styles.myPrize}>
      <img
        className='prizeButton'
        src={`${prefix}diazo/images/lottery/myPrize.png`}
      />
    </div>
  )
}

export default MyPrizeButtonEditor
