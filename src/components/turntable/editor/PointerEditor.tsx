import React from 'react'
import styles from '../index.module.less'

interface Props {
  url: string
}

const PointerEditor = ({ url }: Props) => {
  return (
    <div className={styles.pointer}>
      <a>
        <img
          className='point'
          src={
            url || `${window.web_url}diazo/images/lottery/point.png`
            // 'http://dev.epub360.com/staticfs2/diazo/images/lottery/point.png'
          }
        />
      </a>
    </div>
  )
}

export default PointerEditor
