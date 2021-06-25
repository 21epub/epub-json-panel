import React, { FC, useState } from 'react';
import { useRequest, useUpdateEffect } from 'ahooks';
import type {
  CalendarApiPropsType,
  CalendarPictureType,
  CalendarType
} from '../../type';
import { getPicture, getPictureList } from '../../util';
import { queryCalendarDetail } from '../../data/api';
import store from '../../store';
import { getCalendarComponent } from '../CalendarCategory';
import { Wrapper } from './Styled';

export interface CalendarPageProps {
  calendarType: CalendarType;
  calendarApiProps: CalendarApiPropsType;
  calendarPicture: CalendarPictureType;
  isDataChanged?: boolean;
}

// 日历应用页面
const CalendarPage: FC<CalendarPageProps> = (props) => {
  const {
    calendarApiProps,
    calendarPicture,
    calendarType,
    isDataChanged
  } = props;
  const pictureCalendarPic = getPictureList(calendarPicture, calendarType);
  const { slug } = calendarApiProps;
  const [isShowBackground, setIsShowBackground] = useState<boolean>(true);
  const [isShowDefaultText, setIsShowDefaultText] = useState<boolean>(true);
  const [background, setBackground] = useState<string>('');
  const defaultBackground = getPicture(pictureCalendarPic, 'background');
  const CalendarComponent = getCalendarComponent(calendarType);

  // 查询投票详情接口
  const {
    data: calendarDetail,
    loading,
    run: runQueryCalendarDetail
  } = useRequest(() => queryCalendarDetail(slug), {
    throwOnError: true
  });

  // 配置面板数据变化时，重新加载最新应用详情
  useUpdateEffect(() => {
    runQueryCalendarDetail();
  }, [isDataChanged, calendarType]);

  // 请求接口数据
  useUpdateEffect(() => {
    store.reducers.setCalendarApiProps(calendarApiProps);
    store.reducers.setCalendarPicture(pictureCalendarPic);
    if (!loading && calendarDetail) {
      store.reducers.setCalendarDetail(calendarDetail);
      setBackground(
        getPicture(calendarDetail?.picture ?? [], 'background') ?? ''
      );
      setIsShowBackground(calendarDetail?.show_background_image ?? true);
      setIsShowDefaultText(calendarDetail?.show_default_text ?? true);
    }
  }, [loading]);

  return (
    (!loading || null) && (
      <Wrapper
        backgroundImage={
          isShowBackground ? background || defaultBackground : ''
        }
      >
        {isShowDefaultText && <CalendarComponent />}
      </Wrapper>
    )
  );
};

export default CalendarPage;
