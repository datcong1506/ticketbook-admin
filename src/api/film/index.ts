import type { TDataAxios } from '../_base'
import apiClient from '../_base'

export type TFormFilm = {
  title: string
  genre?: string
  shortDescription: string
  actors: string[]
  duration: number
  releaseDate?: any
  thumb: string
  trailer: string
}

const filmApi = {
  getAll: <Res>(): Promise<TDataAxios<Res>> => {
    const url = '/admin/cinema/film/getAll'
    return apiClient.get(url)
  },
  getOne: <Res>(id: string): Promise<TDataAxios<Res>> => {
    const url = `/admin/cinema/film/get/${id}`
    return apiClient.get(url)
  },
  updateOne: <Res>(id: string, data: any): Promise<TDataAxios<Res>> => {
    const url = '/admin/cinema/film/update'
    return apiClient.put(url, { id, ...data })
  },
  create: (projectForm: TFormFilm) => {
    const url = '/admin/cinema/film/create'
    return apiClient.post(url, projectForm)
  },
  delete: (id: string) => {
    const url = '/admin/cinema/film/delete'
    return apiClient.delete(url, { data: { id } })
  },
}

export default filmApi
