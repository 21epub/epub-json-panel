import React from 'react'
import styles from './index.module.less'

interface Props {
  url: string
  prefix: string
}

const HeadPic = ({ url, prefix }: Props) => {
  return (
    <div className={styles.headImg}>
      <img
        className='headPic'
        src={
          url || `${prefix}diazo/images/lottery/head.png`
          // 'http://dev.epub360.com/staticfs2/diazo/images/lottery/head.png'
        }
        alt='图片加载失败'
      />
    </div>
  )
}

export default HeadPic
