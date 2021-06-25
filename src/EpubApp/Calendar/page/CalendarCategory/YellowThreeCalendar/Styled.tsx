import styled from 'styled-components';

export interface WrapperProps {
  backgroundImage?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;

  .yellowThreeMonthWeekWrapper {
    color: #d1bea6;
    font-weight: bold;
    font-size: 30px;
    text-align: center;

    & > .ant-space-item:nth-child(1) {
      height: 22px;
    }
    .yellowThree_en_month {
      font-size: 16px;
    }
    .yellowThree_en_week {
      font-size: 16px;
    }
  }

  .yellowThreeDateWrapper {
    margin-top: -26px;
    color: #d1bea6;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    & > .ant-space-item:nth-child(1) {
      height: 58px;
    }
    .yellowThree_day {
      font-size: 50px;
      font-family: cursive;
    }
  }
`;
