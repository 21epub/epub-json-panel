import React, { FC, useState } from 'react';
import 'antd/dist/antd.css';
import { MonacoEditorWidget } from '@21epub/epub-form-components';
import { SettingConfigType } from '../../type';
import SettingPanel from '../SettingPanel';
import { formatJson, toJson } from './util';
import { Wrapper } from './Styled';

export interface EditorPanelProps {
  settingData?: AnyObject;
  settingConfig?: SettingConfigType;
  onEditorChange: (settingData: string) => void;
}

// 配置面板
const EditorPanel: FC<EditorPanelProps> = (props) => {
  const { settingData, settingConfig, onEditorChange } = props;
  const [returnValue, setReturnValue] = useState<AnyObject>();
  const [editorValue, setEditorValue] = useState<Any>(settingConfig);
  const [initialValues, setInitialValues] = useState<AnyObject>(
    settingData ?? {}
  );

  // 每次组件改变时，格式化数据
  const onValuesChange = (changedValues: AnyObject, _values: AnyObject) => {
    setReturnValue({ ...returnValue, ...changedValues });
    setInitialValues({ ...initialValues, ...changedValues });
  };

  const onMonacoChange = (value: string) => {
    onEditorChange(value);
    setEditorValue(toJson(value));
  };

  return (
    <Wrapper>
      <MonacoEditorWidget
        height='88%'
        value={formatJson(JSON.stringify(editorValue))}
        onChange={onMonacoChange}
      />
      <SettingPanel
        settingData={initialValues}
        settingConfig={editorValue}
        onSettingChange={onValuesChange}
      />
    </Wrapper>
  );
};

export default EditorPanel;
