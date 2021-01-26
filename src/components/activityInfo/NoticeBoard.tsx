import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div<any>`
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  height: ${(props) => (props.height ? `${props.height}px` : '44px')};
  overflow: hidden;
  display: flex;
`

const Content = styled.div<any>`
  overflow: hidden;
  animation: ${(props) => (props.animation ? props.animation : '')}
    ${(props) => props.duration}s linear infinite;
  margin-right: auto;
  margin-left: 12px;
`

const Text = styled.p<any>`
  color: white;
  line-height: ${(props) => (props.height ? `${props.height}px` : '44px')};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

interface Props {
  stepDuration: any
  height?: any
  className: string
  width?: any
  textClassName?: string
  dataSource: any
}

const NoticeBoard = ({
  stepDuration = 1000,
  height = 44,
  textClassName,
  width,
  dataSource,
  className
}: Props) => {
  const [dataSourceL, setDataSourceL] = useState(dataSource)
  const [keyframesValue, setKeyframesValue] = useState('')

  useEffect(() => {
    handleDataSource()
    if (dataSourceL.length >= 2) {
      createKeyFrames()
    }
  }, [])

  const getStepLen = () => {
    return dataSource.length * 2
  }

  const getDuration = () => {
    return (dataSource.length * stepDuration) / 1000
  }

  const getScrollKeyFrames = () => {
    if (keyframesValue) {
      return keyframes`
        ${keyframesValue}
      `
    }
    return null
  }

  const handleDataSource = () => {
    return new Promise((resolve, reject) => {
      if (dataSource.length > 0) {
        setDataSourceL(dataSource.concat(dataSource[0]))
      } else {
        reject(new Error('dataSource.length must >= 1'))
        throw new Error('dataSource.length must >= 1')
      }
    })
  }

  const createKeyFrames = () => {
    const per = 100 / getStepLen()
    let offset = 0
    const cssStr: string[] = []
    for (let i = 0; i <= getStepLen(); i++) {
      const even = i % 2 === 0
      if (i !== 0 && even) {
        offset += height
      }
      const v = `
        ${i * per}% {
          margin-top: -${offset}px
        }
      `
      cssStr.push(v)
    }
    const css = cssStr.join('')
    setKeyframesValue(css)
  }

  return (
    <div>
      <Wrapper width={width} height={height} className={className}>
        <Content
          animation={getStepLen() > 2 ? getScrollKeyFrames() : null}
          duration={getDuration()}
        >
          {dataSourceL.map((item: any, index: number) => (
            <Text
              height={height}
              className={textClassName}
              key={`${index}-${item}`}
            >
              {item}
            </Text>
          ))}
        </Content>
      </Wrapper>
    </div>
  )
}

export default NoticeBoard
