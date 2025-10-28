// ejemplo: src/lib/auth.ts
export async function login(identifier: string, password: string) {
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // si algún día cambias a cookie httpOnly, añade: credentials: "include"
    body: JSON.stringify({ identifier, password }),
  });
  if (!res.ok) throw new Error("Credenciales inválidas");
  return res.json() as Promise<{ access_token: string; token_type: "bearer" }>;
}
