import { Category } from "@/modules/shared/enums/Category";
import { Status } from "@/modules/shared/enums/Status";
import { Subcategory } from "@/modules/shared/enums/Subcategory";
import { RequestEntity } from "@/modules/shared/models/RequestEntity";

export interface MatchEntity {
  id: number;
  necessity: Partial<RequestEntity>;
  donation: Partial<RequestEntity>;
  date: Date;
  status: Status;
  title: string;
  description: string;
  category: Category;
  subcategory: Subcategory;
}
