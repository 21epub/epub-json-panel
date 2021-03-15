import React, { FC } from 'react'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import { info } from './InfoModal'
// import content from 'antd/dist/antd.css'

const InfoModalButton: FC = () => {
  const content = (
    <div>
      <div>1.规则说明</div>
      <div>2.规则说明</div>
    </div>
  )

  const modalContent = {
    // title: '规则说明',
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
