const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ChangeSingleLotteryInfo': // 修改单个抽奖信息list
      return Object.assign({}, state, {
        lotteryInfo: action.value
      })
    case 'ChangeMyPrizeList': // 修改我的奖品信息list
      return Object.assign({}, state, {
        myPrizeList: action.value
      })
    case 'IsUserInfoModalShow': // 是否展示用户填写窗口
      return Object.assign({}, state, {
        IsUserInfoModalShow: action.value
      })
    case 'prize': // 抽奖结果
      return Object.assign({}, state, {
        prize: action.value
      })
    case 'isRotate': // 控制旋转
      return Object.assign({}, state, {
        isRotate: action.value
      })
    case 'stateChange': // 控制重新获取信息
      return Object.assign({}, state, {
        stateChange: action.value
      })
    case 'shouldUserInfoModalShow': // 是否显示用户数据填写框
      return Object.assign({}, state, {
        shouldUserInfoModalShow: action.value
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
