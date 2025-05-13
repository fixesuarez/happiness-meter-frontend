/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpError } from "./errors/HttpError";

type HttpMethod = "GET" | "POST" | "PATCH";

const fetchWrapper = async (
  method: HttpMethod,
  endpoint: string,
  body?: any,
): Promise<any> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}${endpoint}`,
      {
        method: method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      throw new HttpError({
        message: `HTTP error! status: ${response.status}`,
        status: response.status,
        body: (await response.json()) as Record<string, unknown>,
      });
    }

    return await response.json();
  } catch {
    throw new Error("Error in fetchWrapper");
  }
};

export const get = async (endpoint: string): Promise<any> => {
  return fetchWrapper("GET", endpoint);
};

export const post = async (endpoint: string, body: any): Promise<any> => {
  return fetchWrapper("POST", endpoint, body);
};

export const patch = async (endpoint: string, body: any): Promise<any> => {
  return fetchWrapper("PATCH", endpoint, body);
};
