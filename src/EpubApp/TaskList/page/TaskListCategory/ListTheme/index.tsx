import React, { useState } from 'react';
import { List, Space } from 'antd';
import { useRequest } from 'ahooks';
import { queryTask, addTaskRecord } from '../../../data/api';
import { getPicture } from '../../../util';
import type {
  TaskListImageType,
  FontColorType,
  TaskListApiPropsType,
  TaskListPictureType,
  TaskListEventType
} from '../../../type';
import RecordList from './RecordList';
import { Wrapper } from './Styled';

interface ListThemeType {
  model: any;
  taskListApiProps: TaskListApiPropsType;
  taskListPicture: TaskListPictureType;
  taskListEvent?: TaskListEventType;
}

const ListTheme: React.FC<ListThemeType> = (props) => {
  const { model, taskListEvent, taskListApiProps } = props;
  const {
    slug,
    picture,
    font_color,
    show_task_image,
    show_task_description,
    show_task_tag
  } = model.attributes.iDetail.taskListDetail ?? {};
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
      throwOnError: true,
      debounceInterval: 500
    }
  );

  // 根据变量数据，来返回激活状态，默认未激活。
  const getBtnState = (bind?: string) => {
    if (getVariableValue && bind) {
      return !!getVariableValue(bind);
    }
    return false;
  };

  const onButtonClick = (task_slug?: string, link?: string) => {
    // 打开一个新页面，等接口请求成功后，再设置新页面的url
    const url = link?.includes('//') ? link : `//${link}`;
    if (link && slug && task_slug) {
      addTaskRecord(slug, task_slug).then(() => {
        // 新建a标签，模拟a标签跳转新页面。绕过ios系统对window.open的拦截
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('target', '_blank');
        a.setAttribute('id', 'newPageBtn');
        // 防止反复添加
        if (document.getElementById('newPageBtn')) {
          document.body.removeChild(document.getElementById('newPageBtn')!);
        }
        document.body.appendChild(a);
        a.click();
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
              {show_task_image && (
                <div className='taskImg'>
                  <img
                    src={
                      (item?.task_img as TaskListImageType[])?.[0]?.picture ||
                      defaultTaskImg
                    }
                  />
                </div>
              )}
              <div className='taskDetail'>
                <List.Item.Meta
                  title={item?.task_title}
                  description={show_task_description && item?.task_description}
                />
                {show_task_tag && (
                  <Space size='small'>
                    <span>{item.task_type}</span>
                    <span>{item.task_tag}</span>
                  </Space>
                )}
              </div>
              <div className='taskBtnImg'>
                {getBtnState(item.bind) ? (
                  <img
                    src={
                      (item?.active_button_img as TaskListImageType[])?.[0]
                        ?.picture || defaultActiveButton
                    }
                    onClick={() =>
                      onButtonClick(item.slug, item?.active_button_link)
                    }
                  />
                ) : (
                  <img
                    src={
                      (item?.initial_button_img as TaskListImageType[])?.[0]
                        ?.picture || defaultInitialBtn
                    }
                    onClick={() =>
                      onButtonClick(item.slug, item?.initial_button_link)
                    }
                  />
                )}
              </div>
            </List.Item>
          )}
        />
      )}
      {isShowRecordModal && (
        <RecordList
          visible={isShowRecordModal}
          taskListApiProps={taskListApiProps}
          onCancel={onCloseModal}
        />
      )}
    </Wrapper>
  );
};

export default ListTheme;
