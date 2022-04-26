import { HTTP } from "@/api/http-common";
import { RequestUserEntity } from "../models/RequestUserEntity";
import { UserEntity } from "../models/UserEntity";
import { fromRequestFormat } from "../utils/UserMapper";

export async function getLoggedUser(): Promise<Partial<UserEntity>> {
  const response = await HTTP.get(`/usuario`);
  const responseUser = response.data as RequestUserEntity;
  const user = fromRequestFormat(responseUser);
  return user;
}
