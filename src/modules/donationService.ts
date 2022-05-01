import { HTTP } from "@/api/http-common";
import { DonationEntity } from "./DonationEntity";

export function createDonation(donation: DonationEntity): Promise<void> {
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
