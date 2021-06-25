import styled from 'styled-components';

export interface RankingBgWrapperProps {
  backgroundImage: string;
}

export const Wrapper = styled.div``;

export const RecordListWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  .ant-list-item-meta {
    align-items: center;
    text-align: left;
  }
  .ant-list-item {
    padding-left: 20px;
  }
`;

export const ParticipantsListWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;

  .ant-input-affix-wrapper {
    margin-bottom: 10px;
    border-radius: 20px;
    .ant-input {
      width: 78%;
      margin-left: 10px;
    }
    .ant-btn {
      background-color: #fff;
    }
  }
  .ant-row {
    margin-right: 0px !important;
    margin-left: 0px !important;
  }
  .ant-list-item {
    position: relative;
  }
  .ant-card-cover {
    position: relative;
    height: 150px;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .cardTitle {
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 24px;
      font-weight: bold;
      text-align: center;
      background: rgba(101, 101, 101, 0.3);
    }
  }
  .ant-card-body {
    padding: 0px;
  }
`;

export const RankingBgWrapper = styled.div<RankingBgWrapperProps>`
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 10;
  left: 6px;
  width: 30px;
  height: 40px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: 100% 100%;
  text-align: center;
  img {
    width: 70%;
    height: 70%;
    margin: 12%;
  }

  & > div {
    width: 26px;
    height: 26px;
    margin-top: 3px;
    color: #f05b42;
    line-height: 26px;
    text-align: center;
    background: #fff;
    border-radius: 50%;
  }
`;

export const ParticipantsInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 2px;
  .playerPollNum {
    color: #f05b42;
  }
`;
