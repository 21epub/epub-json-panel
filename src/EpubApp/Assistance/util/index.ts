import moment from 'moment';
import type { PageNumberType } from '../index';
import store from '../store';

interface argsType {
  key: string;
  value: string;
}

interface TheRequestType {
  [key: string]: string;
}

// 解析URL链接
export const GetUrlRequest = () => {
  const url = decodeURI(location.search);
  const theRequest: TheRequestType = {};
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1);
    const strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  return theRequest;
};

// 获取返回值数据
export const GetRequest = (str: string) => {
  const theRequest: TheRequestType = {};
  const strs = str.split('&');
  for (let i = 0; i < strs.length; i++) {
    theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
  }
  return theRequest;
};

export const parseLinkArgs = (message_link: string, args: argsType) => {
  let link: string;
  const urlValue = GetUrlRequest();
  if (message_link) {
    link = message_link;
  } else {
    link = window.location.href;
  }
  // 判断情况进行不同的处理
  if (urlValue[args.key]) {
    // 原url中有目标key，进行替换操作
    let str: string = '';
    for (const key in urlValue) {
      if (key === args.key) {
        urlValue[key] = args.value;
        str = str + '&' + key + '=' + urlValue[key];
      } else {
        str = str + '&' + key + '=' + urlValue[key];
      }
    }
    return (
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?' +
      str
    );
  } else if (link.indexOf('?') === -1) {
    // 原url中没有？以及后面的参数，添加？及参数值；
    return link + '?' + args.key + '=' + args.value;
  } else {
    // 原url中有“？”，则使用&连接符连接要添加的参数
    return link + '&' + args.key + '=' + args.value;
  }
};

// 倒计时计算剩余时间
export const getEndTime = (endTime?: string) => {
  const startDate = new Date(); // 开始时间，当前时间
  const endDate = moment(endTime); // 结束时间，需传入时间参数
  let t = 0;
  if (endDate.valueOf() - startDate.getTime() > 0) {
    t = endDate.valueOf() - startDate.getTime(); // 时间差的毫秒数
    let d = 0;
    let h = 0;
    let m = 0;
    let s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor((t / 1000 / 60 / 60) % 24);
      m = Math.floor((t / 1000 / 60) % 60);
      s = Math.floor((t / 1000) % 60);
    }
    return [d, h, m, s];
  } else {
    return false;
  }
};

export const SavePrevPageNumber = (
  currPage: PageNumberType,
  prevPage?: PageNumberType
) => {
  if (prevPage !== currPage) {
    store.reducers.SavePrevPageNumber(prevPage);
  }
};
