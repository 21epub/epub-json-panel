import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import {
  prizeListUrl,
  singleLotteryUrl,
  prizeUrl,
  myPrizeListUrl,
  addUserInfoUrl,
  queryUserInfoUrl,
  winnersUrl
} from '../components/apiUrl'
import { TurntablePageView } from '../index'
export default {
  title: '大转盘播放器',
  component: TurntablePageView,
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
  winnersUrl: string
  prefix: string
}> = (args) => <TurntablePageView {...args} />

export const Yapi = Template.bind({})
Yapi.args = {
  prizeListUrl: prizeListUrl,
  singleLotteryUrl: singleLotteryUrl,
  prizeUrl: prizeUrl,
  myPrizeListUrl: myPrizeListUrl,
  isDataChanged: true,
  addUserInfoUrl: addUserInfoUrl,
  queryUserInfoUrl: queryUserInfoUrl,
  winnersUrl: winnersUrl,
  prefix: 'test'
}
