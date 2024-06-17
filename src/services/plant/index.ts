import { request } from '@umijs/max';

export async function getPlantInfo(
    params: {
      id?: string;
    },
    options?: { [key: string]: any },
  ) {
    const { id } = params;
    return request<API.Result_string_>(`${API_URL}api/tree/info/${id}`, {
      method: 'GET',
      params: { ...params },
      ...(options || {}),
    });
  }

  export async function addPlantInfo(
    body: {
      id?: string;
      [x:string]: any;
    },
    options?: { [key: string]: any },
  ) {
    return request<any>(`${API_URL}api/tree/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }

  export async function uploadOSS(
    params,
    options?: { [key: string]: any },
  ) {
    return request<any>(`${OSS_URL}prod-api/common/uploadOSS`, {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data', // …Ë÷√Content-TypeŒ™multipart/form-data
      },
    });
  }
  