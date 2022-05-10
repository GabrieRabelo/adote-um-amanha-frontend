import { RequestUserEntity } from "../models/RequestUserEntity";
import { UserEntity } from "../models/UserEntity";

export function fromRequestFormat(
  requestUserEntity: RequestUserEntity
): Partial<UserEntity> {
  return {
    role: requestUserEntity.perfil,
    name: requestUserEntity.nome,
  };
}
