import React, { FC, Fragment, useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import {
  QuerySupporterList,
  QueryObjectiveDetail,
  QueryActivityDetail
} from '../../../../data/api';
import {
  HeadImage,
  CountDown,
  ActivityRules,
  AssistanceContactInfo,
  RankingList,
  GoBack,
  PopUpInfo,
  AssistanceProgress
} from '../../../../components';
import AssistanceInfo from './AssistanceInfo';
import store from '../../../../store';
import { setPrevPageType } from '../../../../util';
import { Wrapper } from './Styled';

export interface HelpAssistancePage {
  oslug: string;
  acslug: string;
}

// 帮忙助力页
const HelpAssistancePage: FC<HelpAssistancePage> = (props) => {
  const [state] = store.useRxjsStore();
  const { AssistanceDetail } = state;
  const [isPopUp, setIsPopUp] = useState(false);
  const oslug = state.ObjectiveDetail?.slug || props.oslug;
  const acslug = state.ActivityDetail?.slug || props.acslug;

  // 查询当前活动的助力者列表信息
  const { data: ObjectiveDetail } = useRequest(
    () => QueryObjectiveDetail(AssistanceDetail?.slug!, oslug),
    {
      throwOnError: true,
      onSuccess: (ObjectiveDetailData) => {
        store.reducers.setObjectiveDetail(ObjectiveDetailData);
      }
    }
  );

  // 查询最新的活动信息
  const { data: ActivityDetail } = useRequest(
    () => QueryActivityDetail(AssistanceDetail?.slug!, oslug, acslug),
    {
      throwOnError: true,
      onSuccess: (ActivityDetailData) => {
        store.reducers.setActivityDetail(ActivityDetailData);
      }
    }
  );

  // 查询当前活动的助力者列表信息
  const { data: SupporterList } = useRequest(
    () => QuerySupporterList(AssistanceDetail?.slug!, oslug, acslug),
    {
      throwOnError: true
    }
  );

  useEffect(() => {
    setPrevPageType('HelpAssistancePage', state.PrevPageType);
  }, []);

  return (
    <Fragment>
      <Wrapper>
        <HeadImage picture={AssistanceDetail?.picture} />
        <div className='block-wrap c-div DIV_tzilQM'>
          <CountDown end_time={AssistanceDetail?.end_time} />
          {AssistanceDetail &&
            ActivityDetail &&
            ObjectiveDetail &&
            SupporterList && (
              <Fragment>
                <AssistanceInfo
                  AssistanceDetail={AssistanceDetail}
                  ActivityDetail={ActivityDetail}
                  ObjectiveDetail={ObjectiveDetail}
                  SupporterList={SupporterList}
                  onOpenPopUp={() => setIsPopUp(true)}
                />
                <AssistanceProgress
                  AssistanceDetail={AssistanceDetail}
                  ActivityDetail={ActivityDetail}
                  ObjectiveDetail={ObjectiveDetail}
                  SupporterList={SupporterList}
                />
                <RankingList aslug={AssistanceDetail?.slug} oslug={oslug} />
              </Fragment>
            )}
          <ActivityRules rules={AssistanceDetail?.rules} />
          <AssistanceContactInfo
            contact_info={AssistanceDetail?.contact_info}
          />
        </div>
        <GoBack pageType={state.PrevPageType} />
      </Wrapper>
      {isPopUp && (
        <PopUpInfo onClose={() => setIsPopUp(false)} value='已帮他助力成功' />
      )}
    </Fragment>
  );
};

export default HelpAssistancePage;
