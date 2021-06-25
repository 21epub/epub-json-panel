import styled from 'styled-components';

export interface WrapperProps {
  backgroundImage?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  padding: 6px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  .yellowTwo_year {
    position: absolute;
    top: 0px;
    color: #284b6d;
    font-size: 22px;
  }

  .yellowTwoDayWrapper {
    position: absolute;
    top: 4px;
    color: #284b6d;
    font-weight: bold;
    font-size: 30px;
    .yellowTwoMonthWrapper {
      .yellowTwo_month {
        height: 42px;
        font-weight: bold;
        text-align: center;
      }
    }
    .yellowTwo_day {
      font-weight: bold;
      font-size: 110px;
    }
  }

  .yellowTwo_week {
    position: absolute;
    top: 148px;
    color: #284b6d;
    font-weight: bold;
    font-size: 26px;
  }
`;
