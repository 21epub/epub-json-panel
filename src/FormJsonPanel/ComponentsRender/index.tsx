import React, { FC, Fragment } from 'react';
import { Form } from 'antd';
import { getComponent } from '../components';
import type { ComponentType } from '../type';
import { Wrapper } from './styled';

interface ComponentsRenderProps {
  initialValues?: AnyObject;
  componentList: ComponentType[];
  onValuesChange: (changedValues: AnyObject, values: AnyObject) => void;
}

// 渲染组件
export const ComponentsRender: FC<ComponentsRenderProps> = (props) => {
  const { componentList, initialValues = {}, onValuesChange } = props;
  const [form] = Form.useForm();

  // 初始化初始值，将组件中的value值，赋值到initialValues中
  // 格式化初始值，使之符合组件的格式
  const formatInitialValues = (component: ComponentType) => {
    // 默认返回传进来的初始值
    return initialValues?.[component.name] ?? component.value;
  };

  // 递归渲染页面
  const render = (
    // 需要渲染的组件列表
    componentList: ComponentType[],
    // 递归的层级
    count: number
  ): React.ReactNode => {
    return componentList?.map((component: ComponentType) => {
      const Component = getComponent(component.type);
      return (
        <Fragment key={component.id}>
          <Form.Item
            key={component.id}
            name={component.name}
            label={component.label}
            className={count ? 'FormItemRender' : ''}
            initialValue={formatInitialValues(component)}
            style={{ position: 'relative', marginLeft: `${count * 50}px` }}
          >
            <Component
              slug={initialValues?.slug ?? initialValues?.id}
              picture={initialValues?.picture}
              {...component.props}
            />
          </Form.Item>
          {component.children &&
            !!formatInitialValues(component) &&
            render(component.children, count + 1)}
        </Fragment>
      );
    });
  };

  return (
    <Wrapper>
      <Form form={form} layout='vertical' onValuesChange={onValuesChange}>
        {render(componentList, 0)}
      </Form>
    </Wrapper>
  );
};
