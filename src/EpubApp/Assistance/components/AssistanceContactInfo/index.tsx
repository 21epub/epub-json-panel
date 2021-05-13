import React, { FC } from 'react';
import type { AssistanceDetailType } from '../../type';
import { Wrapper } from './Styled';

interface ContactInfoProps {
  contact_info?: AssistanceDetailType['contact_info'];
}

// 联系信息
const AssistanceContactInfo: FC<ContactInfoProps> = (props) => {
  const { contact_info } = props;

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default AssistanceContactInfo;
