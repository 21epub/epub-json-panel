import RxjsStore, { RxjsStoreReducerParams } from '@21epub/react-rxjs-store';
import { ImageType, LotteryDetailType, LotteryUrlListType } from '../type';

// 管理的状态数据
export interface StateType {
  // 是否显示用户窗
  IsUserInfoModalShow: boolean;
  // 是否中奖
  IsWin: boolean;
  // 抽奖按钮是否可以点击
  isClickable: boolean;
  // 是否复制成功
  isCopySuccess: boolean;
  // 我的奖品窗口
  isPrizeModalShow: boolean;
  // 是否应该显示用户窗
  shouldUserInfoModalShow: boolean;
  // 默认图片
  pictureList: ImageType[];
  // 当前抽奖应用详情
  lotteryDetail?: LotteryDetailType;
  // 抽奖接口Url列表
  lotteryUrlList?: LotteryUrlListType;
}

// 初始值
const initState: StateType = {
  IsUserInfoModalShow: false,
  isClickable: true,
  shouldUserInfoModalShow: false,
  IsWin: false,
  isCopySuccess: false,
  isPrizeModalShow: false,
  pictureList: [],
  lotteryDetail: undefined,
  lotteryUrlList: undefined
};

// Reducers Types definition (Recommanded)
interface Reducers<S> extends RxjsStoreReducerParams<S> {
  setIsUserInfoModalShow: (state: S, payload?: boolean) => S;
  setIsClickable: (state: S, payload?: boolean) => S;
  setShouldUserInfoModalShow: (state: S, payload?: boolean) => S;
  setIsWin: (state: S, payload?: boolean) => S;
  setIsCopySuccess: (state: S, payload?: boolean) => S;
  setIsPrizeModalShow: (state: S, payload?: boolean) => S;
  setPictureList: (state: S, payload?: ImageType[]) => S;
  setLotteryDetail: (state: S, payload?: LotteryDetailType) => S;
  setLotteryUrlList: (state: S, payload?: LotteryUrlListType) => S;
}

const reducers: Reducers<StateType> = {
  // Sync state management
  setIsUserInfoModalShow(state, payload = false) {
    return { ...state, IsUserInfoModalShow: payload };
  },
  setIsClickable(state, payload = true) {
    return { ...state, isClickable: payload };
  },
  setShouldUserInfoModalShow(state, payload = false) {
    return { ...state, shouldUserInfoModalShow: payload };
  },
  setIsWin(state, payload = false) {
    return { ...state, IsWin: payload };
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
  }
};

export default new RxjsStore<StateType, Reducers<StateType>>(
  initState,
  reducers
);
