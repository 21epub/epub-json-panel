import moment from 'moment';
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

export const isInActivityTime = (start_time: string, end_time: string) => {
  // 判断是否在活动时间内
  const beforeTime = moment(start_time, 'YYYY-MM-DD hh:mm:ss');
  const afterTime = moment(end_time, 'YYYY-MM-DD hh:mm:ss');
  const now = moment(
    moment().locale('zh-cn').format('YYYY-MM-DD HH:mm'),
    'YYYY-MM-DD hh:mm:ss'
  );
  if (now.isBefore(beforeTime)) {
    return {
      value: false,
      msg: '活动未开始，请耐心等待！'
    };
  } else if (now.isAfter(afterTime)) {
    return {
      value: false,
      msg: '活动已结束，感谢参与！'
    };
  }
  return {
    value: true
  };
};
