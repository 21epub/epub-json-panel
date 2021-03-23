import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Test from '../../EpubApp/Lottery/Test'

export default {
  title: 'Lottery/测试组件',
  component: Test
} as Meta

const Template: Story = () => <Test />

export const Yapi = Template.bind({})
