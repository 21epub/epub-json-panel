import RxjsStore, { RxjsStoreReducerParams } from '@21epub/react-rxjs-store';
import { ClockImageType, ClockDetailType, ClockUrlListType } from '../type';

// 管理的状态数据
export interface StateType {
  // 默认图片
  pictureList: ClockImageType[];
  // 当前签到应用详情
  clockDetail?: ClockDetailType;
  // 抽奖接口Url列表
  clockUrlList?: ClockUrlListType;
}

// 初始值
const initState: StateType = {
  pictureList: [],
  clockDetail: undefined,
  clockUrlList: undefined
};

// Reducers Types definition (Recommanded)
interface Reducers<S> extends RxjsStoreReducerParams<S> {
  setPictureList: (state: S, payload?: ClockImageType[]) => S;
  setClockDetail: (state: S, payload?: ClockDetailType) => S;
  setClockUrlList: (state: S, payload?: ClockUrlListType) => S;
}

const reducers: Reducers<StateType> = {
  setPictureList(state, payload = []) {
    return { ...state, pictureList: payload };
  },
  setClockDetail(state, payload) {
    return { ...state, clockDetail: payload };
  },
  setClockUrlList(state, payload) {
    return { ...state, clockUrlList: payload };
  }
};

export default new RxjsStore<StateType, Reducers<StateType>>(
  initState,
  reducers
);
