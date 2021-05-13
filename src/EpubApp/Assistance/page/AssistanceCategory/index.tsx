import { Assistance } from './Assistance';

export const getAssistanceComponent = (assistanceType: string) => {
  // 助力应用列表
  const assistanceMap = {
    Assistance
  };

  return Reflect.get(assistanceMap, assistanceType) ?? Assistance;
};
