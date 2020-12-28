interface ObjectiveProps {
  id: string
  title: string
  description: string
  picture: string
  ranking: string
}
/* eslint-disable */
interface SinglePrizeProps {
  id: string
  initiator_id: number
  initiator_username: string
  initiator_name: string
  initiator_avatar: string
  created: string
  objective: ObjectiveProps
}

interface SingleLotteryProps {
  type: string
  info_fields_list: string[] | null
  title: string
  id: string
  start_time: null | string
  end_time: null | string
  book_slug: string
  created: string
  total_draw_num_each_one: number
  can_draw_num_everyday: number
  need_user_info: true
  picture: string
  rules: null
  remain_times: number
}
/* eslint-enable */
export { SinglePrizeProps, SingleLotteryProps }
