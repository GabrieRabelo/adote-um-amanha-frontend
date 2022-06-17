import { HTTP } from "@/api/http-common";
import { mountQueryString } from "@/modules/shared/utils/QueryParamBuilder";

export async function getDonators(
  params: DonatorsQueryParams
): Promise<DonatorListItem[]> {
  const queryString = mountQueryString(params);
  return HTTP.get(`/usuarios?${queryString}`).then(({ data }) => {
    return data.conteudo.map((donator: DonatorListItemDTO) => ({
      id: donator.id,
      name: donator.nome,
      donationsApproved: donator.doacoesAprovadas,
      donationsRefused: donator.doacoesRecusadas,
    }));
  });
}

interface DonatorsQueryParams {
  nome: string;
}

interface DonatorListItemDTO {
  id: number;
  nome: string;
  doacoesAprovadas: number;
  doacoesRecusadas: number;
}

interface DonatorListItem {
  id: number;
  name: string;
  donationsApproved: number;
  donationsRefused: number;
}
