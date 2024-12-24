import type { TDataAxios } from '@api/_base'
import apiClient from '@api/_base'

export type TLoginForm = {
  username: string
  password: string
}

const adminAPI = {
  login: <Res>(adminForm: TLoginForm): Promise<TDataAxios<Res>> => {
    const url = '/admin/login'
    return apiClient.post(url, adminForm)
  },
  getAllUser: <Res>(): Promise<TDataAxios<Res>> => {
    const url = '/admin/user/getAll'
    return apiClient.get(url)
  },
  createUser: <Res>(form: any): Promise<TDataAxios<Res>> => {
    const url = '/admin/user/create'
    return apiClient.post(url, { ...form })
  },
  getTicket: <Res>(id: string): Promise<TDataAxios<Res>> => {
    const url = '/admin/ticket/by-schedule'
    return apiClient.post(url, { id })
  },
  doneTicket: <Res>(id: string): Promise<TDataAxios<Res>> => {
    const url = '/admin/ticket/done'
    return apiClient.post(url, { id })
  },
}

export default adminAPI
