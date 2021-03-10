import { message } from 'antd'

// 弹窗提示message
const ErrorPrompt = (props: any) => {
  message.error(props || 'This is an error message', 5)
  // 判断是否已导入外部报错提示框
  // if(window.ShowErrorPro){
  //   window.ShowErrorPro(props);
  // }else {
  //   message.error(props ? props : 'This is an error message', 5);
  // }
}

export default ErrorPrompt
