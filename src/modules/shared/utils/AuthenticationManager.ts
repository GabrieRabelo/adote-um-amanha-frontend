const ACCESS_TOKEN_KEY = "access_token";
import Router from "../../../router/index";
import { getLoggedUser } from "../services/UserService";
import { saveUserData } from "./LoggedUserManager";

export function saveAccessToken(accessToken: string): void {
  const token = accessToken.split(" ")[1];
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  saveUserFromToken();
}

async function saveUserFromToken() {
  const currentUserData = await getLoggedUser();
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
