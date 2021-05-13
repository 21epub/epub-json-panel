// 图片格式
export interface ClockImageType {
  // 图片标题
  label: string;
  // 图片名称，唯一标识
  name: string;
  // 图片url
  picture: string;
  // 图片描述
  description?: string;
}

// api接口Url
export interface ClockUrlListType {
  // 默认图片链接地址头
  web_url: string;
  // 获取签到信息
  clockDetailUrl: string;
  // 获取奖品信息列表
  prizeListUrl: string;
  // 抽奖与获取我的奖品信息
  prizeUrl?: string;
  // 获取与查询用户信息
  userInfoUrl?: string;
  // 获取中奖用户滚动信息
  winnersUrl?: string;
}

// 图片格式
export interface ClockPictureType {
  calendarClockPicture: ClockImageType[];
  [key: string]: ClockImageType[];
}

// 奖品列表
export interface ClockRecordType {
  // 奖品Id
  id: string;
  // 创建时间
  created: string;
  // 用户id
  user_id: string | null;
  // 用户头像
  initiator_avatar: boolean;
  // 用户编号
  initiator_id: number;
  // 用户昵称
  initiator_name: string;
  // 用户姓名
  initiator_username: number;
  // 累计签到次数
  total_clock_num_each_one: number;
  // 连续签到次数
  keep_clock_num_each_one: number;
  // 积分
  integral: number;
  // 已签到日期
  already_clock: string[];
  // 漏签日期
  omit_clock: string[];
}

// 举办方信息
export interface ClockContactInfoType {
  // 举办方名称
  name?: string;
}

// 单个抽奖活动参数
export interface ClockDetailType {
  // 抽奖应用id,slug
  id: string;
  // 作品slug
  book_slug: string;
  // 签到类型
  type: number;
  // 签到活动名称
  title: string;
  // 累计签到次数
  total_clock_num_each_one: number;
  // 连续签到次数
  keep_clock_num_each_one: number;
  // 参与人数
  participants: number;
  // 抽奖活动开始时间
  start_time: string;
  // 抽奖活动结束时间
  end_time: string;
  // 抽奖活动规则
  rules: string;
  // 举办方信息
  contact_info: ClockContactInfoType;
  _contact_info?: string;
  // 应用图片集合
  picture: ClockImageType[];
  _picture?: string;
  // 是否自动签到
  auto_clock: boolean;
  // 是否展开日历
  open_calendar: boolean;
  // 是否显示背景图片
  show_background_image: boolean;
  // 是否显示举办方信息
  show_contact_info: boolean;
  // 是否显示参与人数
  show_participants: boolean;
  // 在参与人数上增加额外显示的人数
  add_participants: number;
  // 用户填写的信息
  info_fields: string;
  // 用户填写信息列表
  info_fields_list?: string[];
  // 是否需要填写用户信息
  need_user_info: boolean;
  // 应用创建时间
  created?: string;
  // 用户id
  user_id?: number;
  // 已签到日期
  already_clock: string[];
  // 漏签日期
  omit_clock: string[];
}
