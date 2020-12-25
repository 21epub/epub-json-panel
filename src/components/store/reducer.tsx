const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'Slug': // 用于保存当前助力slug
      return Object.assign({}, state, {
        Slug: action.value
      })
    case 'ChangePrizeList': // 修改奖品信息list
      return Object.assign({}, state, {
        prizeList: action.value
      })
    case 'ChangeSingleLotteryInfo': // 修改单个抽奖信息list
      return Object.assign({}, state, {
        lotteryInfo: action.value
      })
    case 'ChangeMyPrizeList': // 修改我的奖品信息list
      return Object.assign({}, state, {
        myPrizeList: action.value
      })
    default:
      return state
  }
}

export default reducer
