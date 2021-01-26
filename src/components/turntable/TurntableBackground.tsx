import React from 'react'

interface Props {
  url: string
  prefix: string
}

const TurntableBackground = ({ url, prefix }: Props) => {
  return (
    <img
      className='turntablePic'
      src={
        url || `${prefix}diazo/images/lottery/turntable.png`
        // 'http://dev.epub360.com/staticfs2/diazo/images/lottery/turntable.png'
      }
    />
  )
}

export default TurntableBackground
