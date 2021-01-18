import React from 'react'
import styles from './index.module.less'

interface Props {
  contactInfo: any
  isShow: boolean
}

const ContactInfo = ({ contactInfo, isShow }: Props) => {
  if (isShow) {
    return (
      <div className={styles.contactInfo}>
        <div className='contactInfoWrap'>
          {contactInfo.name && <div>举办方名称：{contactInfo.name}</div>}
          {contactInfo.phone && <div>联系方式：{contactInfo.phone}</div>}
          {contactInfo.address && <div>地址：{contactInfo.address}</div>}
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

export default ContactInfo
