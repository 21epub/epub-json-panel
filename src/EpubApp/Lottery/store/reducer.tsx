import { ImageType, LotteryDetailType } from '../type';

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
}

export interface ActionType {
  type: string;
  value: Any;
}

export const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'IsUserInfoModalShow': // 是否展示用户填写窗口
      return { ...state, IsUserInfoModalShow: action.value };
    case 'shouldUserInfoModalShow': // 是否显示用户数据填写框
      return { ...state, shouldUserInfoModalShow: action.value };
    case 'isCopySuccess': // 是否复制成功
      return { ...state, isCopySuccess: action.value };
    case 'isClickable': // 中间指针能否点击
      return { ...state, isClickable: action.value };
    case 'isPrizeModalShow': // 我的奖品窗口
      return { ...state, isPrizeModalShow: action.value };
    case 'pictureList': // 默认图片
      return { ...state, pictureList: action.value };
    case 'lotteryDetail': // 抽奖应用详情
      return { ...state, lotteryDetail: action.value };
    default:
      return state;
  }
};
