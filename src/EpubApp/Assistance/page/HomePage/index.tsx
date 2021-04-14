import React, { FC, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { QueryObjectiveList } from '../../data/api';
import type { AssistanceDetailType } from '../../type';
import { SavePrevPageNumber } from '../../util';

// 引入各组件
import {
  HeadImage,
  CountDown,
  ActivityRules,
  ContactInfo
} from '../../components';
import ObjectiveList from './ObjectiveList';

export interface HomePageProps {
  AssistanceDetail: AssistanceDetailType;
}

const HomePage: FC<HomePageProps> = (props) => {
  const { AssistanceDetail } = props;
  const { data: ObjectiveListValue } = useRequest(() =>
    QueryObjectiveList(AssistanceDetail?.slug)
  );

  useEffect(() => {
    SavePrevPageNumber('HomePage');
  }, []);

  // 首页内容
  return (
    (ObjectiveListValue || null) && (
      <div className='c-div plugin-body'>
        <HeadImage picture={AssistanceDetail?.picture} />
        <div className='block-wrap c-div DIV_tzilQM'>
          <CountDown end_time={AssistanceDetail?.end_time} />
          <ObjectiveList
            ObjectiveListValue={ObjectiveListValue!}
            aslug={AssistanceDetail?.slug}
          />
          <ActivityRules rules={AssistanceDetail?.rules} />
          <ContactInfo contact_info={AssistanceDetail?.contact_info} />
        </div>
      </div>
    )
  );
};

export default HomePage;
