import type { TDataAxios } from '../_base'
import apiClient from '../_base'

type TFormCinema = {
  name: string
  location: string
  logo: string
  description: string
}

const cinemaApi = {
  getAll: <Res>(): Promise<TDataAxios<Res>> => {
    const url = '/admin/cinema/getAll'
    return apiClient.get(url)
  },
  create: (cinemaForm: TFormCinema) => {
    const url = '/admin/cinema/create'
    return apiClient.post(url, cinemaForm)
  },
  delete: (id: string) => {
    const url = `/admin/cinema/delete`
    return apiClient.delete(url, { data: { id } })
  },
}

export default cinemaApi
