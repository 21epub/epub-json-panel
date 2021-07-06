import styled, { createGlobalStyle } from 'styled-components';

export interface WrapperProps {
  backgroundColor?: string;
}

export const GlobalStyle = createGlobalStyle`
`;

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: url(${(props) => props.backgroundColor});
`;
