import React from 'react';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Test'
} as Meta;

const Template: Story<any> = (args) => <div />;

export const Test = Template.bind({});

Test.args = {};
