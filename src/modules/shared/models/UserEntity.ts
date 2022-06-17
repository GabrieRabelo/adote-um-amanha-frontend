import { AddressDTO } from "../../institution/dtos/InstitutionDetailDTO";
import { UserRole } from "../enums/UserRole";

export class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public phone: string,
    public email: string,
    public addressDTO: AddressDTO,
    public role: UserRole,
    public site?: string
  ) {}

  get address(): string {
    const { rua, numero, bairro, cidade, estado, cep, complemento } =
      this.addressDTO;
    const fields = [
      this.getAddressPart(rua, ","),
      this.getAddressPart(numero, " -"),
      complemento == undefined ? "" : this.getAddressPart(complemento, ","),
      this.getAddressPart(bairro, ","),
      this.getAddressPart(cidade, " -"),
      this.getAddressPart(estado, ","),
      this.getAddressPart(cep, ""),
    ];
    return fields.join(" ");
  }

  private getAddressPart(part: string, separator: string): string {
    return part ? `${part}${separator}` : "";
  }
}
