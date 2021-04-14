import React, { FC } from 'react';

interface ActivityRulesProps {
  rules: string;
}

// 活动规则说明
const ActivityRules: FC<ActivityRulesProps> = (props) => {
  const { rules = '' } = props;

  return (
    <div className='block c-div DIV_5eZtqX'>
      <div className='c-div DIV_sVS1zF'>
        <i className='fa fa-cog c-icon' />
        <p className='c-paragraph P_PedtjQ'>活动规则：</p>
      </div>
      <div
        className='c-div DIV_PJeoHZ'
        dangerouslySetInnerHTML={{ __html: rules }}
      />
    </div>
  );
};

export default ActivityRules;
