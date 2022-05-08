import { HTTP } from "@/api/http-common";
import { RequestEntity } from "./shared/models/RequestEntity";

export function createDonation(donation: RequestEntity): Promise<void> {
  return HTTP.post("/pedidos", {
    assunto: donation.title,
    descricao: donation.description,
    categoria: donation.category,
    subcategoria: donation.subcategory,
  })
    .then(() => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
