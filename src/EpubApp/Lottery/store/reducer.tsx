const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'IsUserInfoModalShow': // 是否展示用户填写窗口
      return Object.assign({}, state, {
        IsUserInfoModalShow: action.value
      })
    case 'shouldUserInfoModalShow': // 是否显示用户数据填写框
      return Object.assign({}, state, {
        shouldUserInfoModalShow: action.value
      })
    case 'isCopySuccess': // 是否复制成功
      return Object.assign({}, state, {
        isCopySuccess: action.value
      })
    case 'isClickable': // 中间指针能否点击
      return Object.assign({}, state, {
        isClickable: action.value
      })
    default:
      return state
  }
}

export default reducer
