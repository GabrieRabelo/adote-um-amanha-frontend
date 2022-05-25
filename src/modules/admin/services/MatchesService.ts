import { Status } from "@/modules/shared/enums/Status";
import {
  RequestBackendEntity,
  RequestEntity,
  //RequestType,
} from "../../shared/models/RequestEntity";
import { Subcategory } from "@/modules/shared/enums/Subcategory";
import { MatchEntity } from "../models/MatchEntity";
import { MatchRequestParams } from "@/modules/shared/types/MatchRequestParams";
import { mountQueryString } from "@/modules/shared/utils/QueryParamBuilder";
import { fromBackendFormat } from "@/modules/shared/utils/RequestMapper";
//import { RequestMatchEntity } from "@/modules/shared/models/MatchEntity";
import { HTTP } from "@/api/http-common";

export async function getMatchesMock(): Promise<MatchEntity[]> {
  const matches: MatchEntity[] = [
    {
      id: 9999,
      necessity: {
        id: 9999,
        title: "Livros Didáticos",
        user: { name: "Lar Esperança" },
        subcategory: Subcategory.education,
      },
      donation: {
        id: 9996,
        title: "Doacao 1",
        user: { name: "Ada Lovelace" },
      },
      date: new Date(),
      status: Status.match,
      description: "Este é um match!!",
    },
    {
      id: 9989,
      necessity: {
        id: 9999,
        title: "Livros Didáticos",
        user: { name: "Lar Esperança" },
        subcategory: Subcategory.education,
      },
      donation: {
        id: 9996,
        title: "Doacao 1",
        user: { name: "Ada Lovelace" },
      },
      date: new Date(),
      status: Status.match,
      description: "Este é um match!!",
    },
    {
      id: 1999,
      necessity: {
        id: 9999,
        title: "Livros Didáticos",
        user: { name: "Lar Esperança" },
        subcategory: Subcategory.education,
      },
      donation: {
        id: 9996,
        title: "Doacao 1",
        user: { name: "Ada Lovelace" },
      },
      date: new Date(),
      status: Status.match,
      description: "Este é um match!!",
    },
  ];
  return matches;
}

export async function getMatchMock(id:number): Promise<MatchEntity> {
  return {
    id: 9999,
    necessity: {
      id: 9999,
      title: "Livros Didáticos",
      user: { name: "Lar Esperança" },
      subcategory: Subcategory.education,
    },
    donation: {
      id: 9996,
      title: "Doacao 1",
      user: { name: "Ada Lovelace" },
    },
    date: new Date(),
    status: Status.match,
    description: "Este é um match!!",
  };
}

export function getMatches(
  queryParams: MatchRequestParams
): Promise<RequestEntity[]> {
  return getMatchesWithURL(queryParams, "pedidos");
}

function getMatchesWithURL(
  queryParams: MatchRequestParams = {},
  url: string
): Promise<RequestEntity[]> {
  const params = mountQueryString(queryParams);
  return HTTP.get(`${url}?${params}`)
    .then((response) => {
      const data = response.data;
      const serviceMatches = data.conteudo as RequestBackendEntity[];
      return Promise.resolve(serviceMatches.map(fromBackendFormat));
    })
    .catch((err) => Promise.reject(err));
}

// export function getMatch(id: number): Promise<RequestEntity> {
//   return HTTP.get(`pedidos/${id}?tipoPedido=${RequestType.matches}`)
//     .then(({ data }) => fromBackendFormat(data))
//     .catch((err) => Promise.reject(err));
// }

export function refuseMatch(
  match: MatchEntity,
  refusalReason: string
): Promise<void> {
  return HTTP.patch(`/pedidos/${match.id}/recusar`, {
    motivoRecusa: refusalReason,
  })
    .then(() => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
