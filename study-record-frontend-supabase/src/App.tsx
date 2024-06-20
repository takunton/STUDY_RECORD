import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./rooter/Router";

export const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};
