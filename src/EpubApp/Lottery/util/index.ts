import moment from 'moment';
import { message } from 'antd';
import { LotteryType, LotteryPictureType, LotteryImageType } from '../type';

export function getLineTextList(
  context: CanvasRenderingContext2D,
  text: any,
  maxLineWidth: number
) {
  let maxLineWidthLocal = maxLineWidth;
  const wordList = text.split('');
  let tempLine = '';
  const lineList = [];
  for (let i = 0; i < wordList.length; i++) {
    if (context.measureText(tempLine).width >= maxLineWidthLocal) {
      lineList.push(tempLine);
      maxLineWidthLocal -= context.measureText(text[0]).width;
      tempLine = '';
    }
    tempLine += wordList[i];
  }
  lineList.push(tempLine);
  return lineList;
}

export function drawPrizeBlock(
  ctx: CanvasRenderingContext2D,
  awards: any,
  startR: number
) {
  const context = ctx;
  let startRadian = startR;
  const RadianGap = (Math.PI * 2) / awards.length;
  let endRadian = startRadian + RadianGap;
  for (let i = 0; i < awards.length; i++) {
    context.save();
    context.beginPath();
    context.fillStyle = awards[i].color;
    // context.moveTo(217.5, 217.5) // 起点
    // context.arc(217.5, 217.5, 217.5, startRadian, endRadian, false)
    context.moveTo(120, 120); // 起点
    context.arc(120, 120, 120, startRadian, endRadian, false);
    context.fill();
    context.restore();

    context.save();
    context.fillStyle = '#1e1e1e';
    context.font = '14px Arial';

    context.translate(
      // 217.5 + Math.cos(startRadian + RadianGap / 2) * 217.5,
      // 217.5 + Math.sin(startRadian + RadianGap / 2) * 217.5
      120 + Math.cos(startRadian + RadianGap / 2) * 120,
      120 + Math.sin(startRadian + RadianGap / 2) * 120
    );
    context.rotate(startRadian + RadianGap / 2 + Math.PI / 2);
    getLineTextList(context, awards[i].ranking, 70).forEach((line, index) => {
      let indexLocal = index;
      context.fillText(
        line,
        -context.measureText(line).width / 2,
        ++indexLocal * 25
      );
    });
    context.restore();

    startRadian += RadianGap;
    endRadian += RadianGap;
  }
}

export const prizeToAngle = (prizeIndex: number, prizeLength: number) => {
  // prizeIndex 从0开始 算出奖品min~max的范围
  const min =
    (3 * Math.PI) / 2 - ((2 * Math.PI) / prizeLength) * (prizeIndex + 1);
  const max = (3 * Math.PI) / 2 - ((2 * Math.PI) / prizeLength) * prizeIndex;

  let target = Math.random() * (max - min) + min; // [min,max)

  const borderInterval = 0.2;
  if (Math.abs(max - target) < borderInterval) {
    target = target - 0.2;
  } else if (Math.abs(target - min) < borderInterval) {
    target = target + 0.2;
  }

  // if (target === min) target = target + 0.0001; // 如果为边界值则加上0.0001
  return target;
};

export const getRandomInt = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

export const getPrizeIndex = (prize: any, prizeList: any) => {
  const prizeIndex = prizeList.findIndex(
    (e: { id: string }) => e.id === prize.objective.id
  );
  return prizeIndex;
};

export const getIndexList = (prizeIndex: number, turnList: any) => {
  const destination = turnList.findIndex((ele: number) => ele === prizeIndex);

  // 获取随机圈数
  const turns = getRandomInt(2, 4);

  let turnsList: any = [];
  for (let i = 0; i < turns; i++) {
    turnsList = turnsList.concat(turnList);
  }
  const lastTurn = turnList.slice(0, destination + 1);

  const indexList = turnsList.concat(lastTurn);
  return indexList;
};

export const getNow = () => {
  return moment().locale('zh-cn').format('YYYY-MM-DD HH:mm');
};

export const getToday = () => {
  return moment().locale('zh-cn').format('YYYY-MM-DD');
};

export const getDate = (days: number) => {
  return moment().add(days, 'days').locale('zh-cn').format('YYYY-MM-DD');
};

// 验证用户信息表单数据
export const validateValues = (values: AnyObject) => {
  const errorMsg: string[] = [];
  // 手机号验证
  if (
    !/^1((3[0-9])|(4[1579])|(5[0-9])|(6[6])|(7[0-9])|(8[0-9])|(9[0-9]))\d{8}$/.test(
      values.phone
    )
  ) {
    errorMsg.push('请输入正确的手机号');
  }
  // 邮箱验证
  if (!/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/.test(values.email)) {
    errorMsg.push('请输入正确的邮箱');
  }
  return errorMsg;
};

// 错误提示
export const ErrorMsgPrompt = (errorMsgList: string[]) => {
  errorMsgList.forEach((errorMsg) => {
    message.error(errorMsg);
  });
};

// 返回对应的图片数组
export const getPictureList = (
  lotteryPicture: LotteryPictureType,
  lotteryType: LotteryType
) => {
  // 把抽奖类型。首字母转为小写 再拼上Picture。组成图片的key值
  const pictureType: string =
    lotteryType?.charAt(0).toLowerCase() + lotteryType?.slice(1) + 'Picture';
  return lotteryPicture?.[pictureType];
};

// 返回对应的图片
export const getPicture = (
  pictureList: LotteryImageType[],
  pictureName: string
) => {
  return pictureList?.find((item) => item.name === pictureName)?.picture;
};

// 格式化对应的图片Url地址,没有前缀的加上
export const formatPictureUrl = (pictureUrl?: string, web_url?: string) => {
  const webUrl = pictureUrl?.includes('//') ? '' : web_url ?? '';
  return pictureUrl && webUrl + pictureUrl;
};

// 用于判断当前对象里是否有某个属性
export const isValidKey = (
  key: string | number | symbol,
  object: object
): key is keyof typeof object => {
  return key in object;
};
