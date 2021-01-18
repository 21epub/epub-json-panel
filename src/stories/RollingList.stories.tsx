import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { RollingList } from '../index'

export default {
  title: '奖品滚动',
  component: RollingList,
  argTypes: {
    remainTimes: {
      name: '剩余次数',
      type: { name: 'string', required: true }
    }
  }
} as Meta

const Template: Story = (args) => <RollingList {...args} />

export const Yapi = Template.bind({})
