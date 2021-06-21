import styled from 'styled-components';

export interface WrapperProps {
  backgroundImage?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  background-color: #007d55;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #ffffff;
  padding: 0 20px;
  font-size: 20px;
  font-weight: 600;
  .date_year {
    font-weight: 400;
    font-size: 40px;
  }
`;
