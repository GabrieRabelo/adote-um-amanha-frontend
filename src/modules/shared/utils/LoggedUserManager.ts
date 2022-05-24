import { UserEntity } from "../models/UserEntity";
import { UserRole } from "../enums/UserRole";

export function saveUserData(userData: Partial<UserEntity>): void {
  localStorage.setItem("current-logged-user", JSON.stringify(userData));
}

export function getUserData(): UserEntity {
  const storedUserPaylod = localStorage.getItem("current-logged-user") ?? "{}";
  return JSON.parse(storedUserPaylod) as UserEntity;
}

export function isUserInstitution(): boolean {
  return getUserData().role == UserRole.institution;
}

export function isUserDonator(): boolean {
  return getUserData().role == UserRole.donator;
}

export function isUserAdmin(): boolean {
  return getUserData().role == UserRole.admin;
}
