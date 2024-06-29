import { LoginInfo } from "../_types/LoginInfo";

export function setLoginInfo(value: LoginInfo) {
  localStorage.setItem("id", value.id);
  localStorage.setItem("email", value.email);
}

export function getLoginInfo(): LoginInfo {
  return {
    id: localStorage.getItem("id") ?? "",
    email: localStorage.getItem("email") ?? "",
  };
}
