// import EggFrenzy from './EggFrenzy'
import OpenTreasureBox from './OpenTreasureBox'
import Turntable from './Turntable'

export const getLotteryComponent = (lotteryType: string) => {
  // 抽奖应用列表
  const lotteryMap = {
    // EggFrenzy,
    OpenTreasureBox,
    Turntable
  }

  return Reflect.get(lotteryMap, lotteryType) ?? Turntable
}
