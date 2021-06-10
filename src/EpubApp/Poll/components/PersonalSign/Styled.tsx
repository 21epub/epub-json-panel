import styled from 'styled-components';

export const Wrapper = styled.div``;

export const PersonalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .ant-space {
    .ant-space-item {
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
    }
  }

  .pictureDetails {
    max-height: 260px;
    overflow: auto;
  }
`;
