import React from "react";
import { HStack, Box, As } from "@chakra-ui/react";
import { FLLink } from "./FLLink";

const keepSearchFn = (search: Record<string, string>) => search;

type TabLinkProps = {
  params: Record<string, string>;
  search?: (search: Record<string, string>) => Record<string, string>;
  children: React.ReactNode;
};

type FLLinkProps = React.ComponentProps<typeof FLLink>;

function DefaultTabLink(props: FLLinkProps) {
  return (
    <FLLink {...props} variant="tab" size={{ sm: "sm", md: "md", lg: "lg" }} />
  );
}

export function FLLinkTabs<
  ContainerPropsType,
  LinkPropsType extends object = Omit<FLLinkProps, keyof TabLinkProps>
>({
  tabs,
  tabKey,
  resetSearch = false,
  as = HStack,
  linkRenderer: LinkRenderer = DefaultTabLink,
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
