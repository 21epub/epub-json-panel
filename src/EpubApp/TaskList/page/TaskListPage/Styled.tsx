import styled, { createGlobalStyle } from 'styled-components';

export interface WrapperProps {
  backgroundColor?: string;
}

export const GlobalStyle = createGlobalStyle`
  .RankingModal{
    color:red;
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
        height: 560px;
        padding: 0px 10px 10px;
        .ant-tabs-tabpane{
          height:490px;
          /* overflow-y: scroll; */
          text-align: center;
        }
      }
    }
  }
`;

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${(props) => props.backgroundColor};
  padding: 2px;
`;
