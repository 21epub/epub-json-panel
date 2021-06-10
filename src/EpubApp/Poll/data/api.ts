import axios from 'axios';
import type { PollDetailType, PollRecordType, ParticipantsType } from '../type';

const instance = axios.create();
instance.defaults.headers = {
  'Content-type': 'application/x-www-form-urlencoded'
};

export const portal_url = '/v3/api/poll/';

// ** 投票应用详情接口
// ** ---------------------------------------------------------------------------------------------------------
// 查询投票活动详情
export const queryPollDetail = (slug: string) => {
  return new Promise<PollDetailType>((resolve, reject) => {
    instance
      .get(portal_url + slug + '/')
      .then((response) => {
        resolve(response?.data?.data?.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// ** 参赛用户接口
// ** ---------------------------------------------------------------------------------------------------------
// 创建参赛用户
export const createSign = (slug: string, data: ParticipantsType) => {
  return new Promise<ParticipantsType>((resolve, reject) => {
    instance
      .post(portal_url + slug + '/sign/', data, {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then((response) => {
        resolve(response?.data?.data?.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface OptionsType {
  page?: number;
  size?: number;
  fuzzy_query?: string;
}

// 查询参赛用户列表
export const querySignList = (slug: string, options: OptionsType) => {
  return new Promise<ParticipantsType[]>((resolve, reject) => {
    instance
      .get(portal_url + slug + '/sign/', {
        params: options
      })
      .then((response) => {
        resolve(response?.data?.data?.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询单个参赛用户详情
export const querySignDetail = (slug: string, sign_slug: string) => {
  return new Promise<ParticipantsType>((resolve, reject) => {
    instance
      .get(portal_url + slug + '/sign/' + sign_slug + '/')
      .then((response) => {
        resolve(response?.data?.data?.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// ** 投票接口
// ** ---------------------------------------------------------------------------------------------------------
// 创建投票记录
export const createPollRecord = (slug: string, sign_slug: string) => {
  return new Promise<PollDetailType>((resolve, reject) => {
    instance
      .post(portal_url + slug + '/sign/' + sign_slug + '/record/')
      .then((response) => {
        resolve(response?.data?.data?.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// ** 查询记录接口
// ** ---------------------------------------------------------------------------------------------------------
// 查询当前用户所有投票记录
export const queryPollRecordList = (slug: string) => {
  return new Promise<PollRecordType[]>((resolve, reject) => {
    instance
      .get(portal_url + slug + '/record/')
      .then((response) => {
        resolve(response?.data?.data?.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询所有用户所有投票记录
export const queryPollRecordAllList = (slug: string) => {
  return new Promise<PollRecordType[]>((resolve, reject) => {
    instance
      .get(portal_url + slug + '/record/all/')
      .then((response) => {
        resolve(response?.data?.data?.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// ** 查询记录接口
// ** ---------------------------------------------------------------------------------------------------------
// 上传图片,返回图片url链接
export const uploadPollPicture = (book_slug: string, file: any) => {
  return new Promise<string>((resolve, reject) => {
    instance
      .post(`/v2/manage/book/${book_slug}/uploadimage`, file, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((response) => {
        resolve(response.data.data.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
