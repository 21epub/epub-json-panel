import React, { FC } from 'react';
import { message } from 'antd';
import { useRequest } from 'ahooks';
import {
  QueryObjectiveDetail,
  QueryActivityList
} from '../../../../../data/api';
import type { ObjectiveDetailType } from '../../../../../type';
import { getPicture } from '../../../../../util';
import store from '../../../../../store';
import { Wrapper } from './Styled';

interface ObjectiveListProps {
  ObjectiveListValue: ObjectiveDetailType[];
  aslug?: string;
}

// 首页目标商品列表
const ObjectiveList: FC<ObjectiveListProps> = (props) => {
  const { ObjectiveListValue, aslug } = props;
  const [state] = store.useRxjsStore();
  const { AssistancePicture = [] } = state;
  const defaultObjectivePic = getPicture(AssistancePicture, 'objective');

  // 查询当前目标商品详情接口
  const { run: RunObjectiveDetail } = useRequest(QueryObjectiveDetail, {
    manual: true,
    throwOnError: true,
    onSuccess: (ObjectiveDetail: ObjectiveDetailType) => {
      if (ActivityList && ActivityList.length > 0) {
        store.reducers.setActivityDetail(ActivityList[0]);
        setTimeout(() => {
          // 活动列表大于0，说明当前用户针对此目标商品发起过助力。跳转到已发起助力页；
          store.reducers.changePage('MyAssistancePage');
        });
      } else {
        if (ObjectiveDetail && ObjectiveDetail?.remain > 0) {
          // 活动列表等于0，表明用户未发起过活动，进去活动详情页
          store.reducers.changePage('ObjectivePage');
        } else {
          // 没有剩余,提示用户更换目标
          message.error('商品已被抢完，请更换商品');
        }
      }
    }
  });

  // 查询用户针对当前商品发起的助力活动列表接口
  const { data: ActivityList, run: RunQueryActivityList } = useRequest(
    QueryActivityList,
    {
      manual: true,
      throwOnError: true,
      onSuccess: (_data, params) => {
        // 查询当前目标商品的详情信息，判断是否有剩余
        RunObjectiveDetail(params[0], params[1]);
      }
    }
  );

  // 用户点击某一目标时
  const onClick = (CurrentObjectiveDetail: ObjectiveDetailType) => {
    store.reducers.setObjectiveDetail(CurrentObjectiveDetail);
    // 查询当前用户针对当前目标商品发起的助力活动列表，判断当前用户针对此目标是否发起过助力。
    aslug && RunQueryActivityList(aslug, CurrentObjectiveDetail.slug);
  };

  // 首页内容
  return (
    <Wrapper>
      <ul className='cs-o-list c-list UL_hzfSXG'>
        {ObjectiveListValue?.map((item) => {
          return (
            <li
              className='c-listitem LI_735Cot'
              key={item.slug}
              onClick={() => onClick(item)}
            >
              <div className='c-div DIV_QOQc8O'>
                <img
                  src={item.picture || defaultObjectivePic}
                  alt=''
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className='c-div DIV_WF5y9X'>
                <p className='c-paragraph P_jSOUJu'>{item.title}</p>
                <p className='c-paragraph P_75CUYE'>剩余：{item.remain}</p>
                <p className='c-paragraph P_75CUYE'>
                  已有{item.has_participated}人参与
                </p>
                <p className='c-paragraph P_75CUYE'>
                  需{item.target_score}人助力
                </p>
              </div>
              <i className='fa fa-angle-right c-icon I_xcL2TZ' />
              <a className='c-linkblock A_SCR5Bk' href='#' />
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default ObjectiveList;
