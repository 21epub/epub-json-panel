import React, { useCallback, useState } from 'react';
import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload/interface';
import { useRequest } from 'ahooks';
import { Wrapper } from './Styled';
import { uploadPollPicture } from '../../../data/api';

export type FormImageProps = UploadProps & {
  book_slug?: string;
  value?: string;
  onChange?: (value?: string) => void;
};

// 上传图片和附件组件，格式化数据
export function checkUploadFileFormat(type = '', accept: string[] = []) {
  const arr = type.split('.');
  if (arr.length < 2) {
    return false;
  }
  const fileType = arr[arr.length - 1].toLowerCase();
  return accept.some((item) => item.toLowerCase().indexOf(fileType) > -1);
}

// 上传图片组件
const FormImage: React.FC<FormImageProps> = (props) => {
  const { book_slug, value, onChange, ...rest } = props;
  const [imageUrl, setImageUrl] = useState<string>(value || '');
  // 可上传图片格式
  const accept = ['jpg', 'jpeg', 'png', 'gif'];

  // 上传图片接口
  const { loading, run } = useRequest(
    (image) => uploadPollPicture(book_slug ?? '', image),
    {
      // ready: !!book_slug,
      manual: true,
      throwOnError: true,
      onSuccess: (res) => {
        setImageUrl(res);
        onChange && onChange(res);
      },
      onError: () => {
        message.error('图片上传失败');
      }
    }
  );

  // 上传图片
  const uploadImage = useCallback(
    async (options) => {
      const { file } = options;

      // 检查图片格式
      if (!checkUploadFileFormat(file.name, accept)) {
        message.error('图片格式不正确，请重新选择');
        return false;
      }

      // 检测图片大小
      if (file.size > 2 * 1024 * 1024) {
        message.error('上传图片不能超过2M');
        return false;
      }

      const formData = new FormData();
      formData.append('image', file);
      run(formData);
      return true;
    },
    [accept, onChange, value]
  );

  return (
    <Wrapper>
      <Upload
        className='avatar-uploader'
        listType='picture-card'
        showUploadList={false}
        customRequest={uploadImage}
        maxCount={1}
        {...rest}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>点击上传图片</div>
          </div>
        )}
      </Upload>
    </Wrapper>
  );
};

export default FormImage;
