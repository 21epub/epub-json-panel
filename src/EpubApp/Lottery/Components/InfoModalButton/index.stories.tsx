import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import InfoModalButton from '.'

export default {
  title: 'Lottery/提示按钮',
  component: InfoModalButton
} as Meta

const Template: Story = () => <InfoModalButton />

export const Primary = Template.bind({})
