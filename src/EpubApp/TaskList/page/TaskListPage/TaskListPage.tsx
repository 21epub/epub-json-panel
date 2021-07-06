import React, { FC, useState } from 'react';
import { useRequest, useUpdateEffect } from 'ahooks';
import type {
  TaskListApiPropsType,
  TaskListPictureType,
  TaskListType
} from '../../type';
import { getPictureList } from '../../util';
import { queryTaskListDetail } from '../../data/api';
import store from '../../store';
import { getTaskListComponent } from '../TaskListCategory';
import { Wrapper } from './Styled';

export interface TaskListPageProps {
  taskListType: TaskListType;
  taskListApiProps: TaskListApiPropsType;
  taskListPicture: TaskListPictureType;
  isDataChanged?: boolean;
}

// 日历应用页面
const TaskListPage: FC<TaskListPageProps> = (props) => {
  const {
    taskListApiProps,
    taskListPicture,
    taskListType,
    isDataChanged
  } = props;
  const pictureTaskListPic = getPictureList(taskListPicture, taskListType);
  const { slug } = taskListApiProps;
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const TaskListComponent = getTaskListComponent(taskListType);

  // 查询投票详情接口
  const {
    data: taskListDetail,
    loading,
    run: runQueryTaskListDetail
  } = useRequest(() => queryTaskListDetail(slug), {
    throwOnError: true
  });

  // 配置面板数据变化时，重新加载最新应用详情
  useUpdateEffect(() => {
    runQueryTaskListDetail();
  }, [isDataChanged, taskListType]);

  // 请求接口数据
  useUpdateEffect(() => {
    store.reducers.setTaskListApiProps(taskListApiProps);
    store.reducers.setTaskListPicture(pictureTaskListPic);
    if (!loading && taskListDetail) {
      store.reducers.setTaskListDetail(taskListDetail);
      setBackgroundColor('');
    }
  }, [loading]);

  return (
    (!loading || null) && (
      <Wrapper backgroundColor={backgroundColor || ''}>
        <TaskListComponent />
      </Wrapper>
    )
  );
};

export default TaskListPage;
