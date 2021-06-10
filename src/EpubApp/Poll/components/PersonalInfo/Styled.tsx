import styled from 'styled-components';

interface PersonalInfoWrapper {
  isSelf: boolean;
}

export const PersonalInfoWrapper = styled.div<PersonalInfoWrapper>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .ant-divider {
    margin: 16px 0;
  }

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
    width: 74%;
    max-height: ${(props) => (props.isSelf ? '436px' : '336px')};
    overflow-y: auto;

    .ant-space-item {
      width: 100%;
      .ant-image {
        .ant-image-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }

    .ant-space-item:first-child {
      width: 100%;
      text-align: center;
    }
  }
`;
