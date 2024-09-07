import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import _ from "lodash";

const tab = defineStyle({
  color: "orange.600",
  borderBottom: "2px solid",
  borderBottomColor: "transparent",
  _hover: {
    borderBottomColor: "wood.200",
    textDecoration: "none",
  },
  _activeLink: {
    color: "orange.600",
    borderBottom: "2px solid",
    borderBottomColor: "orange.600",
  },
});

type TabSize = "sm" | "md" | "lg";
const sizesFromTabs = _.fromPairs(
  _.map(["sm", "md", "lg"] as TabSize[], (size) => [
    size,
    _.curryRight(_.get, 2)(`theme.components.Tabs.sizes.${size}.tab`),
  ])
);

export const Link = defineStyleConfig({
  variants: {
    tab,
  },
  sizes: sizesFromTabs,
});
