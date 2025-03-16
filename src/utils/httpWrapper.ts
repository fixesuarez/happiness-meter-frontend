export const get = async (endpoint: string): Promise<unknown> => {
  const response = await fetch(`http://localhost:3000${endpoint}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  return await response.json();
};

export const post = async (
  endpoint: string,
  body: unknown,
): Promise<unknown> => {
  const response = await fetch(`http://localhost:3000${endpoint}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};
