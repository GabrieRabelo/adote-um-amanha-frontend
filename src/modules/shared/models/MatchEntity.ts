import { Category } from "@/modules/shared/enums/Category";
import { Status } from "@/modules/shared/enums/Status";
import { Subcategory } from "@/modules/shared/enums/Subcategory";
import { NecessityEntity } from "./NecessityEntity";

export type MatchEntity = {
    id: number;
    necessity: NecessityEntity;
    donation: NecessityEntity;
    date: string
    status: Status;
    description: string;
};

export type RequestMatchEntity = {
    id: number;
    necessidade: NecessityEntity
    doacao: NecessityEntity;
    data: string;
    status: string;
    descricao: string;
};
