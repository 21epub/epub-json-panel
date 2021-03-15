import React, { FC } from 'react'
import styles from './index.module.less'

interface MyPrizeButtonEditorProps {
  prefix: string
  url: string
}

const MyPrizeButtonEditor: FC<MyPrizeButtonEditorProps> = (props) => {
  const { prefix, url } = props
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
