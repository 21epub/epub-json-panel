import styled from 'styled-components';

export interface WrapperProps {
  backgroundImage?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  height: 100%;
  touch-action: none;
  background-color: rgba(250, 215, 117, 1);

  .ant-spin-spinning {
    position: relative;
    top: 100px;
    left: -31px;
    margin: 50%;
  }
`;
