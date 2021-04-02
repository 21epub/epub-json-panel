import EggFrenzy from './EggFrenzy'
import LotteryBox from './LotteryBox'
import Turntable from './Turntable'
import LotteryGrid from './LotteryGrid'

export const getLotteryComponent = (lotteryType: string) => {
  // 抽奖应用列表
  const lotteryMap = {
    EggFrenzy,
    LotteryBox,
    Turntable,
    LotteryGrid
  }

  return Reflect.get(lotteryMap, lotteryType) ?? Turntable
}
