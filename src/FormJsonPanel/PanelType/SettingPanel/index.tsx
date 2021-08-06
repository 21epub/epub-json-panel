import React, { FC } from 'react';
import { Tabs } from 'antd';
import { ComponentsRender } from '../../ComponentsRender';
import { SettingConfigType, SettingTabsType } from '../../type';
import { Wrapper } from './styled';

export interface SettingPanelProps {
  settingData?: AnyObject;
  settingConfig?: SettingConfigType;
  onSettingChange: (changedValues: AnyObject, values: AnyObject) => void;
}

// 渲染Tabs页
const SettingPanel: FC<SettingPanelProps> = (props) => {
  const { settingData, settingConfig, onSettingChange } = props;
  const { TabPane } = Tabs;

  // 渲染每个Tabs的面板
  const TabPaneRender = (tabsList?: SettingTabsType[]) => {
    return tabsList?.map((tabs) => {
      return (
        <TabPane key={tabs.id} tab={tabs.tabsName}>
          <ComponentsRender
            initialValues={settingData}
            componentList={tabs.componentList}
            onValuesChange={onSettingChange}
          />
        </TabPane>
      );
    });
  };

  return (
    <Wrapper className='SettingPanel'>
      <Tabs tabPosition='left'>{TabPaneRender(settingConfig?.tabs)}</Tabs>
    </Wrapper>
  );
};

export default SettingPanel;
