import type { TaskListType } from '../../type';
import ListTask from './ListTheme';

// 获取对应类型的投票应用
export const getTaskListComponent = (taskListType: TaskListType) => {
  // 投票应用列表
  const taskListMap = {
    ListTask
  };

  return Reflect.get(taskListMap, taskListType) ?? ListTask;
};
