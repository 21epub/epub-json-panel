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
        lotteryType='turntable'
        prizeListUrl={prizeListUrl}
        singleLotteryUrl={singleLotteryUrl}
        prizeUrl={prizeUrl}
        myPrizeListUrl={myPrizeListUrl}
        isDataChanged
        addUserInfoUrl={addUserInfoUrl}
        queryUserInfoUrl={queryUserInfoUrl}
        winnersUrl={winnersUrl}
        prefix='test'
      />
      {/* <LotteryPageTestEditor 
              singleLotteryUrl={singleLotteryUrl}
              prizeListUrl={prizeListUrl}
              isDataChanged
            /> */}
    </div>
  )
}

export default Test
