import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const finaloopLine = definePartsStyle(() => ({
  indicator: {},
  tablist: {
    borderBottom: "1px solid wood.100",
    borderBottomColor: "wood.100 ",
    gap: "20px",
  },
  tab: {
    // bg: "transparent",
    color: "orange.600",
    borderBottom: "2px solid",
    borderBottomColor: "transparent",
    _hover: {
      borderBottomColor: "wood.200",
    },
    _selected: {
      color: "orange.600",
      borderBottom: "2px solid",
      borderBottomColor: "orange.600",
    },
  },
  tabpanels: {},
  tabpanel: {},
}));

// export the component theme
export const Tabs = defineMultiStyleConfig({
  variants: { finaloopLine },
  baseStyle: { tab: {} },
});
