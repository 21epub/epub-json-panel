import * as React from 'react'
import { Provider } from 'react-redux'
import store from '../components/store/store'
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
      <LotteryPage
        isDataChanged={isDataChanged}
        prizeListUrl={prizeListUrl}
        prizeUrl={prizeUrl}
        singleLotteryUrl={singleLotteryUrl}
        myPrizeListUrl={myPrizeListUrl}
        addUserInfoUrl={addUserInfoUrl}
        queryUserInfoUrl={queryUserInfoUrl}
      />
    </Provider>
  )
}

export default LotteryPageView
