import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import TurntablePage from './TurntablePage'
import { Provider } from 'react-redux'
import store from './store/store'

interface Props {
  isDataChanged: boolean
  prizeListUrl: string
  prizeUrl: string
  singleLotteryUrl: string
  myPrizeListUrl: string
  addUserInfoUrl: string
  queryUserInfoUrl: string
  winnersUrl: string
}

const TurntablePageView = ({
  isDataChanged,
  prizeListUrl,
  prizeUrl,
  singleLotteryUrl,
  myPrizeListUrl,
  addUserInfoUrl,
  queryUserInfoUrl,
  winnersUrl
}: Props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <TurntablePage
          prizeListUrl={prizeListUrl}
          singleLotteryUrl={singleLotteryUrl}
          prizeUrl={prizeUrl}
          myPrizeListUrl={myPrizeListUrl}
          isDataChanged={isDataChanged}
          addUserInfoUrl={addUserInfoUrl}
          queryUserInfoUrl={queryUserInfoUrl}
          winnersUrl={winnersUrl}
        />
      </Provider>
    </ConfigProvider>
  )
}

export default TurntablePageView
