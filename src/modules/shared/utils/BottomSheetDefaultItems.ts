import { BottomSheetMenuItem } from "../types/BottomSheetMenuItem";
import { logout } from "./AuthenticationManager";

const logoutMenuItem: BottomSheetMenuItem = {
  title: "Sair",
  icon: "mdi-logout",
  onClick: logout,
};

export default Object.freeze({
  logoutMenuItem,
});
