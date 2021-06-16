import React, { FC, useState } from 'react';
import { Col, Form, Input, Row, Button, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { isEmpty } from 'lodash';
import { addUserInfo } from '../../data/api';
import { translateTitle, validateValues, ErrorMsgPrompt } from '../../util';
import store from '../../store';

interface UserInfoModalProps {}

export interface DataType {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

// 填写用户信息弹出框
const UserInfoModal: FC<UserInfoModalProps> = (props) => {
  const [state] = store.useRxjsStore();
  // 获取保存的状态
  const { clockDetail, isShowUserInfoModal } = state;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); // 用户信息
  const [info, setInfo] = useState<DataType>({});

  const handleCancel = () => {
    store.reducers.setIsShowUserInfoModal(false);
  };

  const handleOk = () => {
    const errorMsgList = validateValues(info);
    if (isEmpty(errorMsgList)) {
      setConfirmLoading(true);
      const address: string = form.getFieldInstance('address').props.value;
      const phone: string = form.getFieldInstance('phone').props.value;
      const email: string = form.getFieldInstance('email').props.value;
      const name: string = form.getFieldInstance('name').props.value;
      if (address && phone && email && name && clockDetail?.slug) {
        // 添加用户信息
        addUserInfo(clockDetail.slug, info)
          .then(() => {
            setConfirmLoading(false);
            form.resetFields();
            message.success('提交信息成功');
            store.reducers.setIsShowUserInfoModal(false);
            // 成功则清除内容
          })
          .catch(() => {
            setConfirmLoading(false);
          });
      } else {
        // 用户信息填写不完整
        setConfirmLoading(false);
      }
    } else {
      ErrorMsgPrompt(errorMsgList);
    }
  };

  const onValuesChange = (_changedValues: DataType, values: DataType) => {
    setInfo(values);
  };

  return (
    <div>
      <Modal
        title='请填写信息'
        visible={isShowUserInfoModal}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button
            onClick={handleCancel}
            type='default'
            key='userInfoCancelButton'
          >
            取消
          </Button>,
          <Button onClick={handleOk} type='primary' key='userInfoOkButton'>
            确定
          </Button>
        ]}
        confirmLoading={confirmLoading}
      >
        {clockDetail?.info_fields_list && (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form
                layout='vertical'
                name='addUserInfo'
                form={form}
                onValuesChange={onValuesChange}
              >
                {clockDetail?.info_fields_list.map(
                  (el: string, index: number) => {
                    return (
                      <Form.Item
                        name={el}
                        key={index}
                        label={translateTitle(el)}
                      >
                        <Input placeholder={translateTitle(el)} />
                      </Form.Item>
                    );
                  }
                )}
              </Form>
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
};

export default UserInfoModal;
