import RxjsStore, { RxjsStoreReducerParams } from '@21epub/react-rxjs-store';
import type { PageNumberType } from '../index';
import type { ObjectiveDetailType, ActivityDetailType } from '../type';

// 管理的状态数据
interface State {
  PrevPageNumber: PageNumberType;
  PageNumber: PageNumberType;
  ObjectiveDetail?: ObjectiveDetailType;
  ActivityDetail?: ActivityDetailType;
}

// 初始值
const initState: State = {
  PrevPageNumber: 'HomePage',
  PageNumber: '',
  ObjectiveDetail: undefined,
  ActivityDetail: undefined
};

// Reducers Types definition (Recommanded)
interface Reducers<S> extends RxjsStoreReducerParams<S> {
  SavePrevPageNumber: (state: S, payload?: PageNumberType) => S;
  ChangePage: (state: S, payload?: PageNumberType) => S;
  SetObjectiveDetail: (state: S, payload?: ObjectiveDetailType) => S;
  SetActivityDetail: (state: S, payload?: ActivityDetailType) => S;
}

const reducers: Reducers<State> = {
  // Sync state management
  // 跳转页面
  ChangePage(state, payload = '') {
    return { ...state, PageNumber: payload };
  },
  // 保存上一页，页码
  SavePrevPageNumber(state, payload = '') {
    return { ...state, PrevPageNumber: payload };
  },
  // 保存目标商品详情
  SetObjectiveDetail(state, payload) {
    return { ...state, ObjectiveDetail: payload };
  },
  // 保存发起的活动信息详情
  SetActivityDetail(state, payload) {
    return { ...state, ActivityDetail: payload };
  }
};

export default new RxjsStore<State, Reducers<State>>(initState, reducers);
