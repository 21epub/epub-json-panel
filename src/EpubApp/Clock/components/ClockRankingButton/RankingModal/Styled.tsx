import styled from 'styled-components';

export const Wrapper = styled.div`
  .ant-modal {
    width: 80% !important;
    .ant-modal-content {
      .ant-modal-header {
        padding: 5px;
      }
      .ant-modal-close {
        .ant-modal-close-x {
          height: 36px;
          line-height: 36px;
        }
      }
      .ant-modal-body {
        height: 460px;
        padding: 0px 10px 10px;

        .ant-list-item-meta {
          align-items: center;
        }
      }
    }
  }
`;
