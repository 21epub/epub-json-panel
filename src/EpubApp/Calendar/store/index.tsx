import RxjsStore, { RxjsStoreReducerParams } from '@21epub/react-rxjs-store';
import {
  CalendarImageType,
  CalendarDetailType,
  CalendarApiPropsType
} from '../type';

// 管理的状态数据
export interface StateType {
  // 默认图片
  calendarPicture: CalendarImageType[];
  // 当前签到应用详情
  calendarDetail?: CalendarDetailType;
  // 抽奖接口Url列表
  calendarApiProps?: CalendarApiPropsType;
}

// 初始值
const initState: StateType = {
  calendarPicture: [],
  calendarDetail: undefined,
  calendarApiProps: undefined
};

// Reducers Types definition (Recommanded)
interface Reducers<S> extends RxjsStoreReducerParams<S> {
  setCalendarPicture: (state: S, payload?: CalendarImageType[]) => S;
  setCalendarDetail: (state: S, payload?: CalendarDetailType) => S;
  setCalendarApiProps: (state: S, payload?: CalendarApiPropsType) => S;
}

const reducers: Reducers<StateType> = {
  setCalendarPicture(state, payload = []) {
    return { ...state, calendarPicture: payload };
  },
  setCalendarDetail(state, payload) {
    return { ...state, calendarDetail: payload };
  },
  setCalendarRecord(state, payload) {
    return { ...state, calendarRecord: payload };
  },
  setCalendarApiProps(state, payload) {
    return { ...state, calendarApiProps: payload };
  }
};

export default new RxjsStore<StateType, Reducers<StateType>>(
  initState,
  reducers
);
