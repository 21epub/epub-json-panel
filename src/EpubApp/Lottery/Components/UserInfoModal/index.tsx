import React, { FC, useState } from 'react';
import { Col, Form, Input, Row, Button, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { isEmpty } from 'lodash';
import { addUserInfo } from '../../data/api';
import { translateTitle, validateValues, ErrorMsgPrompt } from '../../util';
import store from '../../store';
import styles from './index.module.less';

interface UserInfoModalProps {
  isModalShow: boolean;
  addUserInfoUrl?: string;
  getUser: () => void;
}

export interface DataType {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

const UserInfoModal: FC<UserInfoModalProps> = (props) => {
  const { isModalShow, addUserInfoUrl, getUser } = props;
  const [state] = store.useRxjsStore();
  // 获取保存的状态
  const { lotteryDetail } = state;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); // 用户信息
  const [info, setInfo] = useState<DataType>({});

  const handleCancel = () => {
    store.reducers.setIsUserInfoModalShow(false);
  };

  const handleOk = () => {
    const errorMsgList = validateValues(info);
    if (isEmpty(errorMsgList)) {
      setConfirmLoading(true);
      const address: string = form.getFieldInstance('address').props.value;
      const phone: string = form.getFieldInstance('phone').props.value;
      const email: string = form.getFieldInstance('email').props.value;
      const name: string = form.getFieldInstance('name').props.value;
      if (address && phone && email && name && addUserInfoUrl) {
        // 添加用户信息
        addUserInfo(addUserInfoUrl, info)
          .then(() => {
            setConfirmLoading(false);
            getUser();
            store.reducers.setIsUserInfoModalShow(false);
            form.resetFields();
            message.success('提交信息成功');
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
        className={styles.userInfoModal}
        title='请填写信息'
        visible={isModalShow}
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
        {lotteryDetail?.info_fields_list && (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form
                layout='horizontal'
                name='addUserInfo'
                form={form}
                onValuesChange={onValuesChange}
              >
                {lotteryDetail?.info_fields_list.map(
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
