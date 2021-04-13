export interface StateType {
  IsUserInfoModalShow: boolean;
  IsWin: boolean;
  isClickable: boolean;
  isCopySuccess: boolean;
  isPrizeModalShow: boolean;
  shouldUserInfoModalShow: boolean;
}

export interface ActionType {
  type: string;
  value: boolean;
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
    default:
      return state;
  }
};
