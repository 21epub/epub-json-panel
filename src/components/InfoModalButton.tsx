import { Button } from 'antd'
import * as React from 'react'
import 'antd/dist/antd.css'
import { info } from './InfoModal'
// import content from 'antd/dist/antd.css'

const InfoModalButton = () => {
  const content = (
    <div>
      <p>1.规则说明</p>
      <p>2.规则说明</p>
    </div>
  )

  const modalContent = {
    title: '规则说明',
    content: content
  }

  const test = () => {
    info(modalContent)
  }

  return (
    <div>
      <Button onClick={test}>测试</Button>
    </div>
  )
}

export default InfoModalButton
