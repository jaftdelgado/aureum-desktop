import { supabase } from "./supabase";
import { ENV } from "@app/config/env";

interface RequestOptions extends RequestInit {
  data?: unknown; 
  params?: Record<string, string>; 
}

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      // Headers comunes pueden ir aquí
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {

    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    
    let url = `${this.baseUrl}${cleanEndpoint}`;
    if (options.params) {
      const query = new URLSearchParams(options.params).toString();
      url += `?${query}`;
    }

    const authHeaders = await this.getAuthHeaders();

    const config: RequestInit = {
      ...options,
      headers: {
        ...authHeaders,
        ...options.headers,
      },
    };

    if (options.data) {
      config.body = JSON.stringify(options.data);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: response.statusText };
        }
        
        throw new Error(errorData.message || `Error HTTP ${response.status}`);
      }

      if (response.status === 204) {
        return null as T;
      }

      return await response.json();
    } catch (error) {
      console.error(`[HttpClient] Error en ${options.method || "GET"} ${url}:`, error);
      throw error;
    }
  }

  get<T>(endpoint: string, params?: Record<string, string>, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: "GET", params });
  }

  post<T>(endpoint: string, data: unknown, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: "POST", data });
  }

  put<T>(endpoint: string, data: unknown, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: "PUT", data });
  }

  patch<T>(endpoint: string, data: unknown, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: "PATCH", data });
  }

  delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const httpClient = new HttpClient(ENV.API_GATEWAY_URL);