import { HTTP } from "@/api/http-common";
import { InstitutionDetailDTO } from "../dtos/InstitutionDetailDTO";
import { UserEntity } from "../../shared/models/UserEntity";
import { UserRole } from "@/modules/shared/enums/UserRole";
import institutionEntity from "@/modules/institution/models/InstitutionEntity";

export async function getinstitution(id: number): Promise<UserEntity> {
  const response = await HTTP.get(`/public/casas/${id}`);
  const body: InstitutionDetailDTO = response.data;
  const institution = new UserEntity(
    id,
    body.nome,
    body.telefone,
    body.email,
    body.endereco,
    UserRole.institution,
    body.site
  );
  return Promise.resolve(institution);
}

export function createInstitution(
  institution: institutionEntity
): Promise<void> {
  return HTTP.post("/casa", {
    nome: institution.name,
    email: institution.email,
    senha: institution.password,
    documento: institution.cpf_cnpj,
    telefone: institution.phone,
    site: institution.site,
    estado: institution.addressDTO.estado,
    cidade: institution.addressDTO.cidade,
    bairro: institution.addressDTO.bairro,
    rua: institution.addressDTO.rua,
    cep: institution.addressDTO.cep,
    numero: institution.addressDTO.numero,
    complemento: institution.addressDTO.complemento,
    perfil: UserRole.institution,
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
