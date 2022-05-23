import { HTTP } from "@/api/http-common";
import { fromBackendFormat } from "@/modules/shared/utils/RequestMapper";
import {
  NecessityEntity,
  RequestNecessityEntity,
} from "../models/NecessityEntity";
import {
  RequestBackendEntity,
  RequestEntity,
  RequestType,
} from "../models/RequestEntity";
import { NecessitiesRequestParams } from "../types/NecessityRequestParams";
import { mountQueryString } from "../utils/QueryParamBuilder";

export function createNecessity(necessity: NecessityEntity): Promise<void> {
  return HTTP.post("/pedidos", {
    assunto: necessity.title,
    descricao: necessity.description,
    categoria: necessity.category,
    subcategoria: necessity.subcategory,
    urlVideo: necessity.url,
  })
    .then(() => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function getNecessities(
  queryParams: NecessitiesRequestParams
): Promise<RequestEntity[]> {
  return getNecessitiesWithURL(queryParams, "pedidos");
}

export function getPublicNecessities(
  queryParams: NecessitiesRequestParams
): Promise<RequestEntity[]> {
  return getNecessitiesWithURL(queryParams, "public/necessidades");
}

function getNecessitiesWithURL(
  queryParams: NecessitiesRequestParams = {},
  url: string
): Promise<RequestEntity[]> {
  queryParams.tipoPedido = RequestType.necessity;
  const params = mountQueryString(queryParams);
  return HTTP.get(`${url}?${params}`)
    .then((response) => {
      const data = response.data;
      const serviceNecessities = data.conteudo as RequestBackendEntity[];
      return Promise.resolve(serviceNecessities.map(fromBackendFormat));
    })
    .catch((err) => Promise.reject(err));
}

export function getNecessity(id: number): Promise<RequestEntity> {
  return HTTP.get(`pedidos/${id}?tipoPedido=${RequestType.necessity}`)
    .then(({ data }) => fromBackendFormat(data))
    .catch((err) => Promise.reject(err));
}

export function deleteNecessity(id: number): Promise<void> {
  return HTTP.delete(`/pedidos/${id}?tipoPedido="${RequestType.necessity}"`)
    .then(() => Promise.resolve())
    .catch(() => Promise.reject());
}

export function updateNecessity(necessity: NecessityEntity): Promise<void> {
  const necessityToEdit: Partial<RequestNecessityEntity> = {
    assunto: necessity.title,
    descricao: necessity.description,
    categoria: necessity.category,
    subcategoria: necessity.subcategory,
    urlVideo: necessity.url,
  };
  return HTTP.put(`/pedidos/${necessity.id}`, necessityToEdit)
    .then(() => Promise.resolve())
    .catch(() => Promise.reject());
}

export function refuseNecessity(
  necessity: NecessityEntity,
  refusalReason: string
): Promise<void> {
  return HTTP.patch(`/pedidos/${necessity.id}/recusar`, {
    motivoRecusa: refusalReason,
  })
    .then(() => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
