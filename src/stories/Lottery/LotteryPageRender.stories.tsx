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
} from '../../EpubApp/Lottery/data/apiUrl'
import { LotteryPageRender } from '../../EpubApp/Lottery/page'
import type { LotteryPageRenderProps } from '../../EpubApp/Lottery/page'

export default {
  title: 'Lottery/大转盘',
  component: LotteryPageRender,
  argTypes: {
    remainTimes: {
      name: 'test',
      type: { name: 'string', required: true }
    }
  }
} as Meta

const Template: Story<LotteryPageRenderProps> = (args) => (
  <LotteryPageRender {...args} />
)

export const Yapi = Template.bind({})
Yapi.args = {
  lotteryType: 'Turntable',
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
