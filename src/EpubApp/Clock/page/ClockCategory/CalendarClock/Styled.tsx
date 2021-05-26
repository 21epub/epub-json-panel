import styled from 'styled-components';

export interface CalendarWrapperProps {
  height: string;
}

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  width: 100%;
  height: 100%;
  .clockRecord {
    position: absolute;
    top: 24%;
  }
  .ant-space {
    position: absolute;
    top: 76%;
  }
  .participateNumber {
    position: absolute;
    top: 84%;
  }
  .BorderDrawer {
    position: absolute;
    top: 71%;
    width: 80%;
    height: 12px;
    background-color: #ff6450;
    border-radius: 10px;
    box-shadow: 0px 1px 4px 0px #333;
  }
`;

export const CalendarWrapper = styled.div<CalendarWrapperProps>`
  position: absolute;
  bottom: 28%;
  width: 80%;
  height: ${(props) => props.height || '42%'};
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: height 1s;
  .drawerButton {
    position: absolute;
    top: 6px;
    left: 50%;
    z-index: 20;
    width: 40px;
    height: 5px;
    margin-left: -20px;
    background-color: #cdcecf;
    border-radius: 10px;
    cursor: pointer;
  }
`;
