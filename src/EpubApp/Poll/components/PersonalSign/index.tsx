import React, { FC, useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { useRequest } from 'ahooks';
import { isEmpty } from 'lodash';
import { validateValues, ErrorMsgPrompt, translateTitle } from '../../util';
import { createSign } from '../../data/api';
import type { PollContactInfoType, ParticipantsType } from '../../type';
import FormImage from './FormImage';
import store from '../../store';

interface PersonalSignProps {
  slug?: string;
  visible: boolean;
  onCancel: () => void;
}

// 个人参赛注册面板
const PersonalSign: FC<PersonalSignProps> = (props: PersonalSignProps) => {
  const { slug, onCancel, ...rest } = props;
  const [state] = store.useRxjsStore();
  const { pollDetail, pollEvent } = state;
  const { book_slug, info_fields_list } = pollDetail ?? {};
  const [formValues, setFormValues] = useState<ParticipantsType>();
  const [confirmLoading, setConfirmLoading] = useState(false);

  // 创建参赛用户
  const { loading, run: runCreateSign } = useRequest(
    (data) => createSign(pollDetail?.slug || '', data),
    {
      manual: true,
      ready: !!pollDetail?.slug,
      throwOnError: true,
      onSuccess: () => {
        setConfirmLoading(false);
        message.success('提交报名信息成功');
        if (pollEvent && pollEvent.runQueryPollDetail) {
          pollEvent.runQueryPollDetail();
          pollEvent.onSignUpSuccess();
        }
      },
      onError: (err: any) => {
        if (pollEvent) {
          pollEvent.onSignUpFail();
        }
        message.error(err?.response?.data?.[0]);
        setConfirmLoading(false);
      }
    }
  );

  // 表单数据变化时
  const onValuesChange = (_changedValues: any, values: any) => {
    setFormValues(values);
  };

  // 上传信息
  const onClick = () => {
    const errorMsgList = validateValues(formValues);
    if (isEmpty(errorMsgList)) {
      setConfirmLoading(true);
      if (formValues && pollDetail?.slug) {
        const user_info: PollContactInfoType = {
          name: formValues.name,
          phone: formValues.phone,
          address: formValues.address
        };
        // 添加用户信息
        runCreateSign({ ...formValues, user_info });
      } else {
        // 用户信息填写不完整
        setConfirmLoading(false);
      }
    } else {
      ErrorMsgPrompt(errorMsgList);
    }
  };

  return (
    <Modal
      centered
      className='PersonalModal'
      title='上传报名信息'
      footer={[
        <Button key='submit' type='primary' loading={loading} onClick={onClick}>
          提交
        </Button>
      ]}
      destroyOnClose
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      {...rest}
    >
      <Form layout='vertical' onValuesChange={onValuesChange}>
        <Form.Item label='上传参赛图片' name='cover'>
          <FormImage book_slug={book_slug} />
        </Form.Item>
        <Form.Item label='参赛作品标题' name='sign_title'>
          <Input placeholder='请输入标题' />
        </Form.Item>
        <Form.Item label='参赛介绍' name='introduction'>
          <Input.TextArea placeholder='请输入介绍' />
        </Form.Item>
        <Form.Item label='补充说明' name='description'>
          <Input.TextArea placeholder='请输入补充说明' />
        </Form.Item>
        {info_fields_list?.map((name: string, index: number) => {
          return (
            <Form.Item name={name} key={index} label={translateTitle(name)}>
              <Input placeholder={translateTitle(name)} />
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

export default PersonalSign;
