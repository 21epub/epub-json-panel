import { Col, Form, Input, Row } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUserInfo } from '../api'
import { translateTitle } from '../util'
import styles from './index.module.less'

interface Props {
  isModalShow: boolean
  singleLottery: any
  addUserInfoUrl: string
}

const UserInfoModal = ({
  isModalShow,
  singleLottery,
  addUserInfoUrl
}: Props) => {
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
    if (address && phone && email && name) {
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
          dispatch({ type: 'IsUserInfoModalShow', value: false })
          dispatch({ type: 'shouldUserInfoModalShow', value: false })
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
    <div className={styles.userInfoModal}>
      <Modal
        title='请填写信息'
        visible={isModalShow}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        {singleLottery[0]?.info_fields_list ? (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form name='addUserInfo' form={form}>
                {singleLottery[0]?.info_fields_list.map(
                  (el: any, index: number) => {
                    return (
                      <Form.Item name={el} key={index}>
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