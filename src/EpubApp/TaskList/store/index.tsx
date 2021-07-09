// import RxjsStore, { RxjsStoreReducerParams } from '@21epub/react-rxjs-store';
import { Reducer, createStore } from 'redux';
import {
  TaskListImageType,
  TaskListDetailType,
  TaskListApiPropsType,
  TaskListEventType
} from '../type';

// 管理的状态数据
export type StateType = {
  // 默认图片
  taskListPicture?: TaskListImageType[];
  // 当前应用详情
  taskListDetail?: TaskListDetailType;
  // 接口Url列表
  taskListApiProps?: TaskListApiPropsType;
  // 外部传来的事件
  taskListEvent?: TaskListEventType;
};

export type State = StateType | undefined;

export interface ActionType {
  type:
    | 'taskListPicture'
    | 'taskListDetail'
    | 'taskListApiProps'
    | 'taskListEvent';
  payload: any;
}

// 初始值
export const initState: StateType = {
  taskListPicture: [],
  taskListDetail: undefined,
  taskListApiProps: undefined,
  taskListEvent: undefined
};

export const reducer: Reducer<State, ActionType> = (state, action) => {
  switch (action.type) {
    case 'taskListPicture':
      return { ...state, taskListPicture: action.payload };
    case 'taskListDetail':
      return { ...state, taskListDetail: action.payload };
    case 'taskListApiProps':
      return { ...state, taskListApiProps: action.payload };
    case 'taskListEvent':
      return { ...state, taskListEvent: action.payload };
    default:
      return state;
  }
};

// 全局共享的store
const store = createStore(reducer, initState);
export default store;
