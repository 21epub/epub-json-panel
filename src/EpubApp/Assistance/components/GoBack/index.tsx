import React, { FC } from 'react'
import store from '../../store'
import type { PageNumberType } from '../../index'

interface GoBackProps {
  PageNumber: PageNumberType
}

// 返回
const GoBack: FC<GoBackProps> = (props) => {
  const { PageNumber } = props

  // 返回指定页面
  const onGoBack = () => {
    store.reducers.ChangePage(PageNumber || 'HomePage')
  }

  return (
    <a className='c-linkblock A_nYZHMU' href='#' onClick={onGoBack}>
      ❮
    </a>
  )
}

export default GoBack
