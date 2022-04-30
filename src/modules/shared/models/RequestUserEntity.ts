import { UserRole } from "../enums/UserRole";

export interface RequestUserEntity {
  perfil: UserRole;
  nome: string;
}
