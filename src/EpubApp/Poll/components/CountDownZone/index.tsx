import React, { FC, useState } from 'react';
import { Col, Row, Divider, Space } from 'antd';
import { useCountDown, useUpdateEffect } from 'ahooks';
import { getCountDownObject } from '../../util';
import { Wrapper } from './Styled';
import { PollDetailType } from '../../type';
import moment from 'moment';

interface CountDownObjectType {
  status: string;
  text: string;
  compareTime: moment.Moment;
}

interface CountDownZoneProps {
  pollDetail?: PollDetailType;
}

const CountDownZone: FC<CountDownZoneProps> = (props) => {
  const { pollDetail } = props;
  const {
    participants,
    total_poll_sum,
    is_info_bg_transparent,
    start_time,
    end_time,
    poll_start_time,
    poll_end_time
  } = pollDetail ?? {};
  const [countDownObject, setCountDownObject] = useState<CountDownObjectType>();

  // eslint-disable-next-line
  const [_countdown, setTargetDate, formattedRes] = useCountDown();
  const { days, hours, minutes, seconds } = formattedRes;

  useUpdateEffect(() => {
    if (pollDetail) {
      const timeStringGroup = {
        enrollStartTimeString: start_time || '',
        enrollEndTimeString: end_time || '',
        pollStartTimeString: poll_start_time || '',
        pollEndTimeString: poll_end_time || ''
      };
      const { status, text, compareTime } = getCountDownObject(timeStringGroup);
      setTargetDate(compareTime.valueOf());
      setCountDownObject({ status, text, compareTime });
    }
  }, [pollDetail]);

  return (
    <Wrapper isTransparent={pollDetail ? is_info_bg_transparent : false}>
      <Row align='middle'>
        <Col span={24}>
          <Divider>{countDownObject?.text}</Divider>
        </Col>
        <Col span={24}>
          <Space size='large'>
            <span>
              <b>{days}</b>天
            </span>
            <span>
              <b>{hours}</b>时
            </span>
            <span>
              <b>{minutes}</b>分
            </span>
            <span>
              <b className='countDownSeconds'>{seconds}</b>秒
            </span>
          </Space>
        </Col>
        <Col span={24}>
          <Space size='large' split={<Divider type='vertical' />}>
            <div className='collect'>
              <div className='dot redDot' />
              参与量
              <br />
              {participants || 0}
            </div>
            <div className='collect'>
              <div className='dot yellowDot' />
              总票数
              <br />
              {total_poll_sum || 0}
            </div>
            <div className='collect'>
              <div className='dot blueDot' />
              活动状态
              <br />
              {countDownObject?.status || '未开始'}
            </div>
          </Space>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default CountDownZone;
