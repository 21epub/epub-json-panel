import styled from 'styled-components';

export interface WrapperProps {
  backgroundImage?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url(${(props) => props.backgroundImage});
  background-size: 100% 100%;

  .activityTimeNoLimit {
    position: absolute;
    top: 0;
    margin-top: 210px;
  }
`;
