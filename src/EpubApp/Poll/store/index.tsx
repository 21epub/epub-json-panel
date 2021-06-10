import RxjsStore, { RxjsStoreReducerParams } from '@21epub/react-rxjs-store';
import {
  PollImageType,
  PollDetailType,
  PollApiPropsType,
  PollEventType
} from '../type';

// 管理的状态数据
export interface StateType {
  // 默认图片
  pollPicture: PollImageType[];
  // 当前签到应用详情
  pollDetail?: PollDetailType;
  // 抽奖接口Url列表
  pollApiProps?: PollApiPropsType;
  // 事件及触发器
  pollEvent?: PollEventType;
  // 是否弹出填写用户信息框
  isShowUserInfoModal?: boolean;
  // 是否允许点击参加
  isClickable?: boolean;
}

// 初始值
const initState: StateType = {
  pollPicture: [],
  pollDetail: undefined,
  pollApiProps: undefined,
  pollEvent: undefined,
  isShowUserInfoModal: false,
  isClickable: true
};

// Reducers Types definition (Recommanded)
interface Reducers<S> extends RxjsStoreReducerParams<S> {
  setPollPicture: (state: S, payload?: PollImageType[]) => S;
  setPollDetail: (state: S, payload?: PollDetailType) => S;
  setPollApiProps: (state: S, payload?: PollApiPropsType) => S;
  setPollEvent: (state: S, payload?: PollEventType) => S;
  setIsShowUserInfoModal: (state: S, payload?: boolean) => S;
  setIsClickable: (state: S, payload?: boolean) => S;
}

const reducers: Reducers<StateType> = {
  setPollPicture(state, payload = []) {
    return { ...state, pollPicture: payload };
  },
  setPollDetail(state, payload) {
    return { ...state, pollDetail: payload };
  },
  setPollRecord(state, payload) {
    return { ...state, pollRecord: payload };
  },
  setPollApiProps(state, payload) {
    return { ...state, pollApiProps: payload };
  },
  setPollEvent(state, payload) {
    return { ...state, pollEvent: payload };
  },
  setIsShowUserInfoModal(state, payload) {
    return { ...state, isShowUserInfoModal: payload };
  },
  setIsClickable(state, payload) {
    return { ...state, isClickable: payload };
  }
};

export default new RxjsStore<StateType, Reducers<StateType>>(
  initState,
  reducers
);
