import { HTTP } from "@/api/http-common";
import { InstitutionDetailDTO } from "../dtos/InstitutionDetailDTO";
import { InstitutionEntity } from "../models/InstitutionEntity";

export async function getInstituition(id: number): Promise<InstitutionEntity> {
  const response = await HTTP.get(`/public/casas/${id}`);
  const body: InstitutionDetailDTO = response.data;
  const institution = new InstitutionEntity(id, body.nome, body.telefone, body.email, body.site, body.endereco);
  return Promise.resolve(institution);
}
