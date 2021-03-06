import {
  RequestEntity,
  RequestBackendEntity,
} from "@/modules/shared/models/RequestEntity";
import { Category } from "../enums/Category";
import { Status } from "../enums/Status";
import { Subcategory } from "../enums/Subcategory";

export function fromBackendFormat(
  request: RequestBackendEntity
): RequestEntity {
  return {
    id: request.id,
    title: request.assunto,
    createdDate: new Date(request.data),
    category: request.categoria as Category,
    subcategory: request.subcategoria as Subcategory,
    url: request.urlVideo,
    description: request.descricao,
    status: request.status as Status,
    user: { name: request.nomeUsuario, id: request.idUsuario },
    type: request.tipo,
    refusalReason: request.motivoRecusa,
  };
}

export function toBackendFormat(request: RequestEntity): RequestBackendEntity {
  return {
    id: request.id,
    assunto: request.title,
    descricao: request.description,
    categoria: request.category,
    subcategoria: request.subcategory,
    data: request.createdDate.toLocaleDateString("pt-br"),
    status: request.status,
    urlVideo: request.url,
    tipo: request.type,
  };
}
