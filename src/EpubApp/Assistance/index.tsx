import React, { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Spin } from 'antd'
import { useRequest } from 'ahooks'
import { QueryAssistanceDetail } from './data/api'
import {
  HomePage,
  ObjectivePage,
  MyAssistancePage,
  AssistancePage
} from './page'
import { GetUrlRequest, GetRequest } from './util'
import store from './store'
import './css/Styles.css'

interface AssistanceProps {
  urlKey: string
  aslug: string
}

// 页面类型
export type PageNumberType =
  | 'HomePage'
  | 'ObjectivePage'
  | 'MyAssistancePage'
  | 'AssistancePage'
  | ''

// 助力应用
const Assistance: FC<AssistanceProps> = (props) => {
  const { urlKey, aslug } = props
  const [oslug, setOslug] = useState('')
  const [acslug, setAcslug] = useState('')
  const [state] = store.useRxjsStore()

  // 查询助力详情接口
  const { data: AssistanceDetail } = useRequest(() =>
    QueryAssistanceDetail(aslug)
  )

  // 请求接口数据
  useEffect(() => {
    if (GetUrlRequest()[urlKey]) {
      setOslug(
        GetRequest(decodeURIComponent(GetUrlRequest()[urlKey])).Objective
      )
      setAcslug(
        GetRequest(decodeURIComponent(GetUrlRequest()[urlKey])).Activity
      )
      store.reducers.ChangePage('AssistancePage')
    } else {
      store.reducers.ChangePage('HomePage')
    }
  }, [])

  // 选择需要显示的页面
  if (AssistanceDetail) {
    switch (state.PageNumber) {
      case 'HomePage':
        return <HomePage AssistanceDetail={AssistanceDetail} />
      case 'ObjectivePage':
        return <ObjectivePage AssistanceDetail={AssistanceDetail} />
      case 'MyAssistancePage':
        return (
          <MyAssistancePage
            AssistanceDetail={AssistanceDetail}
            urlKey={urlKey}
          />
        )
      case 'AssistancePage':
        return (
          <AssistancePage
            AssistanceDetail={AssistanceDetail}
            oslug={oslug}
            acslug={acslug}
          />
        )
      default:
        return <Spin tip='Loading...' />
    }
  } else {
    return <Spin tip='Loading...' />
  }
}

// 加载外部的错误提示框
const Error = (props: any) => {
  // console.log('object', props);
  // 传入的是自定义错误提示弹出框方法；
  // console.log(props);
  // 将导入的方法绑定到全局window上，方便调用；
  // window.ShowErrorPro = props;
}

// 初始化助力应用
const Initialization = (el: Element, urlKey: string, aslug: string) => {
  ReactDOM.render(<Assistance urlKey={urlKey} aslug={aslug} />, el)
}

//* **----------------------------------------------------------------------------------绑定触发器与暴露相关参数 */

// 绑定事件触发器
// let onSuccess: () => void
// let onInitiate: () => void
// const bind = (customType: string, callback: () => void) => {
//   switch (customType) {
//     case 'epubApp_assistance_onsuccess':
//       onSuccess = callback
//       break
//     case 'epubApp_assistance_oninitiate':
//       onInitiate = callback
//       break
//   }
// }

// 用于定义暴露事件
const Actions = [
  {
    name: '帮TA助力成功时',
    customType: 'epubApp_assistance_onsuccess',
    value: 99
  },
  { name: '发起助力时', customType: 'epubApp_assistance_oninitiate', value: 99 }
]

// 定义暴露参数
const Params = [
  ['助力名称', 'app_assistance_title'], // 显示绑定名称 和 对应 key
  ['开始时间', 'app_assistance_start_time'],
  ['结束时间', 'app_assistance_end_time'],
  ['助力类型', 'app_assistance_type'],
  ['助力值规则', 'app_assistance_value_rule']
]

export { Assistance, Initialization, Error, Actions, Params }
