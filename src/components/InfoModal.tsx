import { Modal } from 'antd'
import * as React from 'react'
import 'antd/dist/antd.css'

interface Props {
  title: string
  content: any
}

function info({ title, content }: Props) {
  Modal.info({
    title: title,
    content: (
      <div>
        <hr />
        {content}
      </div>
    ),
    onOk() {}
  })
}

export { info }
