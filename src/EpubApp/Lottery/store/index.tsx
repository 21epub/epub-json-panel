import RxjsStore, { RxjsStoreReducerParams } from '@21epub/react-rxjs-store';
import {
  LotteryImageType,
  LotteryDetailType,
  LotteryUrlListType,
  LotteryEventType
} from '../type';

// 管理的状态数据
export interface StateType {
  // 是否显示用户窗
  isUserInfoModalShow: boolean;
  // 抽奖按钮是否可以点击
  isClickable: boolean;
  // 是否复制成功
  isCopySuccess: boolean;
  // 我的奖品窗口
  isPrizeModalShow: boolean;
  // 默认图片
  pictureList: LotteryImageType[];
  // 当前抽奖应用详情
  lotteryDetail?: LotteryDetailType;
  // 抽奖接口Url列表
  lotteryUrlList?: LotteryUrlListType;
  // 事件及触发器
  lotteryEvent?: LotteryEventType;
  // 是否展示活动时间段提示
  isActivityTimeModalShow: boolean;
  // 是否在活动时间段
  betweenActivityTime: boolean;
  // 是否需要在抽奖结束后展示用户信息填写弹窗
  showUserModalAfterLottery: boolean;
  // 用户是否已经填写信息
  filledUserInfo: boolean;
}

// 初始值
const initState: StateType = {
  isUserInfoModalShow: false,
  isClickable: true,
  isCopySuccess: false,
  isPrizeModalShow: false,
  pictureList: [],
  lotteryDetail: undefined,
  lotteryUrlList: undefined,
  lotteryEvent: undefined,
  isActivityTimeModalShow: false,
  betweenActivityTime: true,
  showUserModalAfterLottery: false,
  filledUserInfo: false
};

// Reducers Types definition (Recommanded)
interface Reducers<S> extends RxjsStoreReducerParams<S> {
  setIsUserInfoModalShow: (state: S, payload?: boolean) => S;
  setIsClickable: (state: S, payload?: boolean) => S;
  setIsCopySuccess: (state: S, payload?: boolean) => S;
  setIsPrizeModalShow: (state: S, payload?: boolean) => S;
  setPictureList: (state: S, payload?: LotteryImageType[]) => S;
  setLotteryDetail: (state: S, payload?: LotteryDetailType) => S;
  setLotteryUrlList: (state: S, payload?: LotteryUrlListType) => S;
  setLotteryEvent: (state: S, payload?: LotteryEventType) => S;
  setIsActivityTimeModalShow: (state: S, payload: boolean) => S;
  setBetweenActivityTime: (state: S, payload: boolean) => S;
  setShowUserModalAfterLottery: (state: S, payload: boolean) => S;
  setFilledUserInfo: (state: S, payload: boolean) => S;
}

const reducers: Reducers<StateType> = {
  // Sync state management
  setIsUserInfoModalShow(state, payload = false) {
    return { ...state, isUserInfoModalShow: payload };
  },
  setIsClickable(state, payload = true) {
    return { ...state, isClickable: payload };
  },
  setIsCopySuccess(state, payload = false) {
    return { ...state, isCopySuccess: payload };
  },
  setIsPrizeModalShow(state, payload = false) {
    return { ...state, isPrizeModalShow: payload };
  },
  setPictureList(state, payload = []) {
    return { ...state, pictureList: payload };
  },
  setLotteryDetail(state, payload) {
    return { ...state, lotteryDetail: payload };
  },
  setLotteryUrlList(state, payload) {
    return { ...state, lotteryUrlList: payload };
  },
  setLotteryEvent(state, payload) {
    return { ...state, lotteryEvent: payload };
  },
  setIsActivityTimeModalShow(state, payload) {
    return { ...state, isActivityTimeModalShow: payload };
  },
  setBetweenActivityTime(state, payload) {
    return { ...state, betweenActivityTime: payload };
  },
  setShowUserModalAfterLottery(state, payload) {
    return { ...state, showUserModalAfterLottery: payload };
  },
  setFilledUserInfo(state, payload) {
    return { ...state, filledUserInfo: payload };
  }
};

export default new RxjsStore<StateType, Reducers<StateType>>(
  initState,
  reducers
);
