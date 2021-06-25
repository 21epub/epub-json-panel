import styled from 'styled-components';

export interface WrapperProps {
  backgroundImage?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  padding: 14px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  .refreshing_year {
    position: absolute;
    top: 18px;
    color: #ffffff;
    font-weight: bold;
    font-size: 50px;
  }

  .refreshingDayWrapper {
    position: absolute;
    top: 108px;
    color: #81ab39;
    font-weight: bold;
    font-size: 30px;
  }

  .refreshingLunarDateWrapper {
    position: absolute;
    top: 32px;
    left: 26px;
    color: #81ab39;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }

  .refreshing_lunar_day {
    position: absolute;
    top: 56px;
    left: 24px;
    width: 88px;
    color: #81ab39;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }

  .refreshing_en_week {
    position: absolute;
    top: 30px;
    left: 242px;
    width: 88px;
    color: #81ab39;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }

  .refreshing_week {
    position: absolute;
    top: 56px;
    left: 242px;
    width: 88px;
    color: #81ab39;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }
`;
