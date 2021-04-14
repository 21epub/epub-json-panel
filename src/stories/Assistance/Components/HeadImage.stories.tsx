import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import HeadImage from '../../../EpubApp/Assistance/components/HeadImage/index';

export default {
  title: 'Assistance/Components/活动图片',
  component: HeadImage
} as Meta;

const Template: Story = () => <HeadImage />;

export const picture = Template.bind({});
