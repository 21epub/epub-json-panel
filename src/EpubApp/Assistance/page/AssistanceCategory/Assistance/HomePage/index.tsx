import React, { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { QueryObjectiveList } from '../../../../data/api';
import store from '../../../../store';
import { setPrevPageType, getPicture } from '../../../../util';
import {
  HeadImage,
  CountDown,
  ActivityRules,
  AssistanceContactInfo
} from '../../../../components';
import ObjectiveList from './ObjectiveList';
import { Wrapper } from './Styled';

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const [state] = store.useRxjsStore();
  const { AssistanceDetail, AssistancePicture } = state;
  const [titlePicture, setTitlePicture] = useState('');
  const defaultTitlePicture = getPicture(AssistancePicture ?? [], 'background');

  // 请求奖品列表
  const { data: ObjectiveListValue } = useRequest(
    () => QueryObjectiveList(AssistanceDetail?.slug!),
    {
      throwOnError: true
    }
  );

  useEffect(() => {
    setPrevPageType('HomePage');
  }, []);

  useEffect(() => {
    if (AssistanceDetail) {
      setTitlePicture(
        getPicture(AssistanceDetail?.picture ?? [], 'background') || ''
      );
    }
  }, [AssistanceDetail]);

  // 首页内容
  return (
    ((ObjectiveListValue && AssistanceDetail) || null) && (
      <Wrapper>
        <HeadImage picture={titlePicture || defaultTitlePicture} />
        <div className='block-wrap c-div DIV_tzilQM'>
          <CountDown end_time={AssistanceDetail?.end_time} />
          <ObjectiveList
            ObjectiveListValue={ObjectiveListValue!}
            aslug={AssistanceDetail?.slug}
          />
          <ActivityRules rules={AssistanceDetail?.rules} />
          <AssistanceContactInfo
            contact_info={AssistanceDetail?.contact_info}
          />
        </div>
      </Wrapper>
    )
  );
};

export default HomePage;
