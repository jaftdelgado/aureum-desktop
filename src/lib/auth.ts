class NetworkError extends Error {
  constructor() {
    super("NETWORK_ERROR");
    this.name = "NetworkError";
  }
}
export const isNetworkError = (e: unknown): e is NetworkError =>
  e instanceof NetworkError;

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
export const isApiError = (e: unknown): e is ApiError => e instanceof ApiError;

export async function login(identifier: string, password: string) {
  const controller = new AbortController();
  const TIMEOUT_MS = 10_000;
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
      signal: controller.signal,
    });

    if (!res.ok) {
      if (res.status >= 500 || [502, 503, 504].includes(res.status)) {
        throw new NetworkError();
      }

      let backendMsg = "ERROR";
      const ctype = res.headers.get("content-type") || "";
      try {
        if (ctype.includes("application/json")) {
          const data = await res.json();
          backendMsg = data?.detail || data?.message || backendMsg;
        } else {
          const text = await res.text();
          backendMsg = text || backendMsg;
        }
      } catch {/* ignore */}

      throw new ApiError(res.status, backendMsg);
    }

    return (await res.json()) as { access_token: string; token_type: "bearer" };
  } catch (e: any) {
    if (e?.name === "AbortError" || e instanceof TypeError) {
      throw new NetworkError();
    }
    throw e;
  } finally {
    clearTimeout(t);
  }
}
