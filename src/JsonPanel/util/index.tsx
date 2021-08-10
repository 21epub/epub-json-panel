import { ImageType } from '../type';

// 根据图片内容，返回图片需要的前缀
export const getWebUrl = (picture: string) => {
  return picture.includes('//') ? '' : window.web_url;
};

// 返回对应的图片
export const getPicture = (pictureList: ImageType[], pictureName: string) => {
  return pictureList?.find((item) => item.name === pictureName)?.picture;
};
