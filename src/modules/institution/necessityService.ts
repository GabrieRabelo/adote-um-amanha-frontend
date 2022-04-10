import { Category } from "../shared/enums/Category";
import { Status } from "../shared/enums/Status";
import { Subcategory } from "../shared/enums/Subcategory";
import { NecessityEntity } from "./models/NecessityEntity";

export function getNecessities(): Promise<NecessityEntity[]> {
  //TODO: implementar corretamente na integração.
  const necessityModel = {
    id: 0,
    title: "Necessidade 0",
    createdDate: new Date(),
    category: Category.asset,
    subcategory: Subcategory.food,
    url: "https://www.youtube.com/embed/2X_2IdybTV0",
    status: Status.peding,
    description:
      "Doação de 10 pacotes de batata da marca são joão validade até 02/2023",
  };

  const necessitiesMock: NecessityEntity[] = [];
  for (let i = 0; i < 8; i++) {
    const necessity = { ...necessityModel };
    necessity.id = i;
    necessity.title = `Necessidade ${i}`;
    necessity.status = i % 2 === 0 ? Status.peding : Status.resolved;
    necessitiesMock.push(necessity);
  }
  return Promise.resolve(necessitiesMock);
}

export function getNecessity(id: number): Promise<NecessityEntity> {
  //TODO: implementar corretamente na integração.
  const necessityMock: NecessityEntity = {
    id,
    title: "Batata",
    createdDate: new Date(),
    category: Category.asset,
    subcategory: Subcategory.food,
    url: "https://www.youtube.com/embed/2X_2IdybTV0",
    status: Status.peding,
    description:
      "Doação de 10 pacotes de batata da marca são joão validade até 02/2023",
  };
  return Promise.resolve(necessityMock);
}

export function deleteNecessity(id: number): Promise<number> {
  //TODO: implementar corretamente na integração.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, 400);
  });
}

export function updateNecessity(
  necessity: NecessityEntity
): Promise<NecessityEntity> {
  //TODO: implementar corretamente na integração.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(necessity);
    }, 400);
  });
}
