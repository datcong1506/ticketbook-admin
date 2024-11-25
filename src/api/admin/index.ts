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
}

export default adminAPI
