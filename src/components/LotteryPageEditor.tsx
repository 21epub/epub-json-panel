import * as React from 'react'
import styles from './index.module.less'
import TurntableEditor from './editor/TurntableEditor'
interface Props {
  remainTimes: number | null
}

const LotteryPageEditor = ({ remainTimes }: Props) => {
  const state = {
    prizeList: [
      {
        remain_nums: 5,
        id: '111',
        title: '一等奖',
        description: 'labore Duis ex voluptate cupidatat',
        total_num: 5,
        picture: 'est officia in',
        created: 'Excepteur velit ullamco commodo',
        ranking: 'nisi dolore',
        color: '#fef8e6'
      },
      {
        remain_nums: 5,
        id: '222',
        title: '二等奖',
        description: 'ut labore',
        total_num: 5,
        picture: 'enim reprehenderit dolore ea consequat',
        created: 'proident labore irure eu',
        ranking: 'est',
        color: '#fff'
      },
      {
        remain_nums: 5,
        id: '333',
        title: '三等奖',
        description: 'aute ad pariatur elit',
        total_num: 5,
        picture: 'ullamco officia elit',
        created: 'aliqua laborum reprehenderit',
        ranking: 'Ut adipisicing pariatur magna',
        color: '#fef8e6'
      },
      {
        remain_nums: 5,
        id: '444',
        title: '四等奖',
        description: 'ceshi',
        total_num: 5,
        picture: 'esse incididunt sit pariatur',
        created: 'ut nisi sin',
        ranking: '二等奖',
        color: '#fff'
      },
      {
        remain_nums: 5,
        id: '555',
        title: '五等奖',
        description: 'eu esse qui sit',
        total_num: 100,
        picture: 'nulla dolore mollit sint',
        created: 'te',
        ranking: 'ea cillum anim',
        color: '#fef8e6'
      },
      {
        remain_nums: 5,
        id: '666',
        title: '六等奖',
        description: 'ceshi2',
        total_num: 100,
        picture: 'esse incididunt sit pariatur',
        created: 'ut nisi sin',
        ranking: '奖',
        color: '#fff'
      }
    ]
  }
  return (
    <div className={styles.LotteryPageEditor}>
      <img
        className='bgImg'
        src='http://dev.epub360.com/staticfs2/diazo/images/lottery/bg.png'
      />
      <div className='turntableContent'>
        <img
          className='headImg'
          src='http://dev.epub360.com/staticfs2/diazo/images/lottery/head.png'
        />
        <div className='topTime'>
          <p className='remainTimes'>活动时间：2020-01-01～2020-01-02</p>
        </div>
        <div className='turntableWrap'>
          <TurntableEditor state={state} />
        </div>
        <div className='bottomInfo'>
          <p className='remainTimes'>
            您还剩余{remainTimes === null ? '?' : remainTimes}次抽奖机会
          </p>
          <img
            className='prize'
            src='http://dev.epub360.com/staticfs2/diazo/images/lottery/myPrize.png'
          />
          <img
            className='rule'
            src='http://dev.epub360.com/staticfs2/diazo/images/lottery/rule.png'
          />
        </div>
        <p className='award'>恭喜小李抽中一等奖 2020/09/10 14:20</p>
      </div>
    </div>
  )
}

export default LotteryPageEditor
