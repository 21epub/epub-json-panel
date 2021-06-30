import React, { FC, useState, Fragment, useEffect } from 'react';
import {
  HeadImage,
  CountDown,
  ActivityRules,
  AssistanceContactInfo,
  RankingList,
  GoBack,
  SignUpInfo
} from '../../../../components';
import ObjectiveDetails from './ObjectiveDetail';
import store from '../../../../store';
import { setPrevPageType, getPicture } from '../../../../util';
import { Wrapper } from './Styled';

interface ObjectivePageProps {}

// 助力目标详情页
const ObjectivePage: FC<ObjectivePageProps> = () => {
  const [state] = store.useRxjsStore();
  const { AssistanceDetail, ObjectiveDetail, AssistancePicture } = state;
  const [isSignUp, setSignUp] = useState(false);
  const [titlePicture, setTitlePicture] = useState('');
  const defaultTitlePicture = getPicture(AssistancePicture ?? [], 'background');

  useEffect(() => {
    setPrevPageType('ObjectivePage', state.PrevPageType);
  }, []);

  useEffect(() => {
    if (AssistanceDetail) {
      setTitlePicture(
        getPicture(AssistanceDetail?.picture ?? [], 'background') || ''
      );
    }
  }, [AssistanceDetail]);

  return (
    <Fragment>
      <Wrapper>
        <HeadImage picture={titlePicture || defaultTitlePicture} />
        <div className='block-wrap c-div DIV_tzilQM'>
          <CountDown end_time={AssistanceDetail?.end_time} />
          {ObjectiveDetail && (
            <Fragment>
              <ObjectiveDetails
                ObjectiveDetail={ObjectiveDetail}
                onPartake={() => {
                  setSignUp(true);
                }}
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

export default ObjectivePage;
