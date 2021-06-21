// 投票类型
export type CalendarType =
  | 'YellowCalendar'
  | 'NewYearCalendar'
  | 'NoteCalendar'
  | 'RefreshingCalendar'
  | 'DateCalendar';

export interface CalendarImageType {
  label: string;
  name: string;
  picture: string;
  description: string;
}

// 不同主题图片
export interface CalendarPictureType {
  yellowCalendarPic: CalendarImageType[];
  newYearCalendarPic: CalendarImageType[];
  noteCalendarPic: CalendarImageType[];
  refreshingCalendarPic: CalendarImageType[];
  [key: string]: CalendarImageType[];
}

// api参数
export interface CalendarApiPropsType {
  // 应用slug
  slug: string;
  // 默认图片链接地址头
  web_url: string;
}

// 投票详情字段类型
export interface CalendarDetailType {
  // 投票活动slug
  slug?: string;
  // 作品slug
  book_slug?: string;
  // 日历活动类型
  calendar_type?: number;
  // 投票活动名称
  title?: string;
  // 图片
  picture?: CalendarImageType[];
  // 保存图片
  _picture?: string;
  // 显示背景图
  show_background_image?: boolean;
  // 显示默认文本
  show_default_text?: boolean;
  // 阳历-年
  year?: number;
  // 阳历-月
  month?: number;
  // 阳历-日
  day?: number;
  // 阳历-小时
  hours?: number;
  // 阳历-分钟
  minute?: number;
  // 阳历-秒
  second?: number;
  // 阳历-星期
  week?: string;
  // 农历-年
  lunar_year?: string;
  // 农历-月
  lunar_month?: string;
  // 农历-日
  lunar_day?: string;
  // 生肖
  zodiac?: string;
}
