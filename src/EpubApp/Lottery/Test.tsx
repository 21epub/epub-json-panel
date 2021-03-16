import React from 'react'
import {
  prizeListUrl,
  singleLotteryUrl,
  prizeUrl,
  myPrizeListUrl,
  addUserInfoUrl,
  queryUserInfoUrl,
  winnersUrl
} from './data/apiUrl'
import { LotteryPageRender } from './page'

const Test = () => {
  return (
    <div>
      <LotteryPageRender
        lotteryType='Turntable'
        isDataChanged
        prizeListUrl={prizeListUrl}
        singleLotteryUrl={singleLotteryUrl}
        prizeUrl={prizeUrl}
        myPrizeListUrl={myPrizeListUrl}
        addUserInfoUrl={addUserInfoUrl}
        queryUserInfoUrl={queryUserInfoUrl}
        winnersUrl={winnersUrl}
        prefix='test'
      />
    </div>
  )
}

export default Test
