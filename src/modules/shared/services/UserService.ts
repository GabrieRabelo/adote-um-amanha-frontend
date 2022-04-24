import { AddressDTO } from "@/modules/institution/dtos/InstitutionDetailDTO";
import { UserRole } from "../enums/UserRole";
import { UserEntity } from "../models/UserEntity";

export async function getUser(id: number): Promise<UserEntity> {
  const address: AddressDTO = {
    rua: "Example",
    bairro: "Example",
    numero: "Example",
    complemento: "Example",
    cidade: "Example",
    estado: "Example",
    cep: "Example",
  };
  return new UserEntity(
    id,
    "Usuário Mock",
    "5112345678",
    "user@email.com",
    "www.userexample.com",
    address,
    UserRole.donator
  );
}
