import React, { FC } from 'react';
import store from '../../store';
import type { PageType } from '../../index';
import { Wrapper } from './Styled';

interface GoBackProps {
  pageType: PageType;
}

// 返回
const GoBack: FC<GoBackProps> = (props) => {
  const { pageType } = props;

  // 返回指定页面
  const onGoBack = () => {
    store.reducers.changePage(pageType || 'HomePage');
  };

  return (
    <Wrapper>
      <a className='c-linkblock A_nYZHMU' href='#' onClick={onGoBack}>
        ❮
      </a>
    </Wrapper>
  );
};

export default GoBack;
