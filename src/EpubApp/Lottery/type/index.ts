// 抽奖类型
export type LotteryType =
  | 'Turntable'
  | 'EggFrenzy'
  | 'LotteryBox'
  | 'Gashapon'
  | 'LotteryGrid'

// 图片格式
export interface ImageType {
  label: string
  name: string
  picture: string
  description?: string
}

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

// 奖品列表
export interface PrizeType {
  // 创建时间
  created: string
  // 奖品描述
  description: string | null
  // 奖品Id
  id: string
  // 是否默认
  is_default: boolean
  // 抽奖编号
  lottery: number
  // 奖品图片
  picture: string
  // 奖品类型
  prize_type: number
  // 中奖轮播信息
  ranking: string
  // 剩余次数
  remain_nums: number
  // 奖品名称
  title: string
  // 奖品总数
  total_num: number
}

// 中奖者信息
export interface WinnerListType {
  // 奖品id
  id: string
  // 发起人id
  initiator_id: number
  // 发起人用户名
  initiator_username: string
  // 发起人姓名
  initiator_name: string
  // 发起人头像
  initiator_avatar: string
  // 创建时间
  created: string
  // 标准类型
  received: 0 | 1
  // 奖品信息
  objective: PrizeType
}

// 单个抽奖活动参数
export interface SingleLotteryType {
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
  picture: ImageType[]
  rules: null
  remain_times: number
  show_background_image: boolean
  show_rolling_list: boolean
  show_contact_info: boolean
  contact_info: any
}

// 用户填写的信息
export interface UserInfoType {
  // 地址
  address: string
  // 创建时间
  created: string
  // 邮箱
  email: string
  // 数据id
  id: number
  // mp应用slug
  mp_slug: string
  // 用户姓名
  name: string
  // 目标slug
  objective_slug: string | null
  // 电话
  phone: string
  // 用户id
  user_id: number
}
