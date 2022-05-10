import { Status } from "../enums/Status";
import { RequestType } from "../models/RequestEntity";

export interface NecessitiesRequestParams {
  pagina?: number;
  tamanho?: number;
  direcao?: string;
  ordenacao?: string;
  status?: Status;
  tipoPedido?: RequestType;
}
