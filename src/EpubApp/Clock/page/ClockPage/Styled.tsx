import styled, { createGlobalStyle } from 'styled-components';

// 全局样式
export const GlobalStyle = createGlobalStyle`
  .clockRankingModal {
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

        .ant-tabs-content {
          height: 400px;
          .ant-tabs-tabpane{
            .ant-list {
              height: 100%;
              overflow-y: scroll;
              .ant-list-item {
                padding: 0 0 0 20px;
              }
              .ant-list-item-meta {
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
`;

export interface WrapperProps {
  backgroundImage?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url(${(props) => props.backgroundImage});
  background-size: 100% 100%;

  .activityTimeNoLimit {
    position: absolute;
    top: 0;
    margin-top: 210px;
  }
`;
