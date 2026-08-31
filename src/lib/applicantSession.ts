const TOKEN_KEY = "adani_applicant_token";

export function saveApplicantToken(token: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
}

export function getApplicantToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function clearApplicantToken() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

export async function applicantFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ ok: boolean; status: number; body: T }> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
  const token = getApplicantToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const body = await res.json();
  return { ok: res.ok, status: res.status, body };
}
