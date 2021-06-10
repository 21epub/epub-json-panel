import React, { FC, useEffect, useState } from 'react';
import { useRequest, useUpdateEffect } from 'ahooks';
import { message } from 'antd';
import moment from 'moment';
import type {
  ClockApiPropsType,
  ClockPictureType,
  ClockEventType
} from '../../type';
import { UserInfoModal } from '../../components';
import { getPicture } from '../../util';
import { queryClockDetail } from '../../data/api';
import store from '../../store';
import { getClockComponent } from '../ClockCategory';
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
  const ClockComponent = getClockComponent('CalendarClock');

  // 查询签到详情接口
  const { data: ClockDetail, loading, run: runQueryClockDetail } = useRequest(
    () => queryClockDetail(slug),
    {
      throwOnError: true
    }
  );

  // 配置面板数据变化时，重新加载最新应用详情
  useUpdateEffect(() => {
    runQueryClockDetail();
  }, [isDataChanged]);

  // 请求接口数据
  useEffect(() => {
    if (!loading && ClockDetail) {
      if (clockEvent) {
        // 判断是否在活动时间内
        const beforeTime = moment(
          ClockDetail.start_time,
          'YYYY-MM-DD hh:mm:ss'
        );
        const afterTime = moment(ClockDetail.end_time, 'YYYY-MM-DD hh:mm:ss');
        const now = moment(
          moment().locale('zh-cn').format('YYYY-MM-DD HH:mm'),
          'YYYY-MM-DD hh:mm:ss'
        );
        if (now.isBefore(beforeTime)) {
          message.error('活动未开始，请耐心等待！');
          store.reducers.setIsClickable(false);
        } else if (now.isAfter(afterTime)) {
          message.error('活动已结束，感谢参与！');
          store.reducers.setIsClickable(false);
        }
      }
      setBackground(getPicture(ClockDetail?.picture ?? [], 'background') ?? '');
      setIsShowBackground(ClockDetail?.show_background_image);
      store.reducers.setClockApiProps(clockApiProps);
      store.reducers.setPictureList(pictureList);
      store.reducers.setClockEvent(
        clockEvent && { ...clockEvent, runQueryClockDetail }
      );
      store.reducers.setClockDetail(ClockDetail);
    }
  }, [loading]);

  return (
    <Wrapper
      backgroundImage={isShowBackground ? background || defaultBackground : ''}
    >
      {!loading && <ClockComponent />}
      <UserInfoModal />
    </Wrapper>
  );
};

export default ClockPage;
