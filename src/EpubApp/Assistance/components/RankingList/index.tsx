import React, { FC, Fragment } from 'react';
import { useRequest } from 'ahooks';
import { QueryRankingList } from '../../data/api';
import { Wrapper } from './Styled';

interface RankingListProps {
  aslug?: string;
  oslug?: string;
}

const RankingList: FC<RankingListProps> = (props) => {
  const { aslug = '', oslug = '' } = props;
  const { data: RankingListValue } = useRequest(
    () => QueryRankingList(aslug, oslug),
    {
      throwOnError: true
    }
  );

  const Tip = () => {
    return (
      <thead>
        <tr>
          <th>暂无数据</th>
        </tr>
      </thead>
    );
  };

  // 首页内容
  return (
    <Wrapper>
      <div className='c-div DIV_sVS1zF'>
        <i className='fa fa-bar-chart-o c-icon' />
        <p className='c-paragraph P_PedtjQ'>排行榜：</p>
      </div>
      <div className='c-div DIV_PJeoHZ'>
        <table className='table table-m bootom-border TABLE_mReX08'>
          {RankingListValue?.[0] ? (
            <Fragment>
              <thead>
                <tr>
                  <th />
                  <th>头像</th>
                  <th>昵称</th>
                  <th>助力数</th>
                </tr>
              </thead>
              <tbody>
                {RankingListValue?.map((item: any, index: number) => {
                  if (index >= 10) return null; // 用于限制显示的条数
                  return (
                    item && (
                      <tr className='TR_4Sk8Ik' key={index}>
                        <th scope='row'>{index + 1}</th>
                        <td>
                          <div
                            className='c-inlineblock c-imageblock DIV_yIKrnU'
                            style={{
                              backgroundSize: '100% 100%',
                              backgroundPosition: ' 0% 0%',
                              backgroundRepeat: 'no-repeat',
                              backgroundImage:
                                'url(' + item.initiator_avatar + ')'
                            }}
                          />
                        </td>
                        <td>
                          <span className='SPAN_pItcrQ'>
                            {item.initiator_name || item.initiator_username}
                          </span>
                        </td>
                        <td>{item.real_score}</td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </Fragment>
          ) : (
            <Tip />
          )}
        </table>
      </div>
    </Wrapper>
  );
};

export default RankingList;
