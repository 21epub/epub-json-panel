import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import {
  prizeListUrl,
  singleLotteryUrl,
  prizeUrl,
  myPrizeListUrl,
  addUserInfoUrl,
  queryUserInfoUrl
} from '../components/apiUrl'
import { LotteryPageView } from '../index'
export default {
  title: '抽奖播放器',
  component: LotteryPageView,
  argTypes: {
    remainTimes: {
      name: 'test',
      type: { name: 'string', required: true }
    }
  }
} as Meta

const Template: Story<{
  prizeListUrl: string
  singleLotteryUrl: string
  prizeUrl: string
  myPrizeListUrl: string
  isDataChanged: boolean
  addUserInfoUrl: string
  queryUserInfoUrl: string
}> = (args) => <LotteryPageView {...args} />

export const Yapi = Template.bind({})
Yapi.args = {
  prizeListUrl: prizeListUrl,
  singleLotteryUrl: singleLotteryUrl,
  prizeUrl: prizeUrl,
  myPrizeListUrl: myPrizeListUrl,
  isDataChanged: true,
  addUserInfoUrl: addUserInfoUrl,
  queryUserInfoUrl: queryUserInfoUrl
}
