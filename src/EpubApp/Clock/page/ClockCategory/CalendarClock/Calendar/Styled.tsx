import styled from 'styled-components';

export interface AntCalendarWrapperProps {
  top: string;
}

export const AntCalendarWrapper = styled.div<AntCalendarWrapperProps>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 14px 14px 0px 0px;
  overflow: hidden;
  z-index: 10;

  .borderTop {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 30;
    width: 100%;
    height: 10px;
    background-color: #ffffff;
  }

  .ant-picker-calendar {
    position: absolute;
    top: ${(props) => props.top || '0px'};
    transition: top 1s;
    .ant-picker-panel {
      .ant-picker-content {
        margin: 0px;
      }
    }
  }
`;

export const HeaderWrapper = styled.div`
  padding: 14px 8px 8px;
  text-align: center;
  .ant-typography {
    margin: 0px;
  }
`;

export const DateFullCellWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .clockDate,
  .todayClock {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 24px;
    height: 24px;
    color: #fff;
    direction: ltr;
    background: #ed694a;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    border-radius: 50%;
    border-collapse: separate;
    transition: all 0.3s;
  }

  .clockDate:after {
    position: absolute;
    top: 44%;
    left: 30%;
    display: table;
    width: 5.71428571px;
    height: 11.14285714px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) scale(1) translate(-50%, -50%);
    opacity: 1;
    transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    content: ' ';
  }

  .noClockDate {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: #fff;
    background: #b4b5b6;
    border-radius: 50%;
  }
`;
