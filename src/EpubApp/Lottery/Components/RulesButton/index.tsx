import React, { FC, useState } from 'react'
import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import styles from './index.module.less'

interface RulesButtonProps {
  rules?: any
  isButtonClickable: boolean
  prefix: string
  url?: string
}

const RulesButton: FC<RulesButtonProps> = (props) => {
  const { rules, isButtonClickable, prefix, url } = props
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
          src={url || `${prefix}diazo/images/lottery/common/rule.png`}
          onClick={getRules}
        />
      ) : (
        <img
          className='ruleButton'
          src={url || `${prefix}diazo/images/lottery/common/rule.png`}
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
