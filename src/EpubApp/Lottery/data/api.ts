import axios from 'axios';
import qs from 'qs';
import { LotteryUserInfoType } from '../type';

const instance = axios.create();
instance.defaults.headers = {
  'Content-type': 'application/x-www-form-urlencoded'
};

export const getLotteryResult = (prizeUrl: string) => {
  return instance.post(prizeUrl);
};

// export const getLotteryResult = (prizeUrl: string) => {
//   return new Promise<WinnerType>((resolve, reject) => {
//     instance
//       .post(prizeUrl)
//       .then((response) => {
//         resolve(response?.data?.data?.results[0]);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

export const addUserInfo = (addUserInfoUrl: string, data: any) => {
  return new Promise<LotteryUserInfoType>((resolve, reject) => {
    instance
      .post(addUserInfoUrl, qs.stringify(data))
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const queryUserInfo = (queryUserInfo: string) => {
  return new Promise((resolve, reject) => {
    instance
      .get(queryUserInfo)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
