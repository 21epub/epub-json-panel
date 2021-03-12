export type LotteryType = 'Turntable' | 'EggFrenzy' | 'LotteryBox'

export interface ObjectiveProps {
  id: string
  title: string
  description: string
  picture: string
  ranking: string
}

/* eslint-disable */
export interface SinglePrizeProps {
  id: string
  initiator_id: number
  initiator_username: string
  initiator_name: string
  initiator_avatar: string
  created: string
  received: 0 | 1
  objective: ObjectiveProps
}

export interface SingleLotteryProps {
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
  picture: any
  rules: null
  remain_times: number
  show_background_image: boolean
  show_rolling_list: boolean
  show_contact_info: boolean
  contact_info: any
}

export interface UserInfo {
  id: string
  user_id: string | null
}
