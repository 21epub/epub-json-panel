import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { List, Space } from 'antd';
import { useRequest } from 'ahooks';
import { queryTask, addTaskRecord } from '../../../data/api';
import { getPicture } from '../../../util';
import type { TaskListImageType, FontColorType } from '../../../type';
import { StateType } from '../../../store';
import RecordList from './RecordList';
import { Wrapper } from './Styled';

export interface ListThemeProps {}

const ListTheme: FC<ListThemeProps> = () => {
  const { taskListDetail, taskListEvent } = useSelector(
    (state: StateType) => state
  );
  // console.log(store.getState());
  const { slug, picture, font_color } = taskListDetail ?? {};
  const { getVariableValue } = taskListEvent ?? {};
  const [isShowRecordModal, setIsShowRecordModal] = useState<boolean>(false);
  const defaultTaskImg = getPicture(picture || [], 'taskImg');
  const defaultInitialBtn = getPicture(picture || [], 'initialButton');
  const defaultActiveButton = getPicture(picture || [], 'activeButton');

  // 获取任务列表数据
  const { data: taskRecordList, loading } = useRequest(
    () => queryTask(slug ?? ''),
    {
      ready: !!slug,
      throwOnError: true
    }
  );

  // 根据变量数据，来返回激活状态，默认未激活。
  const getBtnState = (bind?: string) => {
    if (getVariableValue && bind) {
      return !!getVariableValue(bind);
    }
    return false;
  };

  const onButtonClick = (
    type: 'initial' | 'active',
    task_slug?: string,
    link?: string
  ) => {
    if (type === 'initial' && link && slug && task_slug) {
      addTaskRecord(slug, task_slug).then(() => {
        window.open(link);
      });
    }
  };

  // 打开任务浏览记录
  const onShowRecordModal = () => {
    setIsShowRecordModal(true);
  };

  // 关闭浏览记录表
  const onCloseModal = () => {
    setIsShowRecordModal(false);
  };

  return (
    <Wrapper font_color={font_color as FontColorType}>
      <div className='taskRecordBtn' onClick={onShowRecordModal}>
        浏览记录
      </div>
      {!loading && (
        <List
          itemLayout='horizontal'
          dataSource={taskRecordList}
          renderItem={(item) => (
            <List.Item>
              <div className='taskImg'>
                <img
                  src={
                    (item?.task_img as TaskListImageType[])?.[0]?.picture ||
                    defaultTaskImg
                  }
                />
              </div>
              <div className='taskDetail'>
                <List.Item.Meta
                  title={item?.task_title}
                  description={item?.task_description}
                />
                <Space size='small'>
                  <span>{item.task_type}</span>
                  <span>{item.task_tag}</span>
                </Space>
              </div>
              <div className='taskBtnImg'>
                {getBtnState(item.bind) ? (
                  <img
                    src={
                      (item?.active_button_img as TaskListImageType[])?.[0]
                        ?.picture || defaultActiveButton
                    }
                    onClick={() =>
                      onButtonClick(
                        'active',
                        item.slug,
                        item?.active_button_link
                      )
                    }
                  />
                ) : (
                  <img
                    src={
                      (item?.initial_button_img as TaskListImageType[])?.[0]
                        ?.picture || defaultInitialBtn
                    }
                    onClick={() =>
                      onButtonClick(
                        'initial',
                        item.slug,
                        item?.initial_button_link
                      )
                    }
                  />
                )}
              </div>
            </List.Item>
          )}
        />
      )}
      {isShowRecordModal && (
        <RecordList visible={isShowRecordModal} onCancel={onCloseModal} />
      )}
    </Wrapper>
  );
};

export default ListTheme;
