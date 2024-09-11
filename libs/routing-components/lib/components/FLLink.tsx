import {
  Box,
  Link as ChkraLink,
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

type ToParamsObjectType<TTo extends string> = Extract<
  TanstackLinkOptions<RegisteredRouter, "", TTo & string>["params"],
  Record<string, unknown>
>;

type MakeRequired<T> =
  T extends Record<string, unknown> ? { [K in keyof T]-?: T[K] } : T;

type ToParamsObjectOrReducer<T extends Record<string, unknown>> =
  | T
  | ((prev: Record<string, string>) => T);

type ToParamsPropsType<TTo extends string | undefined> = TTo extends
  | undefined
  | ""
  | "."
  ? { params?: ToParamsObjectOrReducer<Record<string, string>> }
  : ParsePathParams<TTo & string> extends never
    ? { params?: never }
    : {
        params: ToParamsObjectOrReducer<
          MakeRequired<ToParamsObjectType<TTo & string>>
        >;
      };

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
      <ChkraLink
        as={(props: { children: LinkChildrenFN }) => {
          return <Box {...props} as={TanstackLink} children={children} />;
        }}
        {...rest}
      />
    );
  } else {
    return (
      <ChkraLink as={TanstackLink} {...(props as React.PropsWithChildren)} />
    );
  }
}
