import styled from 'styled-components';

export interface WrapperProps {
  backgroundImage?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  padding: 6px 40px 8px 20px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #ffe9da;

  .yellowFive_month {
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
  }
  .yellowFive_day {
    font-weight: bold;
    font-size: 50px;
  }
  .yellowFive_week {
    font-weight: bold;
    font-size: 14px;
  }
`;
