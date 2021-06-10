import styled, { createGlobalStyle } from 'styled-components';

export interface WrapperProps {
  backgroundImage?: string;
}

export const GlobalStyle = createGlobalStyle`
  .PersonalModal{
    .ant-modal-body{
      height: 500px;
      overflow-y: scroll;
      padding-bottom: 0;
    }
    .ant-modal-footer {
      text-align: center;
    }
  }

  .myPersonalModal {
    .ant-modal-body{
      height: 610px;
    }
  }

  .RankingModal{
    color:blue;
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
  background-image: url(${(props) => props.backgroundImage});
  background-size: 100% 100%;

  .activityTimeNoLimit {
    position: absolute;
    top: 0;
    margin-top: 210px;
  }
`;
