import { AddressDTO } from "../dtos/DonatorDetailDTO";
import { UserRole } from "@/modules/shared/enums/UserRole";

export default class DonatorEntity {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public document: string,
    public phone: string,
    public role: UserRole,
    public addressDTO: AddressDTO,
    public approvedDonations?: number,
    public refusedDonations?: number,
    public password?: string
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
