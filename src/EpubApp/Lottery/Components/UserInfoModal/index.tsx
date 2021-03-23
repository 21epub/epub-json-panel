import React, { FC, useState } from 'react'
import { Col, Form, Input, Row, Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { useDispatch } from 'react-redux'
import { addUserInfo } from '../../data/api'
import { translateTitle } from '../../util'

interface UserInfoModalProps {
  isModalShow: boolean
  singleLottery: any
  addUserInfoUrl?: string
  getUser: any
}

const UserInfoModal: FC<UserInfoModalProps> = (props) => {
  const { isModalShow, singleLottery, addUserInfoUrl, getUser } = props
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm() // 用户信息
  const [tips, setTips] = useState(<div />) // 填写用户信息时的提示信息

  const handleCancel = () => {
    dispatch({ type: 'IsUserInfoModalShow', value: false })
    setTips(<div />)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    const address: string = form.getFieldInstance('address').props.value
    const phone: string = form.getFieldInstance('phone').props.value
    const email: string = form.getFieldInstance('email').props.value
    const name: string = form.getFieldInstance('name').props.value
    let info: any
    if (address && phone && email && name && addUserInfoUrl) {
      info = {
        address: address,
        phone: phone,
        email: email,
        name: name
      }
      // 添加用户信息
      addUserInfo(addUserInfoUrl, info).then((res: any) => {
        if (res.status === 201) {
          setConfirmLoading(false)
          getUser()
          dispatch({ type: 'IsUserInfoModalShow', value: false })
          form.resetFields()

          // 成功则清除内容
        } else {
          setTips(<p style={{ color: 'red' }}>请求失败，请重新尝试</p>)
          setConfirmLoading(false)
        }
      })
    } else {
      // 用户信息填写不完整
      setTips(<p style={{ color: 'red' }}>请填写正确的用户信息</p>)
      setConfirmLoading(false)
    }
  }

  const onChange = () => {
    setTips(<div />)
  }

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
        {singleLottery[0]?.info_fields_list ? (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form name='addUserInfo' form={form}>
                {singleLottery[0]?.info_fields_list.map(
                  (el: any, index: number) => {
                    return (
                      <Form.Item
                        name={el}
                        key={index}
                        label={translateTitle(el)}
                        rules={[{ required: true }]}
                      >
                        <Input
                          placeholder={translateTitle(el)}
                          onChange={onChange}
                        />
                      </Form.Item>
                    )
                  }
                )}
              </Form>
            </Col>
          </Row>
        ) : (
          <div />
        )}
        {tips}
      </Modal>
    </div>
  )
}

export default UserInfoModal
