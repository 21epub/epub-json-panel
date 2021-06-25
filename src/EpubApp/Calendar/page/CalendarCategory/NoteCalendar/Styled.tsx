import styled from 'styled-components';

export interface WrapperProps {
  backgroundImage?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  padding: 122px 30px 48px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  .NoteDateWrapper {
    position: absolute;
    top: 146px;
    color: #b7242b;
    font-size: 20px;
  }

  .NoteDayWrapper {
    position: absolute;
    top: 160px;
    height: 160px;
    color: #b7242b;
    font-weight: bold;
    font-size: 20px;
    .ant-space-item:nth-child(2) {
      height: 172px;
    }
    .Note_day {
      font-size: 140px;
    }
  }

  .NoteLunarDayWeekWrapper {
    position: absolute;
    top: 374px;
    left: 232px;
    width: 80px;
    color: #d60020;
    font-weight: bold;
    font-size: 12px;
    text-align: center;
  }
`;
