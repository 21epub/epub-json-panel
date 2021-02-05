import React from 'react'
import styles from './index.module.less'

interface Props {
  contactInfo: any
  isShow: boolean
}

const ContactInfo = ({ contactInfo, isShow = true }: Props) => {
  if (isShow) {
    return (
      <div className={styles.contactInfo}>
        <div className='contactInfoWrap'>
          {contactInfo.name && `举办方名称：${contactInfo.name} `}
          {contactInfo.phone && `联系方式：${contactInfo.phone} `}
          {contactInfo.address && `地址：${contactInfo.address}`}
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

export default ContactInfo
