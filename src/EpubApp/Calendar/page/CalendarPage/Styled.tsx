import styled, { createGlobalStyle } from 'styled-components';

export interface WrapperProps {
  backgroundImage?: string;
}

export const GlobalStyle = createGlobalStyle`
`;

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url(${(props) => props.backgroundImage});
  background-size: 100% 100%;
`;
