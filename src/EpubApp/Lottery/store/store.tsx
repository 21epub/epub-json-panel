import { createStore } from 'redux';

import { reducer } from './reducer';

const initialState = {
  IsUserInfoModalShow: false, // 是否显示用户窗
  isClickable: true, // 抽奖按钮是否可以点击
  shouldUserInfoModalShow: false, // 是否应该显示用户窗
  IsWin: false, // 是否中奖
  isCopySuccess: false,
  isPrizeModalShow: false // 我的奖品窗口
};

const store = createStore(reducer as Any, initialState);

export default store;
