// 抽奖类型
export type LotteryType =
  | 'EggFrenzy'
  | 'Gashapon'
  | 'LotteryBox'
  | 'LotteryGrid'
  | 'Turntable';

// 图片格式
export interface ImageType {
  // 图片标题
  label: string;
  // 图片名称，唯一标识
  name: string;
  // 图片url
  picture: string;
  // 图片描述
  description?: string;
}

// 图片格式
export interface LotteryPictureType {
  eggFrenzyPicture: ImageType[];
  gashaponPicture: ImageType[];
  lotteryBoxPicture: ImageType[];
  lotteryGridPicture: ImageType[];
  turntablePicture: ImageType[];
  [key: string]: ImageType[];
}

// api接口Url
export interface LotteryUrlListType {
  // 默认图片链接地址头
  picturePrefix: string;
  // 获取单个抽奖活动信息
  lotteryDetailUrl: string;
  // 获取奖品信息列表
  prizeListUrl: string;
  // 抽奖与获取我的奖品信息
  prizeUrl?: string;
  // 获取与查询用户信息
  userInfoUrl?: string;
  // 获取中奖用户滚动信息
  winnersUrl?: string;
}

// 奖品列表
export interface PrizeType {
  // 创建时间
  created: string;
  // 奖品描述
  description: string | null;
  // 奖品Id
  id: string;
  // 是否默认
  is_default: boolean;
  // 抽奖编号
  lottery: number;
  // 奖品图片
  picture: string;
  // 奖品类型
  prize_type: number;
  // 中奖轮播信息
  ranking: string;
  // 剩余次数
  remain_nums: number;
  // 奖品名称
  title: string;
  // 奖品总数
  total_num: number;
}

// 中奖者信息
export interface WinnerType {
  // 奖品id
  id: string;
  // 发起人id
  initiator_id: number;
  // 发起人用户名
  initiator_username: string;
  // 发起人姓名
  initiator_name: string;
  // 发起人头像
  initiator_avatar: string;
  // 创建时间
  created: string;
  // 标准类型
  received: 0 | 1;
  // 奖品信息
  objective: PrizeType;
}

// 举办方信息
export interface ContactInfoType {
  // 举办方名称
  name?: string;
}

// 单个抽奖活动参数
export interface LotteryDetailType {
  // 作品slug
  book_slug: string;
  // 是否可以继续抽奖
  can_continue_draw: boolean;
  // 每人每天可抽奖次数
  can_draw_num_everyday: number | null;
  // 每人每天可抽中次数
  can_win_num_everyday: number | null;
  // 举办方信息
  contact_info: ContactInfoType;
  _contact_info?: string;
  // 抽奖应用创建时间
  created?: string;
  // 抽奖规则：总计：total，每天：everyday
  draw_rule?: 'total' | 'everyday';
  // 抽奖活动结束时间
  end_time: string;
  // 抽奖应用id,slug
  id: string;
  // 用户填写的信息
  info_fields: string;
  // 用户填写信息列表
  info_fields_list?: string[];
  // 是否需要填写用户信息
  need_user_info: boolean;
  // 抽奖应用图片集合
  picture: ImageType[];
  _picture?: string;
  // 剩余抽奖次数
  remain_times: number | null;
  // 抽奖活动规则
  rules: string;
  // 是否显示背景图片
  show_background_image: boolean;
  // 是否显示举办方信息
  show_contact_info: boolean;
  // 是否显示中奖轮播
  show_rolling_list: boolean;
  // 抽奖活动开始时间
  start_time: string;
  // 抽奖活动名称
  title: string;
  // 总计每人可抽奖次数
  total_draw_num_each_one: number | null;
  // 总计每人可中奖次数
  total_win_num_each_one: number | null;
  // 抽奖应用类型，1：大转盘、2：砸金蛋、3：抽奖箱、4:扭蛋机、5：九宫格
  type: 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5';
  // 用户id
  user_id?: number;
}

// 用户填写的信息
export interface UserInfoType {
  // 地址
  address: string;
  // 创建时间
  created: string;
  // 邮箱
  email: string;
  // 数据id
  id: string;
  // mp应用slug
  mp_slug: string;
  // 用户姓名
  name: string;
  // 目标slug
  objective_slug: string | null;
  // 电话
  phone: string;
  // 用户id
  user_id: number;
}
