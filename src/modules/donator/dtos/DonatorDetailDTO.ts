import { UserRole } from "@/modules/shared/enums/UserRole";

export type DonatorDetailDTO = {
  nome: string;
  email: string;
  documento: string;
  telefone: string;
  perfil: UserRole;
  endereco: AddressDTO;
  doacoesAprovadas: number;
  doacoesRecusadas: number;
};

export type AddressDTO = {
  rua: string;
  bairro: string;
  numero: string;
  complemento?: string;
  cidade: string;
  estado: string;
  cep: string;
};
