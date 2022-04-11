import { Category } from "@/modules/shared/enums/Category";
import { Status } from "@/modules/shared/enums/Status";
import { Subcategory } from "@/modules/shared/enums/Subcategory";
import { InstitutionEntity } from "./InstitutionEntity";

export type NecessityEntity = {
  id: number;
  title: string;
  createdDate: Date;
  category: Category;
  subcategory: Subcategory;
  url: string;
  description: string;
  status: Status;
  institutionID: number;
  institutionName: string;
};

export type RequestNecessityEntity = {
  id: number;
  assunto: string;
  descricao: string;
  categoria: string;
  subcategoria: string;
  data: string;
  status: string;
  idCasa: number;
  nomeCasa: string;
  urlVideo: string;
};
