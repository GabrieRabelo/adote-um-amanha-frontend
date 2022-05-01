import {
  DonationEntity,
  RequestDonationEntity,
} from "@/modules/DonationEntity";
import { Category } from "../enums/Category";
import { Status } from "../enums/Status";
import { Subcategory } from "../enums/Subcategory";

export function fromRequestFormat(
  donation: RequestDonationEntity
): DonationEntity {
  return {
    id: donation.id,
    title: donation.assunto,
    createdDate: new Date(donation.data),
    category: donation.categoria as Category,
    subcategory: donation.subcategoria as Subcategory,
    description: donation.descricao,
    status: donation.status as Status,
    donatorID: donation.idDonator,
    donatorName: donation.nomeDonator,
  };
}

export function toRequestFormat(
  donation: DonationEntity
): RequestDonationEntity {
  return {
    id: donation.id,
    assunto: donation.title,
    descricao: donation.description,
    categoria: donation.category,
    subcategoria: donation.subcategory,
    data: donation.createdDate.toLocaleDateString("pt-br"),
    status: donation.status,
    idDonator: donation.donatorID,
    nomeDonator: donation.donatorName,
  };
}
