import RxjsStore, { RxjsStoreReducerParams } from '@21epub/react-rxjs-store';
import type { PageType } from '../index';
import type {
  AssistanceDetailType,
  ObjectiveDetailType,
  ActivityDetailType,
  AssistanceApiPropsType,
  AssistanceEventType,
  AssistanceImageType
} from '../type';

// 管理的状态数据
interface State {
  PrevPageType: PageType;
  PageType: PageType;
  AssistanceDetail?: AssistanceDetailType;
  ObjectiveDetail?: ObjectiveDetailType;
  ActivityDetail?: ActivityDetailType;
  AssistanceApiProps?: AssistanceApiPropsType;
  AssistanceEvent?: AssistanceEventType;
  AssistancePicture: AssistanceImageType[];
}

// 初始值
const initState: State = {
  PrevPageType: 'HomePage',
  PageType: '',
  AssistanceDetail: undefined,
  ObjectiveDetail: undefined,
  ActivityDetail: undefined,
  AssistanceApiProps: undefined,
  AssistanceEvent: undefined,
  AssistancePicture: []
};

// Reducers Types definition (Recommanded)
interface Reducers<S> extends RxjsStoreReducerParams<S> {
  setPrevPageType: (state: S, payload?: PageType) => S;
  changePage: (state: S, payload?: PageType) => S;
  setAssistanceDetail: (state: S, payload?: AssistanceDetailType) => S;
  setObjectiveDetail: (state: S, payload?: ObjectiveDetailType) => S;
  setActivityDetail: (state: S, payload?: ActivityDetailType) => S;
  setAssistanceApiProps: (state: S, payload?: AssistanceApiPropsType) => S;
  setAssistanceEvent: (state: S, payload?: AssistanceEventType) => S;
  setAssistancePicture: (state: S, payload?: AssistanceImageType[]) => S;
}

const reducers: Reducers<State> = {
  // Sync state management
  // 跳转页面
  changePage(state, payload = '') {
    return { ...state, PageType: payload };
  },
  // 保存上一页，页码
  setPrevPageType(state, payload = '') {
    return { ...state, PrevPageType: payload };
  },
  // 保存助力详情
  setAssistanceDetail(state, payload) {
    return { ...state, AssistanceDetail: payload };
  },
  // 保存目标商品详情
  setObjectiveDetail(state, payload) {
    return { ...state, ObjectiveDetail: payload };
  },
  // 保存发起的活动信息详情
  setActivityDetail(state, payload) {
    return { ...state, ActivityDetail: payload };
  },
  // 保存助力链接url
  setAssistanceApiProps(state, payload) {
    return { ...state, AssistanceApiProps: payload };
  },
  // 保存助力需要用到的事件，方法，触发器等
  setAssistanceEvent(state, payload) {
    return { ...state, AssistanceEvent: payload };
  },
  // 保存助力活动图片
  setAssistancePicture(state, payload = []) {
    return { ...state, AssistancePicture: payload };
  }
};

export default new RxjsStore<State, Reducers<State>>(initState, reducers);
