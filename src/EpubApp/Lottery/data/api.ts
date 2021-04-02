import axios from 'axios'
import qs from 'qs'

const instance = axios.create()
instance.defaults.headers = {
  'Content-type': 'application/x-www-form-urlencoded'
}

export const getLotteryResult = (prizeUrl: string) => {
  return instance.post(prizeUrl)
}

export const addUserInfo = (addUserInfoUrl: string, data: any) => {
  return new Promise((resolve, reject) => {
    instance
      .post(addUserInfoUrl, qs.stringify(data))
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const queryUserInfo = (queryUserInfo: string) => {
  return new Promise((resolve, reject) => {
    instance
      .get(queryUserInfo)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
