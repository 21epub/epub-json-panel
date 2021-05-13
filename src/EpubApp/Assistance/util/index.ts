import type { PageType, AssistanceImageType } from '../type';
import store from '../store';

export interface argsType {
  key: string;
  value: string;
}

export interface TheRequestType {
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

// 根据情况，生成不同的分享链接
export const parseLinkArgs = (args: argsType, message_link?: string) => {
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

export const setPrevPageType = (currPage: PageType, prevPage?: PageType) => {
  if (prevPage !== currPage && prevPage) {
    store.reducers.setPrevPageType(prevPage);
  }
};

// 返回对应的图片
export const getPicture = (
  pictureList: AssistanceImageType[],
  pictureName: string
) => {
  return pictureList?.find((item) => item.name === pictureName)?.picture;
};
