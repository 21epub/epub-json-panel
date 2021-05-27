import RxjsStore, { RxjsStoreReducerParams } from '@21epub/react-rxjs-store';
import {
  ClockImageType,
  ClockDetailType,
  ClockRecordType,
  ClockApiPropsType,
  ClockEventType
} from '../type';

// 管理的状态数据
export interface StateType {
  // 默认图片
  pictureList: ClockImageType[];
  // 当前签到应用详情
  clockDetail?: ClockDetailType;
  // 当前签到记录详情
  clockRecord?: ClockRecordType[];
  // 抽奖接口Url列表
  clockApiProps?: ClockApiPropsType;
  // 事件及触发器
  clockEvent?: ClockEventType;
  // 是否弹出填写用户信息框
  isShowUserInfoModal?: boolean;
  // 是否允许点击签到
  isClickable?: boolean;
}

// 初始值
const initState: StateType = {
  pictureList: [],
  clockDetail: undefined,
  clockRecord: undefined,
  clockApiProps: undefined,
  clockEvent: undefined,
  isShowUserInfoModal: false,
  isClickable: true
};

// Reducers Types definition (Recommanded)
interface Reducers<S> extends RxjsStoreReducerParams<S> {
  setPictureList: (state: S, payload?: ClockImageType[]) => S;
  setClockDetail: (state: S, payload?: ClockDetailType) => S;
  setClockRecord: (state: S, payload?: ClockRecordType[]) => S;
  setClockApiProps: (state: S, payload?: ClockApiPropsType) => S;
  setClockEvent: (state: S, payload?: ClockEventType) => S;
  setIsShowUserInfoModal: (state: S, payload?: boolean) => S;
  setIsClickable: (state: S, payload?: boolean) => S;
}

const reducers: Reducers<StateType> = {
  setPictureList(state, payload = []) {
    return { ...state, pictureList: payload };
  },
  setClockDetail(state, payload) {
    return { ...state, clockDetail: payload };
  },
  setClockRecord(state, payload) {
    return { ...state, clockRecord: payload };
  },
  setClockApiProps(state, payload) {
    return { ...state, clockApiProps: payload };
  },
  setClockEvent(state, payload) {
    return { ...state, clockEvent: payload };
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
