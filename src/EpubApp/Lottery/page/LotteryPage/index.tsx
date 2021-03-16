import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import LotteryPage from './LotteryPage'
import store from '../../store/store'
import { LotteryType } from '../../type'

export interface LotteryPageRenderProps {
  lotteryType: LotteryType
  isDataChanged: boolean
  prizeListUrl: string
  singleLotteryUrl: string
  prefix: string
  prizeUrl?: string
  myPrizeListUrl?: string
  addUserInfoUrl?: string
  queryUserInfoUrl?: string
  winnersUrl?: string
}

// 抽奖页面渲染
export const LotteryPageRender: FC<LotteryPageRenderProps> = (props) => {
  const {
    lotteryType,
    isDataChanged,
    prizeListUrl,
    prizeUrl,
    singleLotteryUrl,
    myPrizeListUrl,
    addUserInfoUrl,
    queryUserInfoUrl,
    winnersUrl,
    prefix
  } = props

  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <LotteryPage
          lotteryType={lotteryType}
          isDataChanged={isDataChanged}
          prefix={prefix}
          prizeUrl={prizeUrl}
          prizeListUrl={prizeListUrl}
          singleLotteryUrl={singleLotteryUrl}
          myPrizeListUrl={myPrizeListUrl}
          addUserInfoUrl={addUserInfoUrl}
          queryUserInfoUrl={queryUserInfoUrl}
          winnersUrl={winnersUrl}
        />
      </Provider>
    </ConfigProvider>
  )
}
