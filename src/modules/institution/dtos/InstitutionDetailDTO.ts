export type InstitutionDetailDTO = {
    nome: string;
    telefone: string;
    email: string;
    site: string;
    endereco: AddressDTO;
};
  
export type AddressDTO = {
    rua: string;
    bairro: string;
    numero: string;
    complemento: string;
    cidade: string;
    estado: string;
    cep: string;
};