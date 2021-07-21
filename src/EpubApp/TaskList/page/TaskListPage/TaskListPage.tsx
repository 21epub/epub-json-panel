import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { useRequest, useUpdateEffect } from 'ahooks';
import type {
  TaskListApiPropsType,
  TaskListPictureType,
  TaskListType,
  TaskListEventType
} from '../../type';
import { getPictureList, isInActivityTime } from '../../util';
import { queryTaskListDetail } from '../../data/api';
import { ActionType } from '../../store';
import { getTaskListComponent } from '../TaskListCategory';
import { Wrapper } from './Styled';

export interface TaskListPageProps {
  taskListType: TaskListType;
  taskListApiProps: TaskListApiPropsType;
  taskListPicture: TaskListPictureType;
  taskListEvent?: TaskListEventType;
  isDataChanged?: boolean;
}

// 日历应用页面
const TaskListPage: FC<TaskListPageProps> = (props) => {
  const {
    taskListApiProps,
    taskListPicture,
    taskListType = 'ListTheme',
    taskListEvent,
    isDataChanged
  } = props;
  const dispatch = useDispatch<(state: ActionType) => void>();
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
    if (
      taskListEvent &&
      taskListDetail &&
      taskListDetail.start_time &&
      taskListDetail.end_time
    ) {
      // 判断是否在活动时间内
      if (
        !isInActivityTime(taskListDetail.start_time, taskListDetail.end_time)
          .value
      ) {
        const msg = isInActivityTime(
          taskListDetail.start_time,
          taskListDetail.end_time
        ).msg;
        message.error(msg || '不在活动时间内，请确认活动时间！');
      }
    }

    dispatch({ type: 'taskListPicture', payload: pictureTaskListPic });
    dispatch({ type: 'taskListApiProps', payload: taskListApiProps });
    dispatch({ type: 'taskListEvent', payload: taskListEvent });
    if (!loading && taskListDetail) {
      dispatch({ type: 'taskListDetail', payload: taskListDetail });
      setBackgroundColor(taskListDetail.background_color || '');
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
