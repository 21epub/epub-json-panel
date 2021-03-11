import React from 'react'
import styles from '../index.module.less'

interface Props {
  url: string
  prefix: string
}

const PointerEditor = ({ url, prefix }: Props) => {
  return (
    <div className={styles.pointer}>
      <a>
        <img
          className='point'
          src={
            url || `${prefix}diazo/images/lottery/turntable/point.png`
            // 'http://dev.epub360.com/staticfs2/diazo/images/lottery/turntable/point.png'
          }
        />
      </a>
    </div>
  )
}

export default PointerEditor
