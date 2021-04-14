import React, { FC, useState } from 'react';
import { Col, Form, Input, Row, Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useDispatch } from 'react-redux';
import { addUserInfo } from '../../data/api';
import { translateTitle } from '../../util';
import { SingleLotteryType } from '../../type';

interface UserInfoModalProps {
  isModalShow: boolean;
  singleLottery: SingleLotteryType;
  addUserInfoUrl?: string;
  getUser: () => void;
}

interface DataType {
  [key: string]: Any;
}

const UserInfoModal: FC<UserInfoModalProps> = (props) => {
  const { isModalShow, singleLottery, addUserInfoUrl, getUser } = props;
  const dispatch = useDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); // 用户信息
  const [info, setInfo] = useState<DataType>({});

  const handleCancel = () => {
    dispatch({ type: 'IsUserInfoModalShow', value: false });
  };

  const handleOk = () => {
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
          dispatch({ type: 'IsUserInfoModalShow', value: false });
          form.resetFields();
          // 成功则清除内容
        })
        .catch(() => {
          setConfirmLoading(false);
        });
    } else {
      // 用户信息填写不完整
      setConfirmLoading(false);
    }
  };

  const onValuesChange = (_changedValues: DataType, values: DataType) => {
    setInfo(values);
  };

  return (
    <div>
      <Modal
        title='请填写信息'
        visible={isModalShow}
        onCancel={handleCancel}
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
        {singleLottery?.info_fields_list && (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form
                name='addUserInfo'
                form={form}
                onValuesChange={onValuesChange}
              >
                {singleLottery?.info_fields_list.map(
                  (el: string, index: number) => {
                    return (
                      <Form.Item
                        name={el}
                        key={index}
                        label={translateTitle(el)}
                        // rules={[{ required: true, message: '请输入信息' }]}
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
