import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { Test } from '../index'

export default {
  title: '测试组件',
  component: Test
} as Meta

const Template: Story = () => <Test />

export const Yapi = Template.bind({})
