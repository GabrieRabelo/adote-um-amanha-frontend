import { Category } from "@/modules/shared/enums/Category";
import { Status } from "@/modules/shared/enums/Status";
import { Subcategory } from "@/modules/shared/enums/Subcategory";
import { UserEntity } from "./UserEntity";

export type RequestEntity = {
  id: number;
  title: string;
  createdDate: Date;
  category: Category;
  subcategory: Subcategory;
  description: string;
  status: Status;
  donator?: Partial<UserEntity>;
  institution?: Partial<UserEntity>;
  url?: string;
  type: RequestType;
};

export type RequestBackendEntity = {
  id: number;
  assunto: string;
  descricao: string;
  categoria: string;
  subcategoria: string;
  data: string;
  status: string;
  idDoador?: number;
  idCasa?: number;
  urlVideo?: string;
  nomeDoador?: string;
  tipo: RequestType;
  nomeCasa?: string;
};

export enum RequestType {
  necessity = "NECESSIDADE",
  donation = "DOACAO",
}
