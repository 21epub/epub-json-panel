import styled from 'styled-components';
import type { FontColorType } from '../../../type';

export interface WrapperProps {
  font_color?: FontColorType;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  padding: 0px 16px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;

  .taskRecordBtn {
    width: 100%;
    height: 24px;
    color: #909090;
    text-align: right;
    text-decoration: underline;
    margin-top: 10px;
  }

  .ant-list {
    width: 100%;

    .ant-list-items {
      margin: 0;

      .ant-list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .ant-list-item-meta-title {
          margin: 0px;
          overflow-wrap: break-word;
        }

        & > div {
          margin: 0px 4px;
        }

        .taskImg {
          width: 80px;
          height: 80px;
        }

        .taskDetail {
          width: 50%;
          .ant-list-item-meta-title {
            color: ${(props) => props.font_color?.title};
          }
          .ant-list-item-meta-description {
            color: ${(props) => props.font_color?.description};
          }
          .ant-space-item {
            color: ${(props) => props.font_color?.tag};
          }
        }

        .taskBtnImg {
          width: 60px;
          height: 30px;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
`;

export const RecordListWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  .ant-list-item-meta {
    align-items: center;
    text-align: left;
  }
  .ant-list-item {
    padding-left: 20px;
  }
`;
