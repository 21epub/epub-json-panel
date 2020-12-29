import * as React from 'react'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import store from '../components/store/store'
import zhCN from 'antd/lib/locale/zh_CN'
import { LotteryPage } from '..'

interface Props {
  isDataChanged: boolean
  prizeListUrl: string
  prizeUrl: string
  singleLotteryUrl: string
  myPrizeListUrl: string
  addUserInfoUrl: string
  queryUserInfoUrl: string
}

const LotteryPageView = ({
  isDataChanged,
  prizeListUrl,
  prizeUrl,
  singleLotteryUrl,
  myPrizeListUrl,
  addUserInfoUrl,
  queryUserInfoUrl
}: Props) => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <LotteryPage
          isDataChanged={isDataChanged}
          prizeListUrl={prizeListUrl}
          prizeUrl={prizeUrl}
          singleLotteryUrl={singleLotteryUrl}
          myPrizeListUrl={myPrizeListUrl}
          addUserInfoUrl={addUserInfoUrl}
          queryUserInfoUrl={queryUserInfoUrl}
        />
      </ConfigProvider>
    </Provider>
  )
}

export default LotteryPageView
