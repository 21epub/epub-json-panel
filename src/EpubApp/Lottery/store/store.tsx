import { createStore } from 'redux';

import { reducer } from './reducer';

const initialState = {
  IsUserInfoModalShow: false,
  isClickable: true,
  shouldUserInfoModalShow: false,
  IsWin: false,
  isCopySuccess: false,
  isPrizeModalShow: false,
  pictureList: [],
  lotteryDetail: {}
};

const store = createStore(reducer as Any, initialState);

export default store;
