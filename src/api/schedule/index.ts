import type { TDataAxios } from '../_base'
import apiClient from '../_base'

export type TFormSchedule = {
  film: string
  room: string
  time: string
  vipPrice: number
  regularPrice: number
}

const scheduleApi = {
  getAll: <Res>(): Promise<TDataAxios<Res>> => {
    const url = '/admin/cinema/showtime/getAll'
    return apiClient.get(url)
  },
  create: (scheduleForm: TFormSchedule) => {
    const url = '/admin/cinema/showtime/create'
    return apiClient.post(url, scheduleForm)
  },
  delete: (id: string) => {
    const url = '/admin/cinema/showtime/delete'
    return apiClient.delete(url, { data: { id } })
  },
}

export default scheduleApi
