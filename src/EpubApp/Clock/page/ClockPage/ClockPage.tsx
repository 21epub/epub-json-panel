import React, { FC, useEffect, useState } from 'react';
import { useRequest, useUpdateEffect } from 'ahooks';
import type {
  ClockApiPropsType,
  ClockPictureType,
  ClockEventType
} from '../../type';
import { UserInfoModal } from '../../components';
import { getPicture } from '../../util';
import { queryClockDetail } from '../../data/api';
import store from '../../store';
import { CalendarClock } from '../ClockCategory';
import { Wrapper } from './Styled';

export interface ClockPageProps {
  clockApiProps: ClockApiPropsType;
  clockPicture: ClockPictureType;
  clockEvent?: ClockEventType;
  isDataChanged?: boolean;
}

const ClockPage: FC<ClockPageProps> = (props) => {
  const { clockApiProps, clockPicture, clockEvent, isDataChanged } = props;
  const pictureList = clockPicture.calendarClockPicture;
  const { slug } = clockApiProps;
  const [background, setBackground] = useState<string>('');
  const [isShowBackground, setIsShowBackground] = useState<boolean>(true);
  const defaultBackground = getPicture(pictureList, 'background');

  // 查询签到详情接口
  const {
    data: ClockDetail,
    loading,
    run: runQueryClockDetail
  } = useRequest(() => queryClockDetail(slug));

  // 配置面板数据变化时，重新加载最新应用详情
  useUpdateEffect(() => {
    runQueryClockDetail();
  }, [isDataChanged]);

  // 请求接口数据
  useEffect(() => {
    if (!loading && ClockDetail && clockEvent) {
      setBackground(getPicture(ClockDetail?.picture ?? [], 'background') ?? '');
      setIsShowBackground(ClockDetail?.show_background_image);
      store.reducers.setClockApiProps(clockApiProps);
      store.reducers.setPictureList(pictureList);
      store.reducers.setClockEvent({ ...clockEvent, runQueryClockDetail });
      store.reducers.setClockDetail(ClockDetail);
    }
  }, [loading]);

  return (
    <Wrapper
      backgroundImage={isShowBackground ? background || defaultBackground : ''}
    >
      {!loading && <CalendarClock />}
      <UserInfoModal />
    </Wrapper>
  );
};

export default ClockPage;
