import { createStore } from 'redux'

import reducer from './reducer'

const initialState = {
  IsUserInfoModalShow: false, // 有实际含义,是否显示用户窗
  isClickable: true, // 有实际含义，抽奖按钮是否可以点击
  shouldUserInfoModalShow: false // 有实际含义，是否应该显示用户窗
}
const store = createStore(reducer, initialState)

export default store
