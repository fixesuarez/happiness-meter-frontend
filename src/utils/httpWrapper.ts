/* eslint-disable @typescript-eslint/no-explicit-any */

type HttpMethod = "GET" | "POST" | "PATCH";

const fetchWrapper = async (
  method: HttpMethod,
  endpoint: string,
  body?: any,
): Promise<any> => {
  const response = await fetch(`http://localhost:3000${endpoint}`, {
    method: method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const get = async (endpoint: string): Promise<any> => {
  const response = await fetch(`http://localhost:3000${endpoint}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  return await response.json();
};

export const post = async (endpoint: string, body: any): Promise<any> => {
  return fetchWrapper("POST", endpoint, body);
};

export const patch = async (endpoint: string, body: any): Promise<any> => {
  return fetchWrapper("PATCH", endpoint, body);
};
