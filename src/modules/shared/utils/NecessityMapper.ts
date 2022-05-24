import {
  NecessityEntity,
  RequestNecessityEntity,
} from "@/modules/institution/models/NecessityEntity";
import { Category } from "../enums/Category";
import { Status } from "../enums/Status";
import { Subcategory } from "../enums/Subcategory";

export function fromRequestFormat( // from front to back
  necessity: RequestNecessityEntity
): NecessityEntity {
  return {
    id: necessity.id,
    title: necessity.assunto,
    createdDate: new Date(necessity.data),
    category: necessity.categoria as Category,
    subcategory: necessity.subcategoria as Subcategory,
    url: necessity.urlVideo,
    description: necessity.descricao,
    status: necessity.status as Status,
    institutionID: necessity.idCasa,
    institutionName: necessity.nomeCasa,
  };
}

export function toRequestFormat(
  necessity: NecessityEntity
): RequestNecessityEntity {
  return {
    id: necessity.id,
    assunto: necessity.title,
    descricao: necessity.description,
    categoria: necessity.category,
    subcategoria: necessity.subcategory,
    data: necessity.createdDate.toLocaleDateString("pt-br"),
    status: necessity.status,
    idCasa: necessity.institutionID,
    nomeCasa: necessity.institutionName,
    urlVideo: necessity.url,
  };
}
