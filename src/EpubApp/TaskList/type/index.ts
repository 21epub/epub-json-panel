// 任务列表类型
export type TaskListType = 'ListTheme';

export interface TaskListImageType {
  label: string;
  name: string;
  picture: string;
  description: string;
}

// 不同主题图片
export interface TaskListPictureType {
  ListThemePic?: TaskListImageType[];
  [key: string]: TaskListImageType[] | undefined;
}

// api参数
export interface TaskListApiPropsType {
  // 应用slug
  slug: string;
  // 默认图片链接地址头
  web_url: string;
}

// 任务字体颜色配置
export interface FontColorType {
  title?: string;
  description?: string;
  tag?: string;
}

// 投票详情字段类型
export interface TaskListDetailType {
  // 活动slug
  slug?: string;
  // 作品slug
  book_slug?: string;
  // 任务列表类型
  task_list_type?: string;
  // 活动名称
  title?: string;
  // 图片
  picture?: TaskListImageType[];
  // 保存图片
  _picture?: string;
  // 开始时间
  start_time?: string;
  // 结束时间
  end_time?: string;
  // 显示背景图
  show_task_image?: boolean;
  // 显示默认文本
  show_task_description?: boolean;
  // 显示标签
  show_task_tag?: boolean;
  // 背景颜色
  background_color?: string;
  // 字体颜色
  font_color?: FontColorType | string;
  // 配置面板用到的字段
  taskListTime?: string[];
  font_color_title?: string;
  font_color_description?: string;
  font_color_tag?: string;
}

// 任务详情类型
export interface TaskDetailType {
  // 活动slug
  slug?: string;
  // 任务名称
  task_title?: string;
  // 任务描述
  task_description?: string;
  // 任务标签
  task_tag?: string;
  // 任务类型
  task_type?: string;
  // 任务图片
  task_img?: TaskListImageType[] | string;
  // 初始按钮图片
  initial_button_img?: TaskListImageType[] | string;
  // 激活按钮图片
  active_button_img?: TaskListImageType[] | string;
  // 初始按钮链接
  initial_button_link?: string;
  // 激活按钮链接
  active_button_link?: string;
  // 任务绑定的变量eid
  bind?: string;
  // 配置面板表格记录key用到的属性
  key?: number;
}

// 任务浏览记录详情
export interface TaskRecordType {
  // 浏览记录slug
  slug: string;
  // 浏览记录创建时间
  created: string;
  // 任务标题
  task_title: string;
  // 用户头像
  avatar: string;
  // 用户昵称
  username: string;
}

export interface TaskListActionsType {}

// 应用里需要用到的事件，方法，触发器等
export interface TaskListEventType extends TaskListActionsType {
  // 通过eid获取epub编辑器变量的值
  getVariableValue: (eid: string) => number | string;
}
