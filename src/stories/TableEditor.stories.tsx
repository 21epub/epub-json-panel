import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import TableEditor from '../components/TableEditor'

export default {
  title: 'TableEditor',
  component: TableEditor,
  argTypes: {
    url: {
      name: 'url',
      type: { name: 'string', required: true }
    }
  }
} as Meta

const Template: Story<{ url: string }> = (args) => <TableEditor {...args} />

export const Yapi = Template.bind({})
Yapi.args = {
  url: 'yapi'
}

export const RealUrl = Template.bind({})
RealUrl.args = {
  url: 'real'
}
