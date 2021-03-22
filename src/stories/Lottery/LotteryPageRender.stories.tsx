import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import {
  prizeListUrl,
  singleLotteryUrl,
  prizeUrl,
  userInfoUrl,
  winnersUrl
} from '../../EpubApp/Lottery/data/apiUrl'
import { LotteryPageRender } from '../../EpubApp/Lottery/page'
import type { LotteryPageRenderProps, LotteryUrlListType } from '../../index'

export default {
  title: 'Lottery/大转盘',
  component: LotteryPageRender,
  argTypes: {
    remainTimes: {
      name: 'test',
      type: { name: 'string', required: true }
    }
  }
} as Meta

const Template: Story<LotteryPageRenderProps> = (args) => (
  <LotteryPageRender {...args} />
)

export const Yapi = Template.bind({})

// 抽奖各接口请求地址
const lotteryUrlList: LotteryUrlListType = {
  // 获取单个抽奖活动信息
  singleLotteryUrl: singleLotteryUrl,
  // 获取奖品信息列表
  prizeListUrl: prizeListUrl,
  // 默认图片链接地址头
  picturePrefix: 'test',
  // 抽奖与获取我的奖品信息
  prizeUrl: prizeUrl,
  // 获取与查询用户信息
  userInfoUrl: userInfoUrl,
  // 获取中奖用户滚动信息
  winnersUrl: winnersUrl
}

Yapi.args = {
  lotteryType: 'Turntable',
  lotteryUrlList: lotteryUrlList,
  isDataChanged: true
}