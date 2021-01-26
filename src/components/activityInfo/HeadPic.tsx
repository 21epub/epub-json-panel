import React from 'react'
import styles from './index.module.less'

interface Props {
  url: string
}

const HeadPic = ({ url }: Props) => {
  return (
    <div className={styles.headImg}>
      <img
        className='headPic'
        src={
          url || `${window.web_url}diazo/images/lottery/head.png`
          // 'http://dev.epub360.com/staticfs2/diazo/images/lottery/head.png'
        }
        alt='图片加载失败'
      />
    </div>
  )
}

export default HeadPic
