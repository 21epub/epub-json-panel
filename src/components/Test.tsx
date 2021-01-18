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
// import LotteryPageTestEditor from './LotteryPageTestEditor'
import LotteryPageTestView from './LotteryPageTestView'

const Test = () => {
  return (
    <div>
      <LotteryPageTestView
        prizeListUrl={prizeListUrl}
        singleLotteryUrl={singleLotteryUrl}
        prizeUrl={prizeUrl}
        myPrizeListUrl={myPrizeListUrl}
        isDataChanged
        addUserInfoUrl={addUserInfoUrl}
        queryUserInfoUrl={queryUserInfoUrl}
        winnersUrl={winnersUrl}
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
