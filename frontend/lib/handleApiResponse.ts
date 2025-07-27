import { AxiosResponse } from 'axios';

interface ApiResponse<T = void> {
  message: string;
  error: boolean;
  data: T;
}

export function handleApiResponse<T>(response: AxiosResponse<ApiResponse<T>>): ApiResponse<T> {
  const { data } = response;

  if (data.error) {
    throw new Error(data.message || 'Erro ao processar a requisição');
  }

  return data;
}
