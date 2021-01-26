import React from 'react'
import PointerEditor from './PointerEditor'
import TurntableBackground from '../TurntableBackground'
import TurntableCenterEditor from './TurntableCenterEditor'
import styles from '../index.module.less'

interface Props {
  pointerUrl: string
  turntableUrl: string
  prizeList: any
  prefix: string
}

const TurntableEditor = ({
  pointerUrl,
  turntableUrl,
  prizeList,
  prefix
}: Props) => {
  return (
    <div className={styles.turntableWrap}>
      <TurntableBackground url={turntableUrl} prefix={prefix} />
      <TurntableCenterEditor prizeList={prizeList} />
      <PointerEditor url={pointerUrl} prefix={prefix} />
    </div>
  )
}

export default TurntableEditor
