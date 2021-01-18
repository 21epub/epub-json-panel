import React from 'react'
import PointerEditor from './PointerEditor'
import TurntableBackground from '../TurntableBackground'
import TurntableCenterEditor from './TurntableCenterEditor'
import styles from '../index.module.less'

interface Props {
  pointerUrl: string
  turntableUrl: string
  prizeList: any
}

const TurntableEditor = ({ pointerUrl, turntableUrl, prizeList }: Props) => {
  return (
    <div className={styles.turntableWrap}>
      <TurntableBackground url={turntableUrl} />
      <TurntableCenterEditor prizeList={prizeList} />
      <PointerEditor url={pointerUrl} />
    </div>
  )
}

export default TurntableEditor
