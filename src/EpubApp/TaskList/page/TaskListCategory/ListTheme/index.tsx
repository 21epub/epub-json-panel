import React, { FC } from 'react';
import store from '../../../store';
import { Wrapper } from './Styled';

export interface ListThemeProps {}

const ListTheme: FC<ListThemeProps> = () => {
  const [state] = store.useRxjsStore();
  const { taskListDetail } = state;
  const { title } = taskListDetail ?? {};

  return <Wrapper>{title}</Wrapper>;
};

export default ListTheme;
