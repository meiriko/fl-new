import { HStack, StackProps, Box, As } from "@chakra-ui/react";
import { FLLink } from "./FLLink";
import React from "react";

const keepSearchFn = (search: Record<string, string>) => search;

type TabLinkProps = {
  params: Record<string, string>;
  search?: (search: Record<string, string>) => Record<string, string>;
  children: React.ReactNode;
};

export function FLTabs<
  ContainerPropsType extends object = StackProps,
  LinkPropsType extends object = Omit<
    React.ComponentProps<typeof FLLink>,
    "children" | keyof TabLinkProps
  >,
>({
  tabs,
  tabKey,
  resetSearch = false,
  as = HStack,
  linkRenderer: LinkRenderer = FLLink,
  linkProps,
  ...containerProps
}: {
  tabs: readonly (string | { label: string; value: string })[];
  tabKey: string;
  resetSearch?: boolean;
  as?: As;
  linkRenderer?: React.ComponentType<LinkPropsType & TabLinkProps>;
  linkProps?: LinkPropsType;
} & ContainerPropsType) {
  return (
    <Box as={as} {...containerProps}>
      {tabs.map((tab) => {
        const { label, value } =
          typeof tab === "string" ? { label: tab, value: tab } : tab;
        return (
          <LinkRenderer
            key={value}
            params={{ [tabKey]: value }}
            search={resetSearch ? undefined : keepSearchFn}
            {...(linkProps as LinkPropsType)}
          >
            {label}
          </LinkRenderer>
        );
      })}
    </Box>
  );
}
