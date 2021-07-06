import type {
  TaskListImageType,
  TaskListPictureType,
  TaskListType
} from '../type';

// 返回对应的图片数组
export const getPictureList = (
  calendarPicture: TaskListPictureType,
  calendarType: TaskListType
) => {
  // 把抽奖类型。首字母转为小写 再拼上Pic。组成图片的key值
  const pictureType: string =
    calendarType?.charAt(0)?.toLowerCase() + calendarType?.slice(1) + 'Pic';
  return calendarPicture?.[pictureType];
};

// 返回对应的图片
export const getPicture = (
  pictureList: TaskListImageType[],
  pictureName: string
) => {
  return pictureList?.find((item) => item.name === pictureName)?.picture;
};
