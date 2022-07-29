import { type ThemeConfig } from "@chakra-ui/react";
import type { GlobalStyleProps } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
  disableTransitionOnChange: false,
};

const theme = {
  styles: {
    global: (props: GlobalStyleProps) => ({
      "html, body, #root": {
        width: "100%",
        bg: props.colorMode === "dark" ? "gray.800" : "gray.100",
      },
      header: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
      },
      footer: {
        bg: props.colorMode === "dark" ? "gray.700" : "white",
      },
      "*": {
        transition: "background-color .3s linear",
      },
    }),
  },
  fonts: {
    body: `'Nunito', sans-serif`,
    heading: `'Nunito', sans-serif`,
  },
  config,
};

export default theme;
