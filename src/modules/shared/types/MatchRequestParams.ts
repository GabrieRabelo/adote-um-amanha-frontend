import { Status } from "../enums/Status";

export interface MatchRequestParams {
    pagina?: number;
    tamanho?: number;
    direcao?: string;
    ordenacao?: string;
    status?: Status;
}