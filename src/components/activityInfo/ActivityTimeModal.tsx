import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getNow } from '../util'
import { useDispatch } from 'react-redux'
import styles from './index.module.less'

interface Props {
  startTime: string | null
  endTime: string | null
}

const ActivityTimeModal = ({ startTime, endTime }: Props) => {
  const dispatch = useDispatch()
  const [isModalShow, setIsModalShow] = useState(false)
  const [content, setContent] = useState('')

  const format = 'YYYY-MM-DD hh:mm:ss'

  useEffect(() => {
    const beforeTime = moment(startTime, format)
    const afterTime = moment(endTime, format)
    const now = moment(getNow(), format)

    if (startTime && endTime) {
      if (now.isBefore(beforeTime)) {
        setContent('活动未开始，请耐心等待！')
        dispatch({ type: 'isClickable', value: false })
        setIsModalShow(true)
      } else if (now.isAfter(afterTime)) {
        setContent('活动已结束，感谢参与！')
        dispatch({ type: 'isClickable', value: false })
        setIsModalShow(true)
      }
    }
  }, [startTime, endTime])

  const handleOk = () => {
    setIsModalShow(false)
  }

  return (
    <div className={styles.activityTimeModalWrap}>
      <Modal
        visible={isModalShow}
        footer={[
          <Button onClick={handleOk} type='primary' key='activityTimeButton'>
            确定
          </Button>
        ]}
        closable={false}
      >
        <div className='activityTimeModal'>
          <br />
          {content}
        </div>
      </Modal>
    </div>
  )
}

export default ActivityTimeModal
