import React, { FC } from 'react';
import type { ClockUrlListType, ClockPictureType } from '../../type';
import { getPicture } from '../../util';
import store from '../../store';
import { CalendarClock } from '../ClockCategory';
import { Wrapper } from './Styled';

export interface ClockPageProps {
  clockUrlList: ClockUrlListType;
  clockPicture: ClockPictureType;
  isDataChanged: boolean;
}

const ClockPage: FC<ClockPageProps> = (props) => {
  const { clockUrlList, clockPicture } = props;
  // console.log(props);
  const pictureList = clockPicture.calendarClockPicture;

  const background = getPicture([], 'background');
  const defaultBackground = getPicture(pictureList, 'background');

  store.reducers.setClockUrlList(clockUrlList);
  store.reducers.setPictureList(pictureList);

  return (
    <Wrapper backgroundImage={background || defaultBackground}>
      <CalendarClock />
    </Wrapper>
  );
};

export default ClockPage;
