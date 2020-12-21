import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Turntable from '../components/Turntable'
import { prizeListUrl, prizeUrl, singleLotteryUrl } from '../components/api'

export default {
  title: '测试转盘',
  component: Turntable,
  argTypes: {
    prizeListUrl: {
      name: 'prizeListUrl',
      type: { name: 'string', required: false }
    },
    prizeUrl: {
      name: 'prizeUrl',
      type: { name: 'string', required: false }
    },
    singleLotteryUrl: {
      name: 'singleLotteryUrl',
      type: { name: 'string', required: false }
    }
  }
} as Meta

const Template: Story<{
  prizeListUrl: string
  prizeUrl: string
  singleLotteryUrl: string
}> = (args) => <Turntable {...args} />

export const Primary = Template.bind({})
Primary.args = {
  prizeListUrl: prizeListUrl,
  prizeUrl: prizeUrl,
  singleLotteryUrl: singleLotteryUrl
}
