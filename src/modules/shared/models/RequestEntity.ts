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
  user?: Partial<UserEntity>;
  url?: string;
  type: RequestType;
  refusalReason?: string;
};

export type RequestBackendEntity = {
  id: number;
  assunto: string;
  descricao: string;
  categoria: string;
  subcategoria: string;
  data: string;
  status: string;
  urlVideo?: string;
  tipo: RequestType;
  nomeUsuario?: string;
  idUsuario?: number;
  motivoRecusa?: string;
};

export enum RequestType {
  necessity = "NECESSIDADE",
  donation = "DOACAO",
}
