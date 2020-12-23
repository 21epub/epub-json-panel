import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { LotteryPage } from '../index'

export default {
  title: '抽奖页',
  component: LotteryPage,
  argTypes: {
    remainTimes: {
      name: 'test',
      type: { name: 'string', required: true }
    }
  }
} as Meta

const Template: Story<{ remainTimes: number }> = (args) => (
  <LotteryPage {...args} />
)

export const Yapi = Template.bind({})
Yapi.args = {
  remainTimes: 5
}
