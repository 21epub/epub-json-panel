import React, { FC, useState } from 'react';
import 'antd/dist/antd.css';
import { MonacoEditorWidget } from '@21epub/epub-form-components';
import type { PanelBaseProps, PanelConfigType } from '../../type';
import SettingPanel from '../SettingPanel';
import { formatJson, toJson } from './util';
import { Wrapper } from './Styled';

export interface EditorPanelProps extends PanelBaseProps {
  onEditorChange: (panelData: string) => void;
}

// 配置面板
const EditorPanel: FC<EditorPanelProps> = (props) => {
  const {
    panelData,
    panelConfig,
    monacoLanguage,
    componentMap,
    onEditorChange
  } = props;
  const [returnValue, setReturnValue] = useState<AnyObject>();
  const [editorValue, setEditorValue] = useState<PanelConfigType | string>(
    panelConfig || ''
  );
  const [initialValues, setInitialValues] = useState<AnyObject>(
    panelData || {}
  );

  // 每次组件改变时，格式化数据
  const onValuesChange = (changedValues: AnyObject, _values: AnyObject) => {
    setReturnValue({ ...returnValue, ...changedValues });
    setInitialValues({ ...initialValues, ...changedValues });
  };

  const onMonacoChange = (value: string) => {
    onEditorChange(toJson(value));
    setEditorValue(toJson(value));
  };

  return (
    <Wrapper>
      <MonacoEditorWidget
        height='100%'
        language={monacoLanguage}
        value={formatJson(JSON.stringify(editorValue))}
        onChange={onMonacoChange}
      />
      <SettingPanel
        panelData={initialValues}
        panelConfig={toJson(formatJson(JSON.stringify(editorValue)))}
        componentMap={componentMap}
        onSettingChange={onValuesChange}
      />
    </Wrapper>
  );
};

export default EditorPanel;
