import axios from 'axios'

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

export { getLotteryResult }
