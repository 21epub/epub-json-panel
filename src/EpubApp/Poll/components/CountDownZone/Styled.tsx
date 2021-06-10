import styled from 'styled-components';

export interface WrapperProps {
  isTransparent?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 76%;
  height: 24%;
  background-color: ${(props) =>
    props.isTransparent ? 'transparent' : '#ffffff'};
  margin-top: 90%;
  margin-bottom: 4%;
  border-radius: 6px;

  .ant-row-middle {
    display: flex;
    flex-direction: column;

    .ant-col {
      width: 100%;
      text-align: center;
      .ant-space {
        height: 40px;
        .ant-space-item {
          b {
            margin-right: 5px;
            color: #f05b42;
            font-size: 26px;
          }
          .countDownSeconds {
            color: #3961f2;
          }

          .collect {
            display: flex;
            flex-direction: column;
            align-items: center;
            .dot {
              width: 6px;
              height: 6px;
              border-radius: 50%;
            }
            .redDot {
              background-color: #f05b42;
            }
            .yellowDot {
              background-color: #f7c155;
            }
            .blueDot {
              background-color: #3961f2;
            }
          }
        }
        .ant-space-item-split {
          height: 100%;
          .ant-divider-vertical {
            height: 100%;
          }
        }
      }
    }
  }
`;
