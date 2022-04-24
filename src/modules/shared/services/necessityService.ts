import { HTTP } from "@/api/http-common";
import { fromRequestFormat } from "@/modules/shared/utils/NecessityMapper";
import { Status } from "../enums/Status";
import {
  NecessityEntity,
  RequestNecessityEntity,
} from "../models/NecessityEntity";
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
  queryParam: NecessitiesRequestParams
): Promise<NecessityEntity[]> {
  const params = mountQueryString(queryParam);
  debugger;
  return HTTP.get(`public/necessidades?${params}`)
    .then((response) => {
      const data = response.data;
      const serviceNecessities = data.conteudo as RequestNecessityEntity[];
      return Promise.resolve(serviceNecessities.map(fromRequestFormat));
    })
    .catch((err) => Promise.reject(err));
}

export function getNecessity(id: number): Promise<NecessityEntity> {
  return HTTP.get(`public/necessidades/${id}`)
    .then(({ data }) => fromRequestFormat(data))
    .catch((err) => Promise.reject(err));
}

export function deleteNecessity(id: number): Promise<void> {
  return HTTP.delete(`/pedidos/${id}`)
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

interface NecessitiesRequestParams {
  pagina?: number;
  tamanho?: number;
  direcao?: string;
  ordenacao?: string;
  status?: Status;
}
