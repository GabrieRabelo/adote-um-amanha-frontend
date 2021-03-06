const ACCESS_TOKEN_KEY = "access_token";
import router from "@/router";
import { getLoggedUser } from "../services/UserService";
import { saveUserData } from "./LoggedUserManager";

export async function saveAccessToken(accessToken: string): Promise<void> {
  const token = accessToken.split(" ")[1];
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  await saveUserFromToken().catch((err) => {
    throw err;
  });
}

async function saveUserFromToken() {
  const currentUserData = await getLoggedUser().catch((err) => {
    throw err;
  });
  saveUserData(currentUserData);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  const token = getAccessToken();
  if (!token) {
    return false;
  }
  return isTokenValid(token);
}

export function isTokenValid(token: string): boolean {
  const payloadBase64: string | undefined = token.split(".")[1];
  if (!payloadBase64) {
    return false;
  }
  try {
    const payloadString = atob(payloadBase64);
    const payload = JSON.parse(payloadString);
    const exp = payload.exp;
    return !!exp;
  } catch (err) {
    return false;
  }
}

export function logout(): void {
  router.push("/auth");
}
