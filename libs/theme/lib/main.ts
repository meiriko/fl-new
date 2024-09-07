import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { components } from "./components";
import { fonts } from "./fonts";
import { theme as proTheme } from "@chakra-ui/pro-theme";

// we export this again for typings to work
const finaloopTheme = {
  colors,
  fonts,
  breakpoints,
  components,
};

export const theme = extendTheme(
  proTheme,
  finaloopTheme,
  withDefaultColorScheme({
    colorScheme: "wood",
    components: [
      "Button",
      "Tabs",
      "Radio",
      "RadioGroup",
      "Switch",
      "Badge",
      "Checkbox",
    ],
  })
);
