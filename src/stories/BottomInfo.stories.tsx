import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { BottomInfo } from '../index'

export default {
  title: '底部信息',
  component: BottomInfo,
  argTypes: {
    remainTimes: {
      name: '剩余次数',
      type: { name: 'string', required: true }
    }
  }
} as Meta

const Template: Story<{ remainTimes: number }> = (args) => (
  <BottomInfo {...args} />
)

export const Yapi = Template.bind({})
Yapi.args = {
  remainTimes: 5
}
