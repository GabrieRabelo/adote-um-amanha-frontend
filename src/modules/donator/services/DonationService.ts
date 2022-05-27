import { HTTP } from "@/api/http-common";
import { NecessityEntity } from "@/modules/institution/models/NecessityEntity";
import {
  RequestBackendEntity,
  RequestEntity,
  RequestType,
} from "@/modules/shared/models/RequestEntity";
import { NecessitiesRequestParams } from "@/modules/shared/types/NecessityRequestParams";
import { mountQueryString } from "@/modules/shared/utils/QueryParamBuilder";
import { fromBackendFormat } from "@/modules/shared/utils/RequestMapper";

export function getDonations(
  queryParams: NecessitiesRequestParams = {}
): Promise<RequestEntity[] | unknown> {
  queryParams.tipoPedido = RequestType.donation;
  const params = mountQueryString(queryParams);
  return HTTP.get(`pedidos/?${params}`)
    .then((response) => {
      const data = response.data;
      const serviceNecessities = data.conteudo as RequestBackendEntity[];
      return Promise.resolve(serviceNecessities.map(fromBackendFormat));
    })
    .catch((err) => Promise.reject(err));
}

export function getDonation(id: number): Promise<unknown> {
  return HTTP.get(`pedidos/${id}?tipoPedido=${RequestType.donation}`)
    .then(({ data }) => ({
      id: data.id,
      title: data.assunto,
      category: data.categoria,
      date: data.data,
      description: data.descricao,
      status: data.status,
      subcategory: data.subcategoria,
    }))
    .catch((err) => Promise.reject(err));
}

export async function deleteDonation(id: number): Promise<void> {
  return HTTP.delete(`/pedidos/${id}?tipoPedido=${RequestType.donation}`)
    .then(() => Promise.resolve())
    .catch(() => Promise.reject());
}

export async function updateDonation(donation: NecessityEntity): Promise<void> {
  const donationToEdit: unknown = {
    assunto: donation.title,
    descricao: donation.description,
    categoria: donation.category,
    subcategoria: donation.subcategory,
    urlVideo: donation.url,
  };
  return HTTP.put(`/pedidos/${donation.id}`, donationToEdit)
    .then(() => Promise.resolve())
    .catch(() => Promise.reject());
}

// essa função ta igual a de cima e não faz o que deveria fazer

/* export async function matchDonation(donation: NecessityEntity): Promise<void> {
  const donationToEdit: unknown = {
    assunto: donation.title,
    descricao: donation.description,
    categoria: donation.category,
    subcategoria: donation.subcategory,
    urlVideo: donation.url,
  };
  return HTTP.post(`/match/${donation.id}`, donationToEdit)
    .then(() => Promise.resolve())
    .catch(() => Promise.reject());
} */

export function createDonation(donation: RequestEntity): Promise<void> {
  return HTTP.post("/pedidos", {
    assunto: donation.title,
    descricao: donation.description,
    categoria: donation.category,
    subcategoria: donation.subcategory,
    urlVideo: donation.url,
  })
    .then(() => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
