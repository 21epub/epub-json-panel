import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import AssistancePage from './AssistancePage';
import type {
  AssistanceType,
  AssistanceApiPropsType,
  AssistancePictureType,
  AssistanceEventType
} from '../../type';

export interface AssistancePageRenderProps {
  assistanceType: AssistanceType;
  assistanceApiProps: AssistanceApiPropsType;
  assistancePicture: AssistancePictureType;
  assistanceEvent?: AssistanceEventType;
  isDataChanged?: boolean;
}

// 抽奖页面渲染
export const AssistancePageRender: FC<AssistancePageRenderProps> = (props) => {
  const {
    assistanceType,
    assistanceApiProps,
    assistancePicture,
    assistanceEvent,
    isDataChanged
  } = props;
  return (
    <ConfigProvider locale={zhCN}>
      <AssistancePage
        assistanceType={assistanceType}
        assistanceApiProps={assistanceApiProps}
        assistancePicture={assistancePicture}
        assistanceEvent={assistanceEvent}
        isDataChanged={isDataChanged}
      />
    </ConfigProvider>
  );
};
