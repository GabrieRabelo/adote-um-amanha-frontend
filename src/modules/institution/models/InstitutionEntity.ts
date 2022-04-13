import { AddressDTO } from "../dtos/InstitutionDetailDTO";

export class InstitutionEntity {

  constructor(public id: number, public name: string, public phone: string, public email: string, public site: string, public addressDTO: AddressDTO) { }

  get address(): string {
    const { rua, numero, bairro, cidade, estado, cep } = this.addressDTO;
    const fields = [
      this.getAddressPart(rua, ','),
      this.getAddressPart(numero, ' -'),
      this.getAddressPart(bairro, ','),
      this.getAddressPart(cidade, ' -'),
      this.getAddressPart(estado, ','),
      this.getAddressPart(cep, ''),
    ]
    return fields.join(' ');
  }

  private getAddressPart(part: string, separator: string): string {
    return part ? `${part}${separator}` : "";
  }

}
