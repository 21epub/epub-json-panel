import React, { FC } from 'react';
import styles from './index.module.less';

interface ContactInfoProps {
  contactInfo?: any;
  isShow?: boolean;
}

const ContactInfo: FC<ContactInfoProps> = (props) => {
  const { contactInfo, isShow = true } = props;

  return (
    <div className={styles.contactInfo}>
      {isShow && (
        <div className='contactInfoWrap'>
          {contactInfo?.name && `举办方名称：${contactInfo?.name} `}
          {/* {contactInfo.phone && `联系方式：${contactInfo.phone} `}
          {contactInfo.address && `地址：${contactInfo.address}`} */}
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
