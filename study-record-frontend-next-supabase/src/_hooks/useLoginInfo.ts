import { LoginInfo } from "../_types/LoginInfo";

// TODO: ローカルストレージからセッションストレージまたはcookieに変更
export const setLoginInfo = (value: LoginInfo) => {
  localStorage.setItem("id", value.id);
  localStorage.setItem("email", value.email);
};

export const getLoginInfo = (): LoginInfo => {
  console.log(`user_id:${localStorage.getItem("id")}`);
  return {
    id: localStorage.getItem("id") ?? "",
    email: localStorage.getItem("email") ?? "",
  };
};

export const removeLoginInfo = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("email");
};
