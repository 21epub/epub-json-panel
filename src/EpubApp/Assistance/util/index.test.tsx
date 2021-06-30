import { GetRequest, getPicture } from './index';

describe('测试日历util方法', () => {
  // it('输入url链接，返回链接里的参数对象', () => {
  //   const url =
  //     'http://test.epub360.com/v3/manage/book/532pea/preview?-build=1&page_6e736b18f7331b5a7a84766c147bb94120210629141034323=Objective%3D8e69e9fbfcb54ed3978be219a00c3f96%26Activity%3D3f1b95d1ca044432a71ddf224ebe6280';
  //   expect(GetUrlRequest(url)).toEqual({
  //     '-build': expect.any(String),
  //     page_6e736b18f7331b5a7a84766c147bb94120210629141034323: expect.any(String)
  //   });
  // });

  it('输入参数字符串，返回参数对象', () => {
    const url =
      'Objective=8e69e9fbfcb54ed3978be219a00c3f96&Activity=3f1b95d1ca044432a71ddf224ebe6280';
    expect(GetRequest(url)).toEqual(
      expect.objectContaining({
        Activity: expect.any(String),
        Objective: expect.any(String)
      })
    );
  });

  it('输入图片组，返回正确的图片url', () => {
    expect(getPicture([], 'test')).toBeUndefined();
  });
});
