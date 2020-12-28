import axios from 'axios'
import qs from 'qs'

const instance = axios.create()
instance.defaults.headers = {
  'Content-type': 'application/x-www-form-urlencoded'
}

const getLotteryResult = (prizeUrl: string) => {
  return new Promise((resolve, reject) => {
    instance
      .post(prizeUrl)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const addUserInfo = (addUserInfoUrl: string, data: any) => {
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

const queryUserInfo = (queryUserInfo: string) => {
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

export { getLotteryResult, addUserInfo, queryUserInfo }
