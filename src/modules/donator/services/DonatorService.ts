import { UserRole } from "./../../shared/enums/UserRole";
import { HTTP } from "./../../../api/http-common";
import DonatorEntity from "../models/DonatorEntity";

export function createDonator(donator: DonatorEntity): Promise<void> {
  return HTTP.post("/public/usuario", {
    nome: donator.name,
    email: donator.email,
    senha: donator.password,
    documento: donator.cpf_cnpj,
    telefone: donator.phone,
    site: donator.site,
    estado: donator.addressDTO.estado,
    cidade: donator.addressDTO.cidade,
    bairro: donator.addressDTO.bairro,
    rua: donator.addressDTO.rua,
    cep: donator.addressDTO.cep,
    numero: donator.addressDTO.numero,
    complemento: donator.addressDTO.complemento,
    perfil: UserRole.donator,
  })

    .then(() => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
