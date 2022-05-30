import { Status } from "@/modules/shared/enums/Status";
import { Subcategory } from "@/modules/shared/enums/Subcategory";
import { MatchEntity } from "../models/MatchEntity";
import { mountQueryString } from "@/modules/shared/utils/QueryParamBuilder";
import { HTTP } from "@/api/http-common";
import { Category } from "@/modules/shared/enums/Category";
import { NecessitiesRequestParams } from "@/modules/shared/types/NecessityRequestParams";

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

export function getMatch(id: number): Promise<Partial<MatchEntity>> {
  return HTTP.get(`/match/${id}`).then((response) => {
    const data = response.data as MatchDescriptionDTO;
    return {
      id: data.id,
      title: data.assunto,
      category: data.categoria,
      subcategory: data.subcategoria,
      necessity: {
        user: { id: data.idCasa, name: data.nomeCasa },
      },
      donation: {
        user: { id: data.idDoador, name: data.nomeDoador },
      },
      date: new Date(data.dataCriacao),
      description: data.descricao,
      status: data.status,
    };
  });
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

interface MatchDescriptionDTO {
  assunto: string;
  categoria: Category;
  dataCriacao: string;
  dataFechamento: null;
  descricao: string;
  finalizadoPor: null;
  id: number;
  idCasa: number;
  idDoador: number;
  nomeCasa: string;
  nomeDoador: string;
  status: Status;
  subcategoria: Subcategory;
}
