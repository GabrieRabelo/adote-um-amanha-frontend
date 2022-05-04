import { HTTP } from "@/api/http-common";
import { InstitutionDetailDTO } from "../dtos/InstitutionDetailDTO";
import { UserEntity } from "../../shared/models/UserEntity";
import { UserRole } from "@/modules/shared/enums/UserRole";

export async function getInstituition(id: number): Promise<UserEntity> {
  const response = await HTTP.get(`/public/casas/${id}`);
  const body: InstitutionDetailDTO = response.data;
  const institution = new UserEntity(
    id,
    body.nome,
    body.telefone,
    body.email,
    body.site,
    body.endereco,
    UserRole.institution
  );
  return Promise.resolve(institution);
}
