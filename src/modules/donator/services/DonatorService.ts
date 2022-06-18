import { UserRole } from "./../../shared/enums/UserRole";
import { HTTP } from "./../../../api/http-common";
import DonatorEntity from "../models/DonatorEntity";
import { DonatorDetailDTO } from "../dtos/DonatorDetailDTO";

export function createDonator(donator: DonatorEntity): Promise<void> {
  return HTTP.post("/public/usuario", {
    nome: donator.name,
    email: donator.email,
    senha: donator.password,
    documento: donator.document,
    telefone: donator.phone,
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
    .catch(({ response }) => {
      if (!response) {
        return Promise.reject("Erro Inesperado");
      }
      const data = response.data;
      return Promise.reject((data && data.informacao) || "Erro Inesperado");
    });
}

export async function getDonatorInformation(
  id: number
): Promise<DonatorEntity> {
  const response = await HTTP.get(`/usuario/${id}`);
  const body: DonatorDetailDTO = response.data;
  const donator = new DonatorEntity(
    id,
    body.nome,
    body.email,
    body.documento,
    body.telefone,
    body.perfil,
    body.endereco,
    body.doacoesAprovadas,
    body.doacoesRecusadas
  );
  return Promise.resolve(donator);
}
