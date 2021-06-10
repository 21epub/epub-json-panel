import { PollType } from '../../type';
import PicturePoll from './PicturePoll';

// 获取对应类型的投票应用
export const getPollComponent = (pollType: PollType) => {
  // 投票应用列表
  const pollMap = {
    PicturePoll
  };

  return Reflect.get(pollMap, pollType) ?? PicturePoll;
};
