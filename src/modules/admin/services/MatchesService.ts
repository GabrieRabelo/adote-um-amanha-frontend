import { Status } from "@/modules/shared/enums/Status";
import {
  NecessityEntity,
  RequestNecessityEntity,
} from "../../shared/models/NecessityEntity";
import {
  RequestBackendEntity,
  RequestEntity,
  RequestType,
} from "../../shared/models/RequestEntity";
import { Subcategory } from "@/modules/shared/enums/Subcategory";
import { MatchEntity } from "../models/MatchEntity";
import { MatchRequestParams } from "@/modules/shared/types/MatchRequestParams";
import { mountQueryString } from "@/modules/shared/utils/QueryParamBuilder";
import { fromBackendFormat } from "@/modules/shared/utils/RequestMapper";
//import { RequestMatchEntity } from "@/modules/shared/models/MatchEntity";
import { HTTP } from "@/api/http-common";
import { Category } from "@/modules/shared/enums/Category";

export async function getMatchesMock(): Promise<MatchEntity[]> {
  const matches: MatchEntity[] = [
    {
      id: 9999,
      necessity: {
        id: 9999,
        title: "Livros Didáticos",
        user: { name: "Lar Esperança" },
        category: Category.service,
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
        category: Category.service,
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
        category: Category.service,
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
  queryParams: MatchRequestParams
): Promise<RequestEntity[]> {
  return getMatchesWithURL(queryParams, "match");
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
