import { getDaysSuffix, getPicture, getPictureList } from './index';

describe('测试日历util方法', () => {
  it('输入图片组，返回正确的图片组', () => {
    expect(getPictureList({}, 'YellowOneCalendar')).toBeUndefined();
  });
  it('输入图片组，返回正确的图片url', () => {
    expect(getPicture([], 'test')).toBeUndefined();
  });
  it('输入日期，返回正确的英文后缀', () => {
    expect(getDaysSuffix(1)).toBe('st');
    expect(getDaysSuffix(2)).toBe('nd');
    expect(getDaysSuffix(3)).toBe('tr');
    expect(getDaysSuffix(4)).toBe('th');
  });
});
