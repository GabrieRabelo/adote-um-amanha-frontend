import { Category } from "@/modules/shared/enums/Category";
import { Status } from "@/modules/shared/enums/Status";
import { Subcategory } from "@/modules/shared/enums/Subcategory";

export type DonationEntity = {
  id: number;
  title: string;
  createdDate: Date;
  category: Category;
  subcategory: Subcategory;
  description: string;
  status: Status;
  donatorID: number;
  donatorName: string;
};

export type RequestDonationEntity = {
  id: number;
  assunto: string;
  descricao: string;
  categoria: string;
  subcategoria: string;
  data: string;
  status: string;
  idDonator: number;
  nomeDonator: string;
};
