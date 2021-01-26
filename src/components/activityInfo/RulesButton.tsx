import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'
import styles from './index.module.less'

interface Props {
  rules?: any
  isButtonClickable: boolean
  prefix: string
}

const RulesButton = ({ rules, isButtonClickable, prefix }: Props) => {
  const [isModalShow, setIsModalShow] = useState(false)

  const getRules = () => {
    setIsModalShow(true)
  }

  const handleOk = () => {
    setIsModalShow(false)
  }

  return (
    <div className={styles.rulesButton}>
      {isButtonClickable ? (
        <img
          className='ruleButton'
          // 'http://dev.epub360.com/staticfs2/diazo/images/lottery/rule.png'
          src={`${prefix}diazo/images/lottery/rule.png`}
          onClick={getRules}
        />
      ) : (
        <img
          className='ruleButton'
          src={`${prefix}diazo/images/lottery/rule.png`}
        />
      )}

      <Modal
        title='规则说明'
        visible={isModalShow}
        footer={[
          <Button onClick={handleOk} type='primary' key='rulesPic'>
            确定
          </Button>
        ]}
        closable={false}
      >
        <div dangerouslySetInnerHTML={{ __html: rules }} />
      </Modal>
    </div>
  )
}

export default RulesButton
