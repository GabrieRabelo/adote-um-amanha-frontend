export type DonatorDetailDTO = {
  nome: string;
  cpf_cnpj: string;
  telefone: string;
  email: string;
  endereco: AddressDTO;
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
