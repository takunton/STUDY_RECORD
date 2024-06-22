import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./rooter/Router";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    console.debug("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.debug(
      "Supabase ANON KEY:",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }, []);

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
