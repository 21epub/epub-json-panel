import RxjsStore, { RxjsStoreReducerParams } from '@21epub/react-rxjs-store';
import {
  TaskListImageType,
  TaskListDetailType,
  TaskListApiPropsType
} from '../type';

// 管理的状态数据
export interface StateType {
  // 默认图片
  taskListPicture: TaskListImageType[];
  // 当前签到应用详情
  taskListDetail?: TaskListDetailType;
  // 抽奖接口Url列表
  taskListApiProps?: TaskListApiPropsType;
}

// 初始值
const initState: StateType = {
  taskListPicture: [],
  taskListDetail: undefined,
  taskListApiProps: undefined
};

// Reducers Types definition (Recommanded)
interface Reducers<S> extends RxjsStoreReducerParams<S> {
  setTaskListPicture: (state: S, payload?: TaskListImageType[]) => S;
  setTaskListDetail: (state: S, payload?: TaskListDetailType) => S;
  setTaskListApiProps: (state: S, payload?: TaskListApiPropsType) => S;
}

const reducers: Reducers<StateType> = {
  setTaskListPicture(state, payload = []) {
    return { ...state, taskListPicture: payload };
  },
  setTaskListDetail(state, payload) {
    return { ...state, taskListDetail: payload };
  },
  setTaskListRecord(state, payload) {
    return { ...state, taskListRecord: payload };
  },
  setTaskListApiProps(state, payload) {
    return { ...state, taskListApiProps: payload };
  }
};

export default new RxjsStore<StateType, Reducers<StateType>>(
  initState,
  reducers
);
