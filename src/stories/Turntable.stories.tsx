import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Turntable from '../components/Turntable'
import {
  prizeListUrl,
  singleLotteryUrl,
  prizeUrl,
  myPrizeListUrl
} from '../components/apiUrl'

export default {
  title: '测试转盘',
  component: Turntable,
  argTypes: {
    prizeListUrl: {
      name: 'prizeListUrl',
      type: { name: 'string', required: true }
    },
    prizeUrl: {
      name: 'prizeUrl',
      type: { name: 'string', required: true }
    },
    singleLotteryUrl: {
      name: 'singleLotteryUrl',
      type: { name: 'string', required: true }
    },
    isDataChanged: {
      name: 'isDataChanged',
      type: { name: 'string', required: true }
    },
    myPrizeListUrl: {
      name: 'myPrizeListUrl',
      type: { name: 'string', required: true }
    }
  }
} as Meta

const Template: Story<{
  prizeListUrl: string
  prizeUrl: string
  singleLotteryUrl: string
  isDataChanged: boolean
  myPrizeListUrl: string
}> = (args) => <Turntable {...args} />

export const Primary = Template.bind({})
Primary.args = {
  prizeListUrl: prizeListUrl,
  prizeUrl: prizeUrl,
  singleLotteryUrl: singleLotteryUrl,
  isDataChanged: true,
  myPrizeListUrl: myPrizeListUrl
}
