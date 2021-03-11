import React from 'react'
import styles from './index.module.less'

interface Props {
  url: string
  isShow: boolean
  prefix: string
}

const BackgroundPic = ({ url, isShow = true, prefix }: Props) => {
  return (
    <div className={styles.bgImg}>
      {isShow ? (
        <img
          className='bgPic'
          src={url || `${prefix}diazo/images/lottery/turntable/bg.png`}
          alt='图片加载失败'
        />
      ) : (
        <div />
      )}
    </div>
  )
}

export default BackgroundPic
