/*
 * @Description: 封装的 HTTP 服务，简化业务方调用
 * @Author: Feng Yinchao
 * @Date: 2024-08-09 09:09:02
 */

import { http } from '@common/http' // 引入基础 http 封装

interface HttpServiceOptions {
  url: string
  method?: 'get' | 'post' | 'put' | 'delete'
  data?: any
  params?: any
  headers?: any
  timeout?: number
  handleError?: (error: any) => void
  log?: boolean | ((data: any) => void)
}

class HttpService {
  static async request<T>(options: HttpServiceOptions): Promise<T> {
    try {
      const response = await http<T>({
        ...options,
        method: options.method || 'get', // 默认方法为 GET
      })
      return response // 返回响应数据
    } catch (error) {
      if (options.handleError) {
        options.handleError(error)
      }
      throw error // 抛出错误以供上层处理
    }
  }

  static async get<T>(url: string, params?: any, options?: Omit<HttpServiceOptions, 'url' | 'method'>): Promise<T> {
    return this.request<T>({
      url,
      method: 'get',
      params,
      ...options,
    })
  }

  static async post<T>(
    url: string,
    data?: any,
    options?: Omit<HttpServiceOptions, 'url' | 'method' | 'data'>,
  ): Promise<T> {
    return this.request<T>({
      url,
      method: 'post',
      data,
      ...options,
    })
  }

  static async put<T>(
    url: string,
    data?: any,
    options?: Omit<HttpServiceOptions, 'url' | 'method' | 'data'>,
  ): Promise<T> {
    return this.request<T>({
      url,
      method: 'put',
      data,
      ...options,
    })
  }

  static async delete<T>(url: string, options?: Omit<HttpServiceOptions, 'url' | 'method'>): Promise<T> {
    return this.request<T>({
      url,
      method: 'delete',
      ...options,
    })
  }
}

export default HttpService
