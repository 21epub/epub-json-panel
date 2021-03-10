import { Modal } from 'antd'
import * as React from 'react'
import 'antd/dist/antd.css'

interface Props {
  content: any
  title?: string
}

function info({ content, title }: Props) {
  if (title) {
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
  } else {
    Modal.info({
      content: <div>{content}</div>,
      onOk() {}
    })
  }
}

export { info }
