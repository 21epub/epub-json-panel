import React, { FC } from 'react';
import type { AssistanceDetailType } from '../../type';

interface ContactInfoProps {
  contact_info: AssistanceDetailType['contact_info'];
}

// 联系信息
const ContactInfo: FC<ContactInfoProps> = (props) => {
  const { contact_info } = props;

  return (
    <div className='block c-div DIV_5eZtqX'>
      <div className='c-div DIV_sVS1zF'>
        <i className='fa fa-phone c-icon' />
        <p className='c-paragraph P_PedtjQ'>联系信息：</p>
      </div>
      <div className='c-div DIV_PJeoHZ'>
        <ul className='c-list UL_MsgSVz'>
          <li className='c-listitem LI_hGMbQo'>
            <i className='fa fa-circle-o c-icon' />
            <p className='c-paragraph P_PedtjQ'>{contact_info?.name}</p>
          </li>
          <li className='c-listitem LI_hGMbQo'>
            <i className='fa fa-map-marker c-icon' />
            <p className='c-paragraph P_PedtjQ'>{contact_info?.address}</p>
          </li>
          <li className='c-listitem LI_hGMbQo'>
            <i className='fa fa-phone c-icon' />
            <p className='c-paragraph P_PedtjQ'>{contact_info?.phone}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;
