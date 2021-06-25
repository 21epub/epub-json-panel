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
  .newYear_year {
    position: absolute;
    top: 102px;
    left: 142px;
    color: #ffffff;
    font-weight: bold;
    font-size: 24px;
  }

  .newYear_lunar_day {
    position: absolute;
    top: 176px;
    width: 58px;
    color: #ffffff;
    font-weight: bold;
    font-size: 54px;
    font-family: cursive;
  }

  .newYearDayWrapper {
    position: absolute;
    top: 102px;
    left: 238px;
    color: #ffffff;
    font-weight: bold;
    font-size: 24px;
  }
  .newYearZodiacWrapper {
    position: absolute;
    top: 92px;
    left: 222px;
    color: #b82425;
    font-weight: bold;
    font-size: 12px;
  }
`;
