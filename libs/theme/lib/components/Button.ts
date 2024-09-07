import type { ComponentStyleConfig } from "@chakra-ui/react";
import { defineStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = defineStyleConfig({
  // defaultProps: {
  //   colorScheme: "wood",
  // },
  variants: {
    outline: {
      borderColor: "gray.300",
      color: "gray.900",
    },
  },
});
