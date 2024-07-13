import { memo, useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { CarendarTemplate } from "../app/carendar/CarendarTemplate";
import { LearningContentTemplate } from "../app/learning-content/LearningContentTemplate";
import { Page404 } from "../app/page404/Page404";
import { Layout } from "../app/Layout";
import { Auth } from "../app/login/Auth";
import { getLoginInfo } from "../_hooks/useLoginInfo";
import { Center, Spinner } from "@chakra-ui/react";

export const Router = memo(() => {
  const PrivateRoute = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        const loginInfo = await getLoginInfo();

        if (loginInfo.id === "") {
          navigate("/login");
        } else {
          setLoading(false);
        }
      };

      checkAuth();
    }, [navigate]);

    if (loading) {
      return (
        <Center minH="100vh">
          <Spinner size="xl" />
        </Center>
      );
    }

    return <Outlet />;
  };

  return (
    <Routes>
      <Route path="/login" element={<Auth />}></Route>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Layout />}>
          <Route index element={<CarendarTemplate />} />
          <Route
            path="learning-content"
            element={<LearningContentTemplate />}
          ></Route>
        </Route>
      </Route>
      <Route path="*" element={<Page404 />}></Route>
    </Routes>
  );
});
