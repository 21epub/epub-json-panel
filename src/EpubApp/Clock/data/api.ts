import axios from 'axios';
import qs from 'qs';
import {
  ClockUserInfoType,
  ClockDetailType,
  ClockRecordType,
  ClockRankingType
} from '../type';

const instance = axios.create();
instance.defaults.headers = {
  'Content-type': 'application/x-www-form-urlencoded'
};

export const portal_url = '/v3/api/apps/clock/';

// ** 签到详情接口
// ** ---------------------------------------------------------------------------------------------------------
// 查询抽奖活动详情-------------用于活动图片、活动规则、联系信息等渲染
export const queryClockDetail = (slug: string) => {
  return new Promise<ClockDetailType>((resolve, reject) => {
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

// ** 签到记录接口
// ** ---------------------------------------------------------------------------------------------------------
// 签到，增加记录
export const addClockRecord = (slug: string) => {
  return new Promise<ClockRecordType>((resolve, reject) => {
    instance
      .post(portal_url + slug + '/record/')
      .then((response) => {
        resolve(response?.data?.data?.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询签到记录详情
export const queryClockRecordDetail = (
  slug: string,
  start_time?: string,
  end_time?: string
) => {
  return new Promise<ClockRecordType[]>((resolve, reject) => {
    instance
      .get(portal_url + slug + '/record/', {
        params: {
          start_time,
          end_time
        }
      })
      .then((response) => {
        resolve(response?.data?.data?.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// ** 用户信息接口
// ** ---------------------------------------------------------------------------------------------------------
// 添加用户信息
export const addUserInfo = (slug: string, data: any) => {
  return new Promise<ClockUserInfoType>((resolve, reject) => {
    instance
      .post(portal_url + slug + '/userinfo/', qs.stringify(data))
      .then((response) => {
        resolve(response.data.data.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询用户信息
export const queryUserInfo = (slug: string) => {
  return new Promise<ClockUserInfoType>((resolve, reject) => {
    instance
      .get(portal_url + slug + '/userinfo/')
      .then((response) => {
        resolve(response?.data?.data?.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 修改用户信息
export const updateUserInfo = (slug: string, data: any) => {
  return new Promise<ClockUserInfoType>((resolve, reject) => {
    instance
      .patch(portal_url + slug + '/userinfo/', qs.stringify(data))
      .then((response) => {
        resolve(response?.data?.data?.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// ** 打卡排行接口
// ** ---------------------------------------------------------------------------------------------------------
// 查询用户信息
export const queryClockRanking = (slug: string) => {
  return new Promise<ClockRankingType[]>((resolve, reject) => {
    instance
      .get(portal_url + slug + '/ranking/')
      .then((response) => {
        resolve(response?.data?.data?.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
