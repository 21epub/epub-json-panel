import styled from 'styled-components';

export interface WrapperProps {
  backgroundImage?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  padding: 60px 36px 70px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #c32125;

  .yellowFour_month {
    margin-top: 30px;
    font-weight: bold;
    font-size: 20px;
  }

  .yellowFour_day {
    font-weight: bold;
    font-size: 70px;
    line-height: 60px;
  }

  .yellowFour_week {
    margin-top: 10px;
    font-weight: bold;
    font-size: 20px;
  }

  .yellowFourLunarDayWrapper {
    margin-top: 5px;
    font-weight: bold;
    font-size: 12px;
  }
`;
