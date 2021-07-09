import React, { FC } from 'react';
import {
  Modal,
  Avatar,
  Divider,
  Image,
  Space,
  Typography,
  Button,
  message
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRequest, useUpdateEffect } from 'ahooks';
import { PersonalInfoWrapper } from './Styled';
import { querySignDetail, createPollRecord } from '../../data/api';
import store from '../../store';

interface PersonalInfoProps {
  isSelf?: boolean;
  sign_slug: string;
  slug?: string;
  visible: boolean;
  onCancel: () => void;
}

// 个人参赛详情页
const PersonalInfo: FC<PersonalInfoProps> = (props) => {
  const { isSelf, sign_slug, slug, onCancel, ...rest } = props;
  const [state] = store.useRxjsStore();
  const { pollEvent } = state;

  // 查询本人记录
  const {
    data: signDetail,
    loading: signDetailLoading,
    run: runQuerySignDetail
  } = useRequest(() => querySignDetail(slug ?? '', sign_slug), {
    ready: !!slug && !!sign_slug,
    throwOnError: true
  });

  // 新建投票记录
  const { loading: pollRecordLoading, run: runCreatePollRecord } = useRequest(
    () => createPollRecord(slug ?? '', sign_slug),
    {
      ready: !!slug,
      manual: true,
      throwOnError: true,
      onSuccess: () => {
        message.success('投票成功');
        // 投票成功后，查询并显示最新数据
        runQuerySignDetail();
        if (pollEvent) {
          pollEvent.onPollSuccess();
        }
      },
      onError: (err: any) => {
        if (pollEvent) {
          pollEvent.onPollFail();
        }
        message.error(err?.response?.data?.non_field_errors?.[0]);
      }
    }
  );

  useUpdateEffect(() => {
    runQuerySignDetail();
  }, [sign_slug]);

  return (
    <Modal
      centered
      className={`PersonalModal ${isSelf && 'myPersonalModal'}`}
      footer={
        !isSelf
          ? [
              <Button
                key='submit'
                type='primary'
                loading={pollRecordLoading}
                onClick={runCreatePollRecord}
              >
                为TA投票
              </Button>
            ]
          : null
      }
      destroyOnClose
      onCancel={onCancel}
      {...rest}
    >
      {!signDetailLoading && (
        <PersonalInfoWrapper isSelf={!!isSelf}>
          <Avatar
            size='large'
            icon={<UserOutlined />}
            src={signDetail?.initiator_avatar}
          />
          <Typography.Title level={5}>
            {signDetail?.initiator_name || signDetail?.initiator_username}
          </Typography.Title>
          <Space size='large' split={<Divider type='vertical' />}>
            <div>
              <b>{signDetail?.player_number}</b>
              编号
            </div>
            <div>
              <b>{signDetail?.player_rank}</b>
              排名
            </div>
            <div>
              <b>{signDetail?.player_poll_num}</b>
              票数
            </div>
          </Space>
          <Divider />
          <Space className='pictureDetails' align='start' direction='vertical'>
            <Typography.Text style={{ textAlign: 'center' }}>
              {signDetail?.sign_title || 111}
            </Typography.Text>
            <Typography.Text>
              <b>简介：</b>
              {signDetail?.introduction}
            </Typography.Text>
            <Typography.Text>
              <b>参赛图片：</b>
            </Typography.Text>
            <Image width={200} height={200} src={signDetail?.cover} />
            <Typography.Text>
              <b>其他信息：</b>
              {signDetail?.description}
            </Typography.Text>
          </Space>
        </PersonalInfoWrapper>
      )}
    </Modal>
  );
};

export default PersonalInfo;
