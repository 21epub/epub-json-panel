export type ClockType = 'CalendarClock';

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

// api参数
export interface ClockApiPropsType {
  // 应用slug
  slug: string;
  // 默认图片链接地址头
  web_url: string;
}

// 图片格式
export interface ClockPictureType {
  calendarClockPicture: ClockImageType[];
  [key: string]: ClockImageType[];
}

// 个人打卡记录
export interface ClockRankingType {
  // Id
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
  // 表格用到的key
  key?: number;
}

// 签到记录列表
export interface ClockRecordType {
  // Id
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

// 用户信息
export interface ClockUserInfoType {
  // 地址
  address: string;
  // 创建时间
  created: string;
  // 邮箱
  email: string;
  // id
  id: number;
  // 作品slug
  mp_slug: string;
  // 姓名
  name: string;
  // 目标slug
  objective_slug: string;
  // 电话
  phone: string;
  // 用户id
  user_id: number;
}

// 举办方信息
export interface ClockContactInfoType {
  // 举办方名称
  name?: string;
  // 举办方地址
  address?: string;
  // 举办方联系方式
  phone?: string;
}

// 单个抽奖活动参数
export interface ClockDetailType {
  // 抽奖应用id,slug
  slug?: string;
  // 作品slug
  book_slug: string;
  // 签到类型
  clock_type: number;
  // 签到活动名称
  title: string;
  // 累计签到目标次数
  total_clock_target_num?: number;
  // 连续签到目标次数
  keep_clock_target_num?: number;
  // 参与人数
  participants?: number;
  // 抽奖活动开始时间
  start_time: string;
  // 抽奖活动结束时间
  end_time: string;
  // 抽奖活动规则
  rules: string;
  // 举办方信息
  contact_info?: ClockContactInfoType;
  _contact_info?: string;
  // 应用图片集合
  picture?: ClockImageType[];
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
  // 是否需要填写用户信息
  need_user_info?: boolean;
  // 在参与人数上增加额外显示的人数
  add_participants: number;
  // 用户填写的信息
  info_fields: string;
  // 用户填写信息列表
  info_fields_list?: string[];
  // 应用创建时间
  created?: string;
  // 用户id
  user_id?: number;
  // 举办方名称
  contact_info_0?: string;
  // 举办方地址
  contact_info_1?: string;
  // 举办方联系方式
  contact_info_2?: string;
  // 时间范围
  clockTime?: string[];
}

export interface ClockActionsType {
  // 签到成功时
  onClockSuccess: () => void;
  // 签到失败时
  onClockFail: () => void;
  // 连续签到成功触发器
  onKeepClockSuccess: () => void;
  // 累计签到成功触发器
  onTotalClockSuccess: () => void;
}

// 助力里需要用到的事件，方法，触发器等
export interface ClockEventType extends ClockActionsType {
  // 查询签到应用详情
  runQueryClockDetail?: () => void;
}
