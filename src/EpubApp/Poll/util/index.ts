import moment from 'moment';
import { message } from 'antd';
import type { PollImageType, ParticipantsType } from '../type';
export const getNow = () => {
  return moment().locale('zh-cn').format('YYYY-MM-DD HH:mm');
};

type TimeString = string | undefined;

type getCountDownTextProps = {
  enrollStartTimeString: TimeString;
  enrollEndTimeString: TimeString;
  pollStartTimeString: TimeString;
  pollEndTimeString: TimeString;
};

// 获取倒计时信息
export const getCountDownObject = (timeStringGroup: getCountDownTextProps) => {
  const {
    enrollStartTimeString,
    enrollEndTimeString,
    pollStartTimeString,
    pollEndTimeString
  } = timeStringGroup;

  const format = 'YYYY-MM-DD hh:mm:ss';

  // 报名起止时间
  const enrollStartTime = moment(enrollStartTimeString, format);
  const enrollEndTime = moment(enrollEndTimeString, format);

  // 投票起止时间
  const pollStartTime = moment(pollStartTimeString, format);
  const pollEndTime = moment(pollEndTimeString, format);

  // 当前时间
  const now = moment(getNow(), format);

  if (
    pollStartTime.isBefore(enrollStartTime) ||
    pollEndTime.isBefore(enrollEndTime)
  ) {
    // 投票结束时间早于报名结束时间
    return {
      status: '错误',
      text: '投票时间不能早于报名时间！',
      compareTime: now
    };
  } else if (now.isBefore(enrollStartTime)) {
    // 报名开始前
    return {
      status: '未开始',
      text: '距离报名开始还剩',
      compareTime: enrollStartTime
    };
  } else if (
    now.isBetween(enrollStartTime, enrollEndTime) &&
    now.isBefore(pollStartTime)
  ) {
    // 报名已开始未结束，投票未开始
    return {
      status: '报名中',
      text: '距离报名结束还剩',
      compareTime: enrollEndTime
    };
  } else if (
    now.isBetween(enrollStartTime, pollEndTime) &&
    now.isBefore(enrollEndTime) &&
    now.isAfter(pollStartTime)
  ) {
    // 报名已开始未结束，投票已开始
    return {
      status: '报名与投票中',
      text: '距离投票结束还剩',
      compareTime: pollEndTime
    };
  } else if (now.isBetween(enrollEndTime, pollStartTime)) {
    // 报名已结束，投票未开始
    return {
      status: '报名结束',
      text: '距离投票开始还剩',
      compareTime: pollStartTime
    };
  } else if (
    now.isAfter(enrollEndTime) &&
    now.isBetween(pollStartTime, pollEndTime)
  ) {
    // 报名已结束，投票已开始未结束
    return {
      status: '投票中',
      text: '距离投票结束还剩',
      compareTime: pollEndTime
    };
  } else if (now.isAfter(enrollEndTime) && now.isAfter(pollEndTime)) {
    // 报名已结束，投票已结束
    return {
      status: '已结束',
      text: '活动已结束，感谢参与！',
      compareTime: pollEndTime
    };
  }

  return {
    status: '错误',
    text: '活动时间设置错误，请重新设置',
    compareTime: pollEndTime
  };
};

// 返回对应的图片
export const getPicture = (
  pictureList: PollImageType[],
  pictureName: string
) => {
  return pictureList?.find((item) => item.name === pictureName)?.picture;
};

// 验证用户信息表单数据
export const validateValues = (values?: ParticipantsType) => {
  const errorMsg: string[] = [];

  // 图片验证
  if (!values?.cover) {
    errorMsg.push('请上传图片');
  }

  // 标题验证
  if (!values?.sign_title) {
    errorMsg.push('请填写作品标题');
  }

  // 姓名验证
  if (!values?.name) {
    errorMsg.push('请填写姓名');
  }

  // 手机号验证
  if (
    values?.phone &&
    !/^1((3[0-9])|(4[1579])|(5[0-9])|(6[6])|(7[0-9])|(8[0-9])|(9[0-9]))\d{8}$/.test(
      values?.phone
    )
  ) {
    errorMsg.push('请输入正确的手机号');
  }

  return errorMsg;
};

// 错误提示
export const ErrorMsgPrompt = (errorMsgList: string[]) => {
  errorMsgList.forEach((errorMsg) => {
    message.error(errorMsg);
  });
};

// 处理字段名称
export function translateTitle(name: string) {
  switch (name) {
    case 'name':
      return '请输入姓名';
    case 'email':
      return '请输入邮箱';
    case 'phone':
      return '请输入电话';
    case 'address':
      return '请输入地址';
    case 'introduction':
      return '请输入简介';
    case 'description':
      return '请输入补充描述';
    default:
      return name;
  }
}

// 对参赛选手列表进行降序排序
export const sortSignList = (signList?: ParticipantsType[]) => {
  return signList?.sort((a, b) => {
    if (a.player_poll_num && b.player_poll_num) {
      return a.player_rank - b.player_rank;
    }
    return 0;
  });
};
