import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { prizeListUrl, singleLotteryUrl } from '../../data/apiUrl'
import LotteryPageEditor from '../editor/LotteryPageEditor'

export default {
  title: 'Lottery/大转盘编辑器',
  component: LotteryPageEditor,
  argTypes: {
    remainTimes: {
      name: 'test',
      type: { name: 'string', required: true }
    }
  }
} as Meta

const Template: Story<{
  prizeListUrl: string
  singleLotteryUrl: string
  isDataChanged: boolean
  prefix: string
}> = (args) => <LotteryPageEditor {...args} />

export const Yapi = Template.bind({})
Yapi.args = {
  prizeListUrl: prizeListUrl,
  singleLotteryUrl: singleLotteryUrl,
  isDataChanged: true,
  prefix: 'test'
}
