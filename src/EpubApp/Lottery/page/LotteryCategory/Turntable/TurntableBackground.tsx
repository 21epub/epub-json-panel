import React from 'react'

interface Props {
  url: string
  prefix: string
}

const TurntableBackground = ({ url, prefix }: Props) => {
  return (
    <img
      className='turntablePic'
      src={url || `${prefix}diazo/images/lottery/turntable/turntable.png`}
    />
  )
}

export default TurntableBackground
