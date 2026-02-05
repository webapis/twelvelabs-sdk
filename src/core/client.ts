import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { APIError, TwelveLabsError } from './error';

const DEFAULT_BASE_URL = 'https://api.twelvelabs.io/v1.3';

export class Client {
  private axiosInstance: AxiosInstance;

  constructor(apiKey: string, baseURL: string = DEFAULT_BASE_URL) {
    if (!apiKey) {
      throw new TwelveLabsError('API Key is required');
    }

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        if (error.response) {
          const { status, data, headers } = error.response;
          const message = (data as any)?.message || error.message;
          const requestId = headers['x-request-id'];
          throw new APIError(message, status, data, requestId);
        }
        throw new TwelveLabsError(error.message);
      }
    );
  }

  public async get<T>(url: string, params?: any): Promise<T> {
    return this.axiosInstance.get(url, { params });
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    return this.axiosInstance.post(url, data);
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    return this.axiosInstance.put(url, data);
  }

  public async delete<T>(url: string): Promise<T> {
    return this.axiosInstance.delete(url);
  }
}
