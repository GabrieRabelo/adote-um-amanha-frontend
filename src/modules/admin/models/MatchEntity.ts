import { Status } from "@/modules/shared/enums/Status";
import { RequestEntity } from "@/modules/shared/models/RequestEntity";

export interface MatchEntity {
  id: number;
  necessity: Partial<RequestEntity>;
  donation: Partial<RequestEntity>;
  date: Date;
  status: Status;
  description: string;
}
