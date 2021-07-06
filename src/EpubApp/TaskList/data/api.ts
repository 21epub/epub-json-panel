import axios from 'axios';
import type { TaskListDetailType } from '../type';

const instance = axios.create();
instance.defaults.headers = {
  'Content-type': 'application/x-www-form-urlencoded'
};

const portal_url = '/v3/api/apps/taskList/';

// ** 日历应用详情接口
// ** ---------------------------------------------------------------------------------------------------------
// 查询日历活动详情
export const queryTaskListDetail = (slug: string) => {
  return new Promise<TaskListDetailType>((resolve, reject) => {
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
