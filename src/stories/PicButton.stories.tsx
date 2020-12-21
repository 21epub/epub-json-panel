import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { PicButton } from '../index'

export default {
  title: '图片按钮',
  component: PicButton,
  argTypes: {
    remainTimes: {
      name: '剩余次数',
      type: { name: 'string', required: true }
    }
  }
} as Meta

const Template: Story<{ remainTimes: number }> = (args) => (
  <PicButton {...args} />
)

export const Yapi = Template.bind({})
Yapi.args = {
  remainTimes: 5
}
