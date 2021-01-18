import React from 'react'

interface Props {
  url: string
}

const TurntableBackground = ({ url }: Props) => {
  return (
    <img
      className='turntablePic'
      src={
        url ||
        'http://dev.epub360.com/staticfs2/diazo/images/lottery/turntable.png'
      }
    />
  )
}

export default TurntableBackground
