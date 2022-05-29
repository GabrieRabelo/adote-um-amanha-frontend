import { Status } from "@/modules/shared/enums/Status";
import { Subcategory } from "@/modules/shared/enums/Subcategory";
import { MatchEntity } from "../models/MatchEntity";
import { mountQueryString } from "@/modules/shared/utils/QueryParamBuilder";
import { HTTP } from "@/api/http-common";
import { Category } from "@/modules/shared/enums/Category";
import { NecessitiesRequestParams } from "@/modules/shared/types/NecessityRequestParams";

export async function getMatchMock(): Promise<MatchEntity> {
  return {
    id: 9999,
    necessity: {
      id: 9999,
      title: "Livros Didáticos",
      user: { id: 9998, name: "Lar Esperança" },
      category: Category.service,
      subcategory: Subcategory.education,
    },
    donation: {
      id: 9996,
      title: "Doacao 1",
      user: { id: 9994, name: "Ada Lovelace" },
    },
    date: new Date(),
    status: Status.match,
    description: "Este é um match!!",
  };
}

export async function matchAdmin(
  necessityID: number,
  donationID: number
): Promise<MatchEntity> {
  return (await HTTP.post(`/match/${necessityID}/vincula/${donationID}`)).data;
}

export function getMatches(
  queryParams: NecessitiesRequestParams = {}
): Promise<MatchEntity[]> {
  const params = mountQueryString(queryParams);
  return HTTP.get(`match?${params}`)
    .then((response) => {
      const data = response.data;
      const serviceMatches = data.conteudo;
      return Promise.resolve(
        serviceMatches.map((match: MatchListDTO) => ({
          title: match.assunto,
          donation: { user: { name: match.nomeDoador } },
          necessity: {
            user: { name: match.nomeCasa },
            subcategory: match.subcategoria,
          },
          date: match.data,
          id: match.id,
        }))
      );
    })
    .catch((err) => Promise.reject(err));
}

export function refuseMatch(match: MatchEntity): Promise<void> {
  console.log("Recusando match");
  return Promise.resolve();

  return HTTP.patch(`/matches/${match.id}/recusar`, {
    motivoRecusa: "",
  })
    .then(() => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function approveMatch(match: MatchEntity): Promise<void> {
  console.log("Aprovando match");
  return Promise.resolve();

  return HTTP.patch(`/matches/${match.id}/recusar`, {
    motivoRecusa: "",
  })
    .then(() => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

interface MatchListDTO {
  assunto: string;
  categoria: string;
  data: string;
  id: number;
  nomeCasa: string;
  nomeDoador: string;
  status: Status;
  subcategoria: Subcategory;
}
