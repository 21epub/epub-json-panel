import React, { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { getAssistanceComponent } from '../AssistanceCategory/';
import type {
  AssistanceApiPropsType,
  AssistancePictureType,
  AssistanceEventType,
  AssistanceType
} from '../../type';
import { GetUrlRequest, GetRequest } from '../../util';
import store from '../../store';
import { QueryAssistanceDetail } from '../../data/api';
import { Wrapper } from './Styled';

export interface AssistancePageProps {
  assistanceType: AssistanceType;
  assistanceApiProps: AssistanceApiPropsType;
  assistancePicture: AssistancePictureType;
  assistanceEvent?: AssistanceEventType;
  isDataChanged?: boolean;
}

// 助力页面
const AssistancePage: FC<AssistancePageProps> = (props) => {
  const {
    assistanceType,
    assistanceApiProps,
    assistancePicture,
    assistanceEvent
  } = props;
  const { aslug, urlKey } = assistanceApiProps;
  const [oslug, setOslug] = useState('');
  const [acslug, setAcslug] = useState('');
  const [state] = store.useRxjsStore();

  // 根据页面type，选择不同的页面渲染
  const Assistance = getAssistanceComponent(state.PageType);
  const pictureList = assistancePicture[assistanceType];

  // 查询助力详情接口
  const { data: AssistanceDetail, loading } = useRequest(() =>
    QueryAssistanceDetail(aslug)
  );

  // 请求接口数据
  useEffect(() => {
    if (!loading) {
      store.reducers.setAssistanceDetail(AssistanceDetail);
      store.reducers.setAssistanceApiProps(assistanceApiProps);
      store.reducers.setAssistanceEvent(assistanceEvent);
      store.reducers.setPictureList(pictureList);
    }

    if (GetUrlRequest()[urlKey]) {
      setOslug(
        GetRequest(decodeURIComponent(GetUrlRequest()[urlKey])).Objective
      );
      setAcslug(
        GetRequest(decodeURIComponent(GetUrlRequest()[urlKey])).Activity
      );
      store.reducers.changePage('HelpAssistancePage');
    } else {
      store.reducers.changePage('HomePage');
    }
  }, [loading]);

  return (
    <Wrapper>
      {!loading && state.AssistanceDetail && (
        <Assistance oslug={oslug} acslug={acslug} />
      )}
    </Wrapper>
  );
};

export default AssistancePage;
