import { HTTP } from "@/api/http-common";
import { AddressDTO } from "@/modules/institution/dtos/InstitutionDetailDTO";
import { UserRole } from "../enums/UserRole";
import { UserEntity } from "../models/UserEntity";

export async function getLoggedUser(): Promise<Partial<UserEntity>> {
  const response = await HTTP.get(`/usuario`);
  const user = response.data as Partial<UserEntity>;
  return user;
}
