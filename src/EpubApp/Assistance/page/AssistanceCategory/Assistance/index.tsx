import React, { FC } from 'react';
import HelpAssistancePage from './HelpAssistancePage';
import HomePage from './HomePage';
import MyAssistancePage from './MyAssistancePage';
import ObjectivePage from './ObjectivePage';
import store from '../../../store';

export interface AssistanceProps {
  oslug: string;
  acslug: string;
}

// 助力应用
export const Assistance: FC<AssistanceProps> = (props) => {
  const [state] = store.useRxjsStore();
  const { PageType } = state;

  switch (PageType) {
    case 'HelpAssistancePage':
      return <HelpAssistancePage {...props} />;
    case 'HomePage':
      return <HomePage {...props} />;
    case 'MyAssistancePage':
      return <MyAssistancePage {...props} />;
    case 'ObjectivePage':
      return <ObjectivePage {...props} />;
    default:
      return <HomePage {...props} />;
  }
};
