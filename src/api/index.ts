import { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { apiAgent } from './axiosConfig'


export const getApi = async <T = any>(path: string, config?: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse<T>) => {
    return response.data
  }

  const onError = (error: any) => {
    console.error('Get Request Failed:', error)

    return Promise.reject(error.response || error.message)
  }

  try {
    const response = await apiAgent.get(path, config)
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}

export const deleteApi = async <T = any>(
  path: string,
  params: AxiosRequestConfig['params'] = null,
  data?: any
) => {
  const onSuccess = (response: AxiosResponse<T>) => {
    return response.data
  }

  const onError = (error: any) => {
    console.error('Delete Request Failed:', error)
    return Promise.reject(error.response || error.message)
  }

  try {
    const response = await apiAgent.delete<T>(path, { params, data })
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}

export const postApi = async <T = any>(
  path: string,
  data?: any,
  params?: any,
  config?: AxiosRequestConfig<any>
) => {
  const onSuccess = (response: AxiosResponse<T>) => {
    return response.data
  }

  const onError = (error: any) => {
    console.error('Post Request Failed:', error)
    return Promise.reject(error.response || error.message)
  }

  try {
    const response = await apiAgent.post<T>(path, { data, params, config })
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}

export const putApi = async<T=any>(path:string,data?:any, params?:any , config?:AxiosRequestConfig<any>)=> {
    const onSuccess = (response : AxiosResponse<T>) => {
        return  response.data
    } 

    const onError = (error : any ) => {
        console.error('Put Request Failed:', error)
        return Promise.reject(error.response || error.message)
    }

    try {
        const response = await apiAgent.put<T>(path,{data,params,config})
        return onSuccess(response)
    }catch(error) {
        return onError(error)
    }
}
