// 投票类型
export type PollType = 'picturePoll';

export interface PollImageType {
  label: string;
  name: string;
  picture: string;
  description: string;
}

export interface PollPictureType {
  picturePollPic: PollImageType[];
}

// api参数
export interface PollApiPropsType {
  // 应用slug
  slug: string;
  // 默认图片链接地址头
  web_url: string;
}

// 举办方信息
export interface PollContactInfoType {
  // 举办方名称
  name?: string;
  // 举办方地址
  address?: string;
  // 举办方联系方式
  phone?: string;
}

// 投票详情字段类型
export interface PollDetailType {
  // 投票活动slug
  slug?: string;
  // 作品slug
  book_slug: string;
  // 投票类型
  poll_type: number;
  // 投票活动名称
  title: string;
  // 投票规则，0总计 1每天
  poll_rule?: number;
  // 每人最多投票次数
  poll_num_each_one?: number;
  // 同一选手可投数量
  poll_num_each_player?: number;
  // 报名开始时间
  start_time: string;
  // 报名结束时间
  end_time: string;
  // 投票开始时间
  poll_start_time: string;
  // 投票结束时间
  poll_end_time: string;
  // 投票活动规则
  rules: string;
  // 举办方信息保存格式
  _contact_info?: string;
  // 举办方信息接受格式
  contact_info?: PollContactInfoType;
  // 图片
  picture?: PollImageType[];
  // 保存图片
  _picture?: string;
  // 是否显示背景图
  show_background_image: boolean;
  // 是否使首页信息块背景透明
  is_info_bg_transparent: boolean;
  // 参与量=报名人数+投票人数
  participants?: number;
  // 投票总票数
  total_poll_sum?: number;
  // 活动状态，1：未开始，2：进行中，3：已结束
  status?: number;
  // 该用户剩余可投票次数
  remain_times?: number;
  // 报名user null表示未报名，如果报名过返回sign_slug
  sign_slug?: string | null;
  // 用户信息
  info_fields?: string;
  // 用户信息列表
  info_fields_list?: string[];
  // 配置面板用到的字段
  pollTime0?: string[];
  pollTime1?: string[];
  contact_info_0?: string;
  contact_info_1?: string;
  contact_info_2?: string;
}

// 报名参赛者类型
export interface ParticipantsType {
  // 选手slug
  slug?: string;
  // 参赛作品标题
  sign_title?: string;
  // 用户id
  user_id?: number;
  // 参赛说明
  description?: string;
  // 参赛介绍
  introduction?: string;
  // 参赛选手编号
  player_number?: number;
  // 参赛选手排名
  player_rank: number;
  // 选手被投票数
  player_poll_num?: number;
  // 参赛选手头像
  initiator_avatar?: string;
  // 参赛选手昵称
  initiator_name?: string;
  // 参赛选手用户名
  initiator_username?: string;
  // 选手创建时间
  created?: string;
  // 当前用户对该选手剩余投票次数
  poll_remain_times?: number;
  // 报名图片地址
  cover?: string;
  // 姓名
  name?: string;
  // 电话
  phone?: string;
  // 地址
  address?: string;
  // 用户信息集合
  user_info?: PollContactInfoType;
}

export interface PollRecordType {
  // 投票记录slug
  slug?: string;
  // 参赛选手编号
  player_number: number;
  // 投票者头像地址
  poll_avatar: string;
  // 创建投票记录时间
  created: string;
  // 投票者姓名
  poll_name: string;
  // 投票者id
  user_id?: number;
}

// 触发器事件
export interface PollActionsType {
  // 投票成功时
  onPollSuccess: () => void;
  // 投票失败时
  onPollFail: () => void;
  // 报名成功时
  onSignUpSuccess: () => void;
  // 报名失败时
  onSignUpFail: () => void;
}

// 需要用到的事件，方法，触发器等
export interface PollEventType extends PollActionsType {
  // 查询签到详情
  runQueryPollDetail: () => void;
}
