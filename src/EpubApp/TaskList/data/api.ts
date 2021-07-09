import axios from 'axios';
import type {
  TaskListDetailType,
  TaskDetailType,
  TaskRecordType
} from '../type';

const instance = axios.create();
instance.defaults.headers = {
  'Content-type': 'application/x-www-form-urlencoded'
};

const portal_url = '/v3/api/apps/taskList/';

// ** 应用详情接口
// ** ---------------------------------------------------------------------------------------------------------
// 查询活动详情
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

// 增加浏览记录
export const addTaskRecord = (task_list_slug: string, task_slug: string) => {
  return new Promise<TaskRecordType>((resolve, reject) => {
    instance
      .post(portal_url + `${task_list_slug}/record/${task_slug}/`)
      .then((response) => {
        resolve(response?.data?.data?.results[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询浏览记录
export const queryTaskRecord = (task_list_slug: string) => {
  return new Promise<TaskRecordType[]>((resolve, reject) => {
    instance
      .get(portal_url + task_list_slug + '/record/')
      .then((response) => {
        resolve(response?.data?.data?.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 查询任务
export const queryTask = (task_list_slug: string) => {
  return new Promise<TaskDetailType[]>((resolve, reject) => {
    instance
      .get(portal_url + `${task_list_slug}/task/`)
      .then((response) => {
        resolve(response?.data?.data?.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
