import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ApolloProvider } from "@apollo/client";

import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import theme from "./styles/theme";
import { Header } from "./components/Header";
import { client } from "./lib/apollo";

const appTheme = extendTheme(theme);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={appTheme}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
