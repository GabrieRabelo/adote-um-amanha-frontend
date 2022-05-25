import { Status } from "@/modules/shared/enums/Status";
import { Subcategory } from "@/modules/shared/enums/Subcategory";
import { MatchEntity } from "../models/MatchEntity";

export async function getMatches(): Promise<MatchEntity[]> {
  const matches: MatchEntity[] = [
    {
      id: 9999,
      necessity: {
        id: 9999,
        title: "Livros Didáticos",
        user: { name: "Lar Esperança" },
        subcategory: Subcategory.education,
      },
      donation: {
        id: 9996,
        title: "Doacao 1",
        user: { name: "Ada Lovelace" },
      },
      date: new Date(),
      status: Status.match,
      description: "Este é um match!!",
    },
    {
      id: 9989,
      necessity: {
        id: 9999,
        title: "Livros Didáticos",
        user: { name: "Lar Esperança" },
        subcategory: Subcategory.education,
      },
      donation: {
        id: 9996,
        title: "Doacao 1",
        user: { name: "Ada Lovelace" },
      },
      date: new Date(),
      status: Status.match,
      description: "Este é um match!!",
    },
    {
      id: 1999,
      necessity: {
        id: 9999,
        title: "Livros Didáticos",
        user: { name: "Lar Esperança" },
        subcategory: Subcategory.education,
      },
      donation: {
        id: 9996,
        title: "Doacao 1",
        user: { name: "Ada Lovelace" },
      },
      date: new Date(),
      status: Status.match,
      description: "Este é um match!!",
    },
  ];
  return matches;
}
