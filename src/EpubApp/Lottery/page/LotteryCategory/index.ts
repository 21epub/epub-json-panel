import EggFrenzy from './EggFrenzy'
import LotteryBox from './LotteryBox'
import Turntable from './Turntable'

export const getLotteryComponent = (lotteryType: string) => {
  // 抽奖应用列表
  const lotteryMap = {
    EggFrenzy,
    LotteryBox,
    Turntable
  }

  return Reflect.get(lotteryMap, lotteryType) ?? Turntable
}
