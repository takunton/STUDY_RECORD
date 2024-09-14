import { LoginInfo } from "../_types/LoginInfo";

export const setLoginInfo = (value: LoginInfo) => {
  console.log(
    `セッションストレージにユーザー情報を保存[user_id=${sessionStorage.getItem(
      "id"
    )}]`
  );
  console.log(`user_id:${sessionStorage.getItem("id")}`);
  sessionStorage.setItem("id", value.id);
  sessionStorage.setItem("email", value.email);
};

export const getLoginInfo = (): LoginInfo => {
  console.log(
    `セッションストレージからユーザー情報を取得[user_id=${sessionStorage.getItem(
      "id"
    )}]`
  );
  console.log(`user_id:${sessionStorage.getItem("id")}`);
  return {
    id: sessionStorage.getItem("id") ?? "",
    email: sessionStorage.getItem("email") ?? "",
  };
};

export const removeLoginInfo = () => {
  console.log(
    `セッションストレージからユーザー情報を削除[user_id=${sessionStorage.getItem(
      "id"
    )}]`
  );
  localStorage.removeItem("id");
  localStorage.removeItem("email");
};
