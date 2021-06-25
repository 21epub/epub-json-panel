import type {
  CalendarImageType,
  CalendarPictureType,
  CalendarType
} from '../type';

// 返回对应的图片数组
export const getPictureList = (
  calendarPicture: CalendarPictureType,
  calendarType: CalendarType
) => {
  // 把抽奖类型。首字母转为小写 再拼上Pic。组成图片的key值
  const pictureType: string =
    calendarType?.charAt(0).toLowerCase() + calendarType?.slice(1) + 'Pic';
  return calendarPicture?.[pictureType];
};

// 返回对应的图片
export const getPicture = (
  pictureList: CalendarImageType[],
  pictureName: string
) => {
  return pictureList?.find((item) => item.name === pictureName)?.picture;
};

export const getDaysSuffix = (day?: number) => {
  // 获取日期最后一个数字
  const lastNumber = String(day)?.charAt(length - 1);
  switch (lastNumber) {
    case '1':
      return 'st';
    case '2':
      return 'nd';
    case '3':
      return 'tr';
    default:
      return 'th';
  }
};
