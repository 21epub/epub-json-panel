import React, { FC, useEffect } from 'react';
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
  const { AssistanceDetail } = state;

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

  // 首页内容
  return (
    ((ObjectiveListValue && AssistanceDetail) || null) && (
      <Wrapper>
        <HeadImage
          picture={getPicture(AssistanceDetail?.picture ?? [], 'background')}
        />
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
