import { useState } from "react";
import { supabase } from "../../util/supabase";
import { Text } from "@chakra-ui/react";
import { getLoginInfo, setLoginInfo } from "../../_hooks/useLoginInfo";
import { LoginInfo } from "../../_types/LoginInfo";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      alert("Login successful!");

      const loginInfo: LoginInfo = {
        id: (await supabase.auth.getUser()).data.user?.id ?? "",
        email: (await supabase.auth.getUser()).data.user?.email ?? "",
      };

      setLoginInfo(loginInfo);
    } catch (error) {
      alert("ログインに失敗しました");
      alert(error);
    } finally {
      console.log("ログイン実行中");
      console.log(supabase.auth.getUser());
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      alert("Sign up successful!");
    } catch (error) {
      alert("サインインに失敗しました");
      alert(error);
    } finally {
      console.log("サインイン実行中");
      console.log(supabase.auth.getUser());
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        Login
      </button>
      <button onClick={handleSignUp} disabled={isLoading}>
        Sign Up
      </button>
      <Text>id: {getLoginInfo().id}</Text>
      <Text>email:{getLoginInfo().email}</Text>
    </div>
  );
};
