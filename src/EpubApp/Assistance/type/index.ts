// 活动状态
export const statusMap = {
  1: '进行中',
  2: '已完成',
  3: '已过期'
};

// 页面类型
export type PageType =
  | 'HomePage'
  | 'ObjectivePage'
  | 'MyAssistancePage'
  | 'HelpAssistancePage'
  | '';

// 助力应用类型
export type AssistanceType = 'Assistance' | 'GroupPurchase';

// 图片格式
export interface AssistanceImageType {
  // 图片标题
  label: string;
  // 图片名称，唯一标识
  name: string;
  // 图片url
  picture: string;
  // 图片描述
  description?: string;
}

// 新增助力初始值类型
export interface AssistanceInitialValueType {
  // 助力标题
  title: string;
  // 助力类型数字标记
  type: number;
  // 当前作品slug
  book_slug: string;
  // 助力活动开始时间
  start_time: string;
  // 助力活动结束时间
  end_time: string;
  // 助力首页大图Url
  _picture: string;
  // 助力首页富文本规则html字符串
  rules: string;
  // 字符串数组-保存需要收集的用户信息:['name', 'address', 'phone']
  info_fields: string;
  // 助力活动有效期，默认七天
  effective_time?: number | null;
  // 发起者是否允许给自己助力
  can_assist_yourself: boolean;
  // 每人可助力数
  can_assists_num_each_one?: number | null;
  // 每人每个助力活动可助力数
  can_assists_num_each_one_for_obj?: number | null;
  // 每人可发起有效助力总数
  total_assists_num_each_one?: number | null;
  // 每人每个目标可发起助力数
  total_assists_num_each_one_for_obj?: number | null;
  // 单次助力增加数-初始值
  initial_value: string | null;
  // 助力活动举办方基础信息
  _contact_info: string;
}

export interface AssistanceContactInfoType {
  name: string;
  address: string;
  phone: string;
  [field: string]: string;
}

// 助力详情接口
export interface AssistanceDetailType {
  id?: string;
  // 助力标题
  title: string;
  // 助力类型
  assist_type: string;
  // 助力类型数字标记
  type: number;
  // 当前创建的助力应用slug
  slug: string;
  // 当前作品slug
  book_slug: string;
  // 助力活动开始时间
  start_time: string;
  // 助力活动结束时间
  end_time: string;
  // 传给接口的助力时间
  assistanceTime?: string[];
  // 助力首页大图Url
  picture: AssistanceImageType[];
  // 传给后台的图片值
  _picture?: string;
  // 助力首页富文本规则html字符串
  rules: string;
  // 是否需要获取用户信息
  need_user_info: boolean;
  // 用户id
  user_id: number;
  // 字符串数组-保存需要收集的用户信息:['name', 'address', 'phone']
  user_info_fields: string[];
  // 应用创建时间
  created?: string;
  // 助力活动有效期，默认七天
  effective_time?: number;
  // 发起者是否允许给自己助力
  can_assist_yourself: boolean;
  // 每人可助力数
  can_assists_num_each_one?: number;
  // 每人每个助力活动可助力数
  can_assists_num_each_one_for_obj?: number;
  // 每人可发起有效助力总数
  total_assists_num_each_one?: number;
  // 每人每个目标可发起助力数
  total_assists_num_each_one_for_obj?: number;
  // 单次助力增加数-初始值
  initial_value: string;
  // 助力规则
  rules_dict: {
    value: number;
    value_rule: number;
  };
  // 助力活动举办方基础信息
  contact_info: AssistanceContactInfoType;
  // 传给后台的信息
  _contact_info?: string;
  // 配置面板的举办方名称
  contact_info_0?: string;
  // 配置面板的举办方地址
  contact_info_1?: string;
  // 配置面板的举办方联系方式
  contact_info_2?: string;
}

// 助力目标接口
export interface ObjectiveDetailType {
  // 助力编号ID
  assistance: number;
  // 比较规则
  compare: string;
  // 目标创建时间
  created?: string;
  // 目标商品的描述信息
  description: string;
  // 已参与人数
  has_participated: number;
  // 目标商品初始值
  initial_value: string;
  // 目标商品名称
  title: string;
  // 目标商品图片
  picture: string;
  // 目标剩余数量
  remain: number;
  // 目标商品slug，id
  slug: string;
  // 已成功助力目标数
  success_num: number;
  // 助力成功所需的分数
  target_score: number;
  // 目标总数量
  total_num: number;
  // 用户信息id
  user_info_id?: string;
  // key，用户表格key值
  key?: string;
}

export interface AssistanceUserInfoType {
  // id
  id: string;
  // 用户id
  user_id: number;
  // 发起的目标oslug
  objective_slug: string;
  // 创建时间
  created: string;
  // 地址
  address: string;
  // 邮箱
  email: string;
  // 姓名
  name: string;
  // 电话
  phone: string;
  [key: string]: string | number;
}

export interface ActivityDetailType {
  // 当前活动的acslug
  slug: string;
  // 活动状态---1：进行中，2：已完成，3：已过期
  status: 1 | 2 | 3;
  // 创建时间
  created: string;
  // 识别允许用户进行的操作
  identify_and_can_operate: {
    // 是否允许发起助力或帮他人助力
    can_init_or_support: boolean;
    // 是否是发起人
    is_initiator: boolean;
  };
  // 发起人头像
  initiator_avatar: string;
  // 发起人id
  initiator_id: number;
  // 发起人微信昵称
  initiator_name: string;
  // 发起人用户名，邮箱
  initiator_username: string;
  // 目标商品编号
  objective: number;
  // 命令
  order: string | null;
  // 当前助力获得的分数
  real_score: string;
  // 已助力人数
  supporter_num: number;
}

export interface SupporterDetailType {
  // 活动id
  id: string;
  // 当前活动的编号
  activity: number;
  // 创建时间
  created: string;
  // 助力的sslug
  slug: string;
  // 发起人头像
  supporter_avatar: string;
  // 发起人id
  supporter_id: number;
  // 发起人微信昵称
  supporter_name: string;
  // 发起人用户名，邮箱
  supporter_username: string;
  // 助力增加分数
  value: string;
}

export interface AssistanceApiPropsType {
  // 助力slug
  aslug: string;
  // urlKey,用于识别抽奖链接
  urlKey: string;
  // 默认图片链接地址头
  web_url: string;
  // 分享链接link
  message_link?: string;
}

// 图片格式
export interface AssistancePictureType {
  Assistance: AssistanceImageType[];
  GroupPurchase: AssistanceImageType[];
  [key: string]: AssistanceImageType[];
}

export interface AssistanceActionsType {
  onAssistanceSuccess: () => void;
  onAssistanceFail: () => void;
}

// 助力里需要用到的事件，方法，触发器等
export interface AssistanceEventType extends AssistanceActionsType {
  // 设置分享链接
  setShareLink: (link: string) => void;
  // 微信分享
  share: () => void;
}

export interface AssistanceUrlListType {
  // 默认图片链接地址头
  web_url: string;
  // 助力详情
  assistanceDetailUrl: string;
}
