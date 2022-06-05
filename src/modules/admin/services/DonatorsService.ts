import { UserEntity } from "@/modules/shared/models/UserEntity";

export async function getDonators(params: DonatorsQueryParams): Promise<DonatorListItem[]> {
    return [
        { id: 1, name: 'Doador 1', donationsApproved: 10, donationsRefused: 1 },
        { id: 2, name: 'Doador 2', donationsApproved: 1, donationsRefused: 0 },
        { id: 3, name: 'Doador 3', donationsApproved: 20, donationsRefused: 2 },
        { id: 4, name: 'Doador 4', donationsApproved: 25, donationsRefused: 5 },
        { id: 5, name: 'Doador 5', donationsApproved: 0, donationsRefused: 3 },
    ]
}

interface DonatorsQueryParams {
    nome: string;
    doacoesAprovadas: number;
    doacoesRecusadas: number;
}

interface DonatorListItem {
    id: number;
    name: string;
    donationsApproved: number;
    donationsRefused: number;
}