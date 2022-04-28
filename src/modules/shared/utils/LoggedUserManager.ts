import { UserEntity } from "../models/UserEntity";

export function saveUserData(userData: Partial<UserEntity>): void {
  localStorage.setItem("current-logged-user", JSON.stringify(userData));
}

export function getUserData(): UserEntity {
  const storedUserPaylod = localStorage.getItem("current-logged-user") ?? "{}";
  return JSON.parse(storedUserPaylod) as UserEntity;
}
