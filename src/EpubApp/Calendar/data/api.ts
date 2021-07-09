import axios from 'axios';
import type { CalendarDetailType } from '../type';

const instance = axios.create();
instance.defaults.headers = {
  'Content-type': 'application/x-www-form-urlencoded'
};

const portal_url = '/v3/api/apps/calendar/';

// ** 日历应用详情接口
// ** ---------------------------------------------------------------------------------------------------------
// 查询日历活动详情
export const queryCalendarDetail = (slug: string) => {
  return new Promise<CalendarDetailType>((resolve, reject) => {
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