import React, { FC, useState } from 'react';
import { Col, Form, Input, Row, Button, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { isEmpty } from 'lodash';
import { addUserInfo } from '../../data/api';
import { validateValues, ErrorMsgPrompt, isValidKey } from '../../util';
import type { InfoFieldsListType } from '../../type';
import store from '../../store';
import styles from './index.module.less';

interface UserInfoModalProps {
  isModalShow: boolean;
  addUserInfoUrl?: string;
  getUser: () => void;
}

const UserInfoModal: FC<UserInfoModalProps> = (props) => {
  const { isModalShow, addUserInfoUrl, getUser } = props;
  const [state] = store.useRxjsStore();
  // 获取保存的状态
  const { lotteryDetail } = state;
  const { info_fields_list } = lotteryDetail || {};
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); // 用户信息
  const [info, setInfo] = useState<InfoFieldsListType>({});

  const handleCancel = () => {
    store.reducers.setIsUserInfoModalShow(false);
  };

  // 点击确定时，提交用户信息
  const handleOk = () => {
    if (!info_fields_list) return;
    const errorMsgList = validateValues(info, info_fields_list);
    if (isEmpty(errorMsgList)) {
      setConfirmLoading(true);
      // 判断内容是否填写完整
      if (
        addUserInfoUrl &&
        info_fields_list &&
        Object.keys(info).length === Object.keys(info_fields_list).length
      ) {
        // 添加用户信息
        addUserInfo(addUserInfoUrl, info)
          .then(() => {
            setConfirmLoading(false);
            getUser();
            store.reducers.setIsUserInfoModalShow(false);
            store.reducers.setFilledUserInfo(true);
            form.resetFields();
            message.success('提交信息成功');
            // 成功则清除内容
          })
          .catch((err) => {
            message.error(err.response.data[0]);
            setConfirmLoading(false);
          });
      } else {
        // 用户信息填写不完整
        setConfirmLoading(false);
        message.error('信息未填写完整');
      }
    } else {
      ErrorMsgPrompt(errorMsgList);
    }
  };

  const onValuesChange = (
    _changedValues: InfoFieldsListType,
    values: InfoFieldsListType
  ) => {
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
        {info_fields_list && (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form
                layout='vertical'
                name='addUserInfo'
                form={form}
                onValuesChange={onValuesChange}
              >
                {Object.keys(info_fields_list).map(
                  (key: string, index: number) => {
                    return (
                      isValidKey(key, info_fields_list) && (
                        <Form.Item
                          name={key}
                          key={index}
                          label={info_fields_list[key]}
                        >
                          <Input placeholder={info_fields_list[key]} />
                        </Form.Item>
                      )
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
