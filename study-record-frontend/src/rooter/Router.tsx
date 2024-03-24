import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { LoginTemplate } from "../app/login/LoginTemplate";
import { CarendarTemplate } from "../app/carendar/CarendarTemplate";
import { LearningContentTemplate } from "../app/learning-content/LearningContentTemplate";
import { Page404 } from "../app/page404/Page404";
import { Layout } from "../app/Layout";

export const Router = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<LoginTemplate />}></Route>
      <Route path="/home" element={<Layout />}>
        <Route index element={<CarendarTemplate />} />
        <Route
          path="learning-content"
          element={<LearningContentTemplate />}
        ></Route>
      </Route>
      <Route path="*" element={<Page404 />}></Route>
    </Routes>
  );
});
