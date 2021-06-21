import styled from 'styled-components';

export interface WrapperProps {
  backgroundImage?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  padding: 60px 36px 10px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  .yellow_year {
    position: absolute;
    top: 74px;
    color: #ddbb83;
    font-weight: bold;
    font-size: 40px;
  }

  .yellowDayWrapper {
    position: absolute;
    top: 164px;
    color: #d60020;
    font-size: 30px;
    .yellow_month {
      font-weight: bold;
    }
    .yellow_day {
      font-weight: bold;
      font-size: 100px;
    }
  }

  .yellowLunarDayWrapper {
    position: absolute;
    top: 174px;
    left: 58px;
    width: 20px;
    color: #d60020;
    font-weight: bold;
    font-size: 16px;
  }

  .yellowZodiacWrapper {
    position: absolute;
    top: 184px;
    left: 345px;
    width: 20px;
    color: #d60020;
    font-weight: bold;
    font-size: 16px;
  }

  .yellow_week {
    position: absolute;
    top: 340px;
    color: #d60020;
    font-weight: bold;
    font-size: 20px;
  }
`;
