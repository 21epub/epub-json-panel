import { createStore } from 'redux'

import reducer from './reducer'

const initialState = {
  IsUserInfoModalShow: false,
  isClickable: true,
  isRotate: false,
  stateChange: false,
  shouldUserInfoModalShow: false // 有实际含义
}
const store = createStore(reducer, initialState)

export default store
