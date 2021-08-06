import React, { useState } from 'react';
import { Layout } from 'antd';
import EditorPanel from './EditorPanel';
import SettingPanel from './SettingPanel';
import type { PanelType, SettingConfigType } from '../type';
import PanelHeader from './components/PanelHeader';
import PanelFooter from './components/PanelFooter';
import { Wrapper } from './Styled';

export interface JsonPanelProps {
  // 面板类型
  panelType: PanelType;
  // 面板参数
  panelProps: {
    settingData?: AnyObject;
    settingConfig?: SettingConfigType;
    onChange: (settingData: AnyObject) => void;
    onSmall?: () => void;
    onBig?: () => void;
    onClose?: () => void;
  };
}

// 根据类型返回对应的面板
const JsonPanel: React.FC<JsonPanelProps> = (props) => {
  const { panelType, panelProps } = props;
  const {
    onBig,
    onSmall,
    onClose,
    onChange,
    settingData,
    settingConfig
  } = panelProps;
  const [returnValue, setReturnValue] = useState<AnyObject>({});
  const { Content } = Layout;

  const onSubmit = () => {
    if (panelType === 'EditorPanel') {
      onChange({});
    } else if (panelType === 'SettingPanel') {
      onChange(returnValue);
    }
    onClose && onClose();
  };

  // 编辑面板数据改变时
  const onEditorChange = (value: AnyObject | string) => {
    // setReturnValue({ ...returnValue, ...value });
  };

  // 配置面板数据改变时
  const onSettingChange = (value: AnyObject) => {
    setReturnValue({ ...returnValue, ...value });
  };

  return (
    <Wrapper>
      <Layout>
        <PanelHeader
          panelType={panelType}
          onBig={onBig}
          onSmall={onSmall}
          onClose={onClose}
        />
        <Content>
          {panelType === 'EditorPanel' ? (
            <EditorPanel
              settingData={settingData}
              settingConfig={settingConfig}
              onEditorChange={onEditorChange}
            />
          ) : (
            <SettingPanel
              settingData={settingData}
              settingConfig={settingConfig}
              onSettingChange={onSettingChange}
            />
          )}
        </Content>
        <PanelFooter onSubmit={onSubmit} onClose={onClose} />
      </Layout>
    </Wrapper>
  );
};

export default JsonPanel;
