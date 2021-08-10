import React from 'react';
import { Story, Meta } from '@storybook/react';
import { JsonPanel } from '../JsonPanel';
import type { JsonPanelProps } from '../JsonPanel';
import { jsonPanelSetting } from '../mock/settingConfig';

export default {
  title: 'JsonPanel',
  component: JsonPanel
} as Meta;

const Template: Story<JsonPanelProps> = (args) => <JsonPanel {...args} />;

export const Json_Panel = Template.bind({});

const onChange = (value: any) => {
  console.log(value);
};

Json_Panel.args = {
  panelType: 'EditorPanel',
  panelProps: {
    panelData: {},
    panelConfig: jsonPanelSetting,
    onChange: onChange
  }
};
