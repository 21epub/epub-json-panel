import React, { FC, useState, useEffect } from 'react';
import { Modal, message } from 'antd';
import moment from 'moment';
import { isNumber } from 'lodash';
import { useRequest, useUpdateEffect } from 'ahooks';
import store from '../../store';
import { getPicture } from '../../util';
import { addClockRecord, queryUserInfo } from '../../data/api';
import { Wrapper } from './Styled';

interface ClockNowButtonProps {}

const ClockNowButton: FC<ClockNowButtonProps> = () => {
  const [state] = store.useRxjsStore();
  const {
    pictureList,
    clockDetail,
    clockEvent,
    clockRecord,
    isClickable
  } = state;
  const [clockNowPic, setClockNowPic] = useState<string>('');
  const today = moment().format('YYYY-MM-DD');
  const defaultClockNowPic = getPicture(pictureList, 'clockNow');

  //  签到接口
  const { data: clockRecordValue, run } = useRequest(
    () => addClockRecord(clockDetail?.slug ?? ''),
    {
      ready: !!clockDetail?.slug && !!clockEvent,
      manual: true,
      onSuccess: (res) => {
        if (clockDetail && clockEvent?.runQueryClockDetail) {
          clockEvent.onClockSuccess();
          clockEvent.runQueryClockDetail();
          Modal.success({
            title: '签到成功',
            content: '恭喜您签到成功',
            onOk() {
              // 满足目标则触发对应的触发器
              if (
                isNumber(clockDetail?.total_clock_target_num) &&
                res.keep_clock_num_each_one >=
                  clockDetail?.total_clock_target_num
              ) {
                clockEvent.onTotalClockSuccess();
              } else if (
                isNumber(clockDetail?.keep_clock_target_num) &&
                res.keep_clock_num_each_one >=
                  clockDetail?.keep_clock_target_num
              ) {
                clockEvent.onKeepClockSuccess();
              }

              if (clockDetail?.slug && clockDetail.need_user_info) {
                queryUserInfo(clockDetail?.slug).then((response) => {
                  // 判断是否有用户信息，若有则无需再次添加
                  if (!response.user_id) {
                    store.reducers.setIsShowUserInfoModal(true);
                  }
                });
              }
            }
          });
        }
      },
      onError: (err: any) => {
        if (clockEvent) clockEvent.onClockFail();
        message.error(err.response.data[0]);
      }
    }
  );

  // 点击立即打卡
  const onClick = () => {
    if (isClickable) {
      run();
    } else {
      message.error('不在活动时间内');
    }
  };

  useEffect(() => {
    if (clockDetail) {
      setClockNowPic(getPicture(clockDetail?.picture ?? [], 'clockNow') ?? '');
      if (clockRecord) {
        // 若在播放器中，开启了自动签到，且当天没有签到过，则加载页面完成就直接签到
        const isIncludeToday = clockRecord[0]?.already_clock.find(
          (item: string) => item === today
        );
        if (clockEvent && clockDetail?.auto_clock && !isIncludeToday) {
          run();
        }
      }
    }
  }, [clockDetail, clockRecord]);

  useUpdateEffect(() => {
    if (clockRecordValue) {
      store.reducers.setClockRecord([clockRecordValue]);
    }
  }, [clockRecordValue]);

  return (
    <Wrapper className='clockNowButton'>
      <img
        className='clockNowButtonImg'
        src={clockNowPic || defaultClockNowPic}
        onClick={onClick}
      />
    </Wrapper>
  );
};

export default ClockNowButton;
