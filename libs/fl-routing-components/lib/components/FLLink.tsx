import {
  Box,
  Link as ChkraLinkBase,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import {
  LinkProps as TanstackLinkProps,
  Link as TanstackLink,
  LinkOptions as TanstackLinkOptions,
  RegisteredRouter,
  ParsePathParams,
} from "@tanstack/react-router";

type LinkChildrenFN = Exclude<TanstackLinkProps["children"], React.ReactNode>;

type ToParamsPropsType<TTo extends string | undefined> =
  ParsePathParams<TTo & string> extends never
    ? { params?: never }
    : { params: Record<ParsePathParams<TTo & string>, string> };

export type ChakraToTanstackLinkProps<TTo extends string | undefined> = Omit<
  Omit<TanstackLinkProps, "search" | "to"> &
    Omit<ChakraLinkProps, "as" | "children"> &
    TanstackLinkOptions<RegisteredRouter, "", TTo & string>,
  "params"
> &
  ToParamsPropsType<TTo>;

export function FLLink<TTo extends string | undefined>(
  props: ChakraToTanstackLinkProps<TTo>
) {
  if (typeof props.children === "function") {
    const { children, ...rest } = props;
    return (
      <ChkraLinkBase
        as={(props: { children: LinkChildrenFN }) => {
          return <Box {...props} as={TanstackLink} children={children} />;
        }}
        {...rest}
      />
    );
  } else {
    return (
      <ChkraLinkBase
        as={TanstackLink}
        {...(props as React.PropsWithChildren)}
      />
    );
  }
}
