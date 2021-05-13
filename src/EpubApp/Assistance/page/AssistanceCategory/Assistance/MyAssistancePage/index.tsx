import React, { FC, Fragment, useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { QueryActivityDetail, QuerySupporterList } from '../../../../data/api';
// 引入各组件
import {
  HeadImage,
  CountDown,
  ActivityRules,
  AssistanceContactInfo,
  RankingList,
  GoBack,
  PopUpInfo,
  AssistanceProgress,
  SignUpInfo
} from '../../../../components';
import MyAssistanceInfo from './MyAssistanceInfo';
import store from '../../../../store';
import { setPrevPageType } from '../../../../util';
import { Wrapper } from './Styled';

interface MyAssistancePageProps {}

// 助力目标详情页
const MyAssistancePage: FC<MyAssistancePageProps> = () => {
  const [state] = store.useRxjsStore();
  const { AssistanceDetail, AssistanceApiProps } = state;
  const { urlKey } = AssistanceApiProps ?? {};
  const { ObjectiveDetail } = state; // 获取保存的状态
  const [isPopUp, setIsPopUp] = useState(false);
  const [isSignUp, setSignUp] = useState(false);

  // 查询最新的活动信息
  const { data: ActivityDetail } = useRequest(
    () =>
      QueryActivityDetail(
        AssistanceDetail?.slug!,
        ObjectiveDetail?.slug!,
        state.ActivityDetail?.slug!
      ),
    {
      onSuccess: (ActivityDetailData) => {
        store.reducers.setActivityDetail(ActivityDetailData);
      }
    }
  );

  // 查询当前活动的助力者列表信息
  const { data: SupporterList } = useRequest(() =>
    QuerySupporterList(
      AssistanceDetail?.slug!,
      ObjectiveDetail?.slug!,
      state.ActivityDetail?.slug!
    )
  );

  useEffect(() => {
    setPrevPageType('MyAssistancePage', state.PrevPageType);
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
                <MyAssistanceInfo
                  ActivityDetail={ActivityDetail}
                  ObjectiveDetail={ObjectiveDetail}
                  SupporterList={SupporterList}
                  urlKey={urlKey}
                  onOpenPopUp={() => setIsPopUp(true)}
                  onOpenSingUp={() => setSignUp(true)}
                />
                <AssistanceProgress
                  AssistanceDetail={AssistanceDetail}
                  ActivityDetail={ActivityDetail}
                  ObjectiveDetail={ObjectiveDetail}
                  SupporterList={SupporterList}
                />
                <RankingList
                  aslug={AssistanceDetail?.slug}
                  oslug={ObjectiveDetail?.slug}
                />
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
        <PopUpInfo
          onClose={() => setIsPopUp(false)}
          value='点击右上角分享邀请好友'
        />
      )}
      {isSignUp && AssistanceDetail && ObjectiveDetail && (
        <SignUpInfo
          AssistanceDetail={AssistanceDetail}
          ObjectiveDetail={ObjectiveDetail}
          onClose={() => setSignUp(false)}
        />
      )}
    </Fragment>
  );
};

export default MyAssistancePage;
