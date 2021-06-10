import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import PollPage from './PollPage';
import type {
  PollPictureType,
  PollApiPropsType,
  PollEventType
} from '../../type';
import { GlobalStyle } from './Styled';

export interface PollPageRenderProps {
  pollApiProps: PollApiPropsType;
  pollPicture: PollPictureType;
  pollEvent?: PollEventType;
  isDataChanged: boolean;
}

// 投票页面渲染
export const PollPageRender: FC<PollPageRenderProps> = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <GlobalStyle />
      <PollPage {...props} />
    </ConfigProvider>
  );
};
