import type { TDataAxios } from '../_base'
import apiClient from '../_base'

type TFormProjection = {
  cinemaId: string
  name: string
  seats: { name: string, type: string }[]
  available: boolean
}

const projectionApi = {
  getAll: <Res>(cinema_ids: string[] = []): Promise<TDataAxios<Res>> => {
    const url = '/admin/cinema/projection/getAll'
    return apiClient.post(url, { cinema_ids })
  },
  create: (projectForm: TFormProjection) => {
    const url = '/admin/cinema/projection/create'
    return apiClient.post(url, projectForm)
  },
  delete: (id: string) => {
    const url = '/admin/cinema/projection/delete'
    return apiClient.delete(url, { data: { id } })
  },
}

export default projectionApi
