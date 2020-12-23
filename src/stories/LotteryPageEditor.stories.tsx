import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { LotteryPageEditor } from '../index'

export default {
  title: '抽奖页编辑器',
  component: LotteryPageEditor,
  argTypes: {
    remainTimes: {
      name: 'test',
      type: { name: 'string', required: true }
    }
  }
} as Meta

const Template: Story<{ remainTimes: number }> = (args) => (
  <LotteryPageEditor {...args} />
)

export const Yapi = Template.bind({})
Yapi.args = {
  remainTimes: 5
}
