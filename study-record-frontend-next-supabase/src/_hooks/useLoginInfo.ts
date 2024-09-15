import { useEffect, useState } from "react";
import { LoginInfo } from "../_types/LoginInfo";

export function useLoginInfo() {
  //
  const [loginInfo, setLoginInfoState] = useState<LoginInfo>();

  /**
   * 初期化時にセッションストレージからログイン情報を取得します。
   */
  useEffect(() => {
    const storedLoginInfo = getLoginInfo();
    setLoginInfoState(storedLoginInfo);
  }, []);

  /**
   * セッションストレージにログイン情報を保存します。
   * @param value
   */
  function setLoginInfo(value: LoginInfo) {
    console.log(
      `セッションストレージにユーザー情報を保存[user_id=${sessionStorage.getItem(
        "id"
      )}]`
    );
    console.log(`user_id:${sessionStorage.getItem("id")}`);
    sessionStorage.setItem("id", value.id);
    sessionStorage.setItem("email", value.email);

    // Reactのstateも更新する
    setLoginInfoState(value);
  }

  /**
   * セッションストレージからログイン情報を取得します。
   * @returns
   */
  function getLoginInfo() {
    const id = sessionStorage.getItem("id") ?? "";
    const email = sessionStorage.getItem("email") ?? "";

    console.log(`セッションストレージからユーザー情報を取得[user_id=${id}]`);

    return { id, email };
  }

  /**
   * セッションストレージからログイン情報を削除します。
   */
  function deleteLoginInfo() {
    console.log(
      `セッションストレージからユーザー情報を削除[user_id=${sessionStorage.getItem(
        "id"
      )}]`
    );
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("email");
  }

  return {
    loginInfo,
    setLoginInfo,
    deleteLoginInfo,
  };
}
