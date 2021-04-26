import { ImageType, LotteryDetailType, LotteryUrlListType } from '../type';

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
  lotteryDetail: LotteryDetailType;
  // 抽奖接口Url列表
  lotteryUrlList: LotteryUrlListType;
}

export interface ActionType {
  type: string;
  value: Any;
}

export const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    // 是否展示用户填写窗口
    case 'IsUserInfoModalShow':
      return { ...state, IsUserInfoModalShow: action.value };
    // 是否显示用户数据填写框
    case 'shouldUserInfoModalShow':
      return { ...state, shouldUserInfoModalShow: action.value };
    // 是否复制成功
    case 'isCopySuccess':
      return { ...state, isCopySuccess: action.value };
    // 中间指针能否点击
    case 'isClickable':
      return { ...state, isClickable: action.value };
    // 我的奖品窗口
    case 'isPrizeModalShow':
      return { ...state, isPrizeModalShow: action.value };
    // 默认图片
    case 'pictureList':
      return { ...state, pictureList: action.value };
    // 抽奖应用详情
    case 'lotteryDetail':
      return { ...state, lotteryDetail: action.value };
    // 抽奖接口Url列表
    case 'lotteryUrlList':
      return { ...state, lotteryUrlList: action.value };
    default:
      return state;
  }
};
