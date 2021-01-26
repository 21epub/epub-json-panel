import React from 'react'
import {
  prizeListUrl,
  singleLotteryUrl,
  prizeUrl,
  myPrizeListUrl,
  addUserInfoUrl,
  queryUserInfoUrl,
  winnersUrl
} from '../components/apiUrl'
import TurntablePageView from './TurntablePageView'

const Test = () => {
  return (
    <div>
      <TurntablePageView
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
