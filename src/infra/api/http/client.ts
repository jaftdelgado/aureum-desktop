import { supabase } from "@infra/external/http/supabase";
import { ENV } from "@app/config/env";

interface RequestOptions extends RequestInit {
  data?: unknown;
  params?: Record<string, string | string[]>;
}

const triggerServerDisconnect = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("server-disconnect"));
  }
};

export class HttpError extends Error {
  public status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  protected async getAuthHeaders(): Promise<HeadersInit> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    const headers: HeadersInit = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | string[]>
  ): string {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = new URL(`${this.baseUrl}${cleanEndpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => url.searchParams.append(key, v));
        } else if (value !== undefined && value !== null) {
          url.searchParams.append(key, value);
        }
      });
    }

    return url.toString();
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint, options.params);

    const authHeaders = await this.getAuthHeaders();
    const isFormData = options.data instanceof FormData;

    const config: RequestInit = {
      ...options,
      headers: {
        ...authHeaders,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...options.headers,
      },
    };

    if (options.data) {
      config.body = isFormData
        ? (options.data as FormData)
        : JSON.stringify(options.data);
    }

    try {
      const response = await fetch(url, config);

      if (response.status >= 500) {
        console.error(`Server Error ${response.status}:`, response.statusText);
        triggerServerDisconnect();

        throw new HttpError(response.status, "Server Unavailable");
      }

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { detail: response.statusText };
        }

        let errorMessage =
          errorData.detail ||
          errorData.message ||
          `Error HTTP ${response.status}`;

        if (typeof errorMessage === "object") {
          errorMessage = JSON.stringify(errorMessage);
        }

        throw new HttpError(response.status, errorMessage as string);
      }

      if (response.status === 204) return null as T;
      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        if (navigator.onLine) {
          console.error("Network Error (Server Unreachable)");
          triggerServerDisconnect();
        }
      }
      console.error(
        `[HttpClient] Error en ${options.method || "GET"} ${url}:`,
        error
      );
      throw error;
    }
  }

  async getBlob(endpoint: string): Promise<Blob> {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${this.baseUrl}${cleanEndpoint}`;
    const authHeaders = await this.getAuthHeaders();

    const response = await fetch(url, {
      method: "GET",
      headers: authHeaders,
    });

    if (!response.ok) {
      throw new HttpError(response.status, "Error fetching blob");
    }

    return await response.blob();
  }

  get<T>(
    endpoint: string,
    params?: Record<string, string | string[]>,
    options?: RequestOptions
  ) {
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

export const client = new HttpClient(ENV.API_GATEWAY_URL);
