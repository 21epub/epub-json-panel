// 抽奖类型
export type LotteryType =
  | 'Turntable'
  | 'EggFrenzy'
  | 'LotteryBox'
  | 'LotteryGrid'

// api接口Url
export interface LotteryUrlListType {
  // 默认图片链接地址头
  picturePrefix: string
  // 获取单个抽奖活动信息
  singleLotteryUrl: string
  // 获取奖品信息列表
  prizeListUrl: string
  // 抽奖与获取我的奖品信息
  prizeUrl?: string
  // 获取与查询用户信息
  userInfoUrl?: string
  // 获取中奖用户滚动信息
  winnersUrl?: string
}

// 活动参数
export interface ObjectiveProps {
  id: string
  title: string
  description: string
  picture: string
  ranking: string
}

// 单个奖品参数
export interface SinglePrizeProps {
  id: string
  initiator_id: number
  initiator_username: string
  initiator_name: string
  initiator_avatar: string
  created: string
  received: 0 | 1
  objective: ObjectiveProps
}

// 单个抽奖活动参数
export interface SingleLotteryProps {
  type: string
  info_fields_list: string[] | null
  title: string
  id: string
  start_time: null | string
  end_time: null | string
  book_slug: string
  created: string
  total_draw_num_each_one: number
  can_draw_num_everyday: number
  need_user_info: true
  picture: any
  rules: null
  remain_times: number
  show_background_image: boolean
  show_rolling_list: boolean
  show_contact_info: boolean
  contact_info: any
}

// 用户信息参数
export interface UserInfo {
  id: string
  user_id: string | null
}
