import React from 'react'
import LotteryPageTest from './LotteryPageTest'
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

const LotteryPageTestView = ({
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
    <Provider store={store}>
      <LotteryPageTest
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
  )
}

export default LotteryPageTestView
