import { supabase } from "@infra/external/http/supabase";
import { ENV } from "@app/config/env";
import { HttpError } from "./client";

export interface StreamRequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export interface JsonStreamHandlers<T> {
  onMessage: (data: T) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

export class MarketClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    headers["Accept"] = "text/event-stream";

    return headers;
  }

  streamJsonLines<T>(
    endpoint: string,
    handlers: JsonStreamHandlers<T>,
    options: StreamRequestOptions = {}
  ): () => void {
    const controller = new AbortController();
    let cancelled = false;

    const start = async () => {
      const cleanEndpoint = endpoint.startsWith("/")
        ? endpoint
        : `/${endpoint}`;

      let url = `${this.baseUrl}${cleanEndpoint}`;
      if (options.params) {
        const query = new URLSearchParams(options.params).toString();
        url += `?${query}`;
      }

      try {
        const authHeaders = await this.getAuthHeaders();

        const response = await fetch(url, {
          ...options,
          method: options.method ?? "GET",
          headers: {
            ...authHeaders,
            ...options.headers,
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new HttpError(response.status, response.statusText);
        }

        if (!response.body) {
          throw new Error("MarketClient: response body is null");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (!cancelled) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);

            if (!line) continue; 

            if (line.startsWith("data:")) {
              const jsonPart = line.slice("data:".length).trim();
              if (!jsonPart) continue;

              try {
                const parsed = JSON.parse(jsonPart) as T;
                handlers.onMessage(parsed);
              } catch (err) {
                console.error("[MarketClient] JSON parse error", err, line);
                handlers.onError?.(err as Error);
              }
            } else {
            }
          }
        }

        handlers.onComplete?.();
      } catch (error) {
        if (cancelled) return;
        console.error("[MarketClient] stream error", error);
        handlers.onError?.(error as Error);
      }
    };

    void start();

    // cerrar stream
    return () => {
      cancelled = true;
      controller.abort();
    };
  }
}

export const marketClient = new MarketClient(ENV.API_GATEWAY_URL);
