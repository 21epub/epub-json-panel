import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import LotteryPage from './LotteryPage'
import { Provider } from 'react-redux'
import store from '../../store/store'

interface Props {
  isDataChanged: boolean
  prizeListUrl: string
  prizeUrl: string
  singleLotteryUrl: string
  myPrizeListUrl: string
  addUserInfoUrl: string
  queryUserInfoUrl: string
  winnersUrl: string
  prefix: string
}

const LotteryPageView = ({
  isDataChanged,
  prizeListUrl,
  prizeUrl,
  singleLotteryUrl,
  myPrizeListUrl,
  addUserInfoUrl,
  queryUserInfoUrl,
  winnersUrl,
  prefix
}: Props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <LotteryPage
          prizeListUrl={prizeListUrl}
          singleLotteryUrl={singleLotteryUrl}
          prizeUrl={prizeUrl}
          myPrizeListUrl={myPrizeListUrl}
          isDataChanged={isDataChanged}
          addUserInfoUrl={addUserInfoUrl}
          queryUserInfoUrl={queryUserInfoUrl}
          winnersUrl={winnersUrl}
          prefix={prefix}
        />
      </Provider>
    </ConfigProvider>
  )
}

export default LotteryPageView
