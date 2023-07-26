import { mutate } from "swr";

export interface FetcherProps {
  options?: any;
  headers?: any;
  body?: any;
  method: "GET" | "POST" | "PUT" | "DELETE";
}
export const fetcher = async (url: string, props: FetcherProps) => {
  const { options, body, headers, method } = props;
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
      ...options
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data= await response.json();
    return data;
  } catch (error: any) {
    throw new Error("Error fetching data: " + error.message);
  }
};

