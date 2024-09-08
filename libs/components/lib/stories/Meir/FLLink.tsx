import { useMemo } from "react";
import {
  Outlet,
  RouterProvider,
  createRoute,
  createMemoryHistory,
  createRootRoute,
  createRouter,
  useParams,
  Route,
} from "@tanstack/react-router";
import { FLLink, FLLinkTabs } from "@fl/routing-components";
import { Box, HStack } from "@chakra-ui/react";

export interface FLLinkProps {
  parts: string[];
  optionsCount?: number;
}

type PathConfig = {
  name: string;
  label: string;
  path: string;
  params: Record<string, string>;
};

const ItemList = () => (
  <Box>
    <Box>Item List</Box>
    <Outlet />
  </Box>
);

function toRoutePartDisplay(name: string, tabs?: readonly string[]) {
  return () => {
    const params = useParams({ strict: false });
    return (
      <Box mt={2}>
        <Box borderTop="1px solid black">
          {/* inside {name} {JSON.stringify(params, null, 2)} */}
          inside {name.replace(/id$/i, "")} {params[name]}
        </Box>
        {tabs && <FLLinkTabs tabs={tabs} tabKey={name} h={10} />}
        <Outlet />
      </Box>
    );
  };
}

function StyledFLLink(props: React.ComponentProps<typeof FLLink>) {
  return (
    <FLLink
      {...props}
      _activeLink={{ color: "red.500" }}
      activeOptions={{ exact: true }}
    />
  );
}

function toNestedRoutes(parts: string[], getActiveOption: () => number) {
  return parts.reduce<PathConfig[]>((acc: PathConfig[], _, index: number) => {
    const activeOption = getActiveOption();
    const name = parts[index];
    const subParts = parts.slice(0, index + 1);
    const label = `[${subParts.map((part) => `${part} ${activeOption}`).join(" / ")}]`;
    const path = subParts.map((part) => `$${part}Id`).join("/");
    const params = Object.fromEntries(
      subParts.map((part) => [`${part}Id`, `${part}-${activeOption}`])
    );
    return [
      ...acc,
      {
        name,
        label,
        path,
        params,
      },
    ];
  }, [] as PathConfig[]);
}

const App = ({
  parts,
  optionsCount,
}: {
  parts: string[];
  optionsCount: number;
}) => {
  const partsConfig = useMemo(
    () => toNestedRoutes(parts, () => 1 + Math.min(2, optionsCount - 1)),
    [optionsCount, parts]
  );
  const randomPartsConfig = useMemo(
    () =>
      toNestedRoutes(parts, () => 1 + Math.floor(Math.random() * optionsCount)),
    [optionsCount, parts]
  );

  const params = useParams({ strict: false });
  return (
    <Box>
      <Box my={4}>params: {JSON.stringify(params, null, 2)}</Box>
      <HStack spacing={8} mb={2}>
        {partsConfig.map(({ name, label, path, params }) => (
          <StyledFLLink key={name} to={`/item/${path}`} params={params}>
            {label}
          </StyledFLLink>
        ))}
      </HStack>
      <HStack spacing={8} mb={4}>
        {randomPartsConfig.map(({ name, label, path, params }) => (
          <StyledFLLink key={name} to={`/item/${path}`} params={params}>
            {label}
          </StyledFLLink>
        ))}
      </HStack>
      <Outlet />
    </Box>
  );
};

function buildRouteTree(parts: string[], optionsCount: number) {
  const rootRoute = createRootRoute({
    component: () => <App parts={parts} optionsCount={optionsCount} />,
  });

  const baseRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => (
      <Box>
        <Box>Home</Box>
        <Outlet />
      </Box>
    ),
  });

  const itemRoute = createRoute({
    getParentRoute: () => baseRoute,
    path: "item",
    component: ItemList,
  });

  parts.reduce<Route>((acc: Route, name: string, index: number): Route => {
    const tabs = index
      ? Array.from({ length: optionsCount }, (_, i) => `${name}-${i + 1}`)
      : undefined;

    const route = createRoute({
      getParentRoute: () => acc,
      path: `$${name}Id`,
      component: toRoutePartDisplay(`${name}Id`, tabs),
    });

    acc.addChildren([route]);

    return route;
  }, itemRoute as Route); // Cast the initial value to MyRoute

  const routeTree = rootRoute.addChildren([baseRoute.addChildren([itemRoute])]);
  return routeTree;
}

export function FLLinkStory({ parts, optionsCount = 3 }: FLLinkProps) {
  const routeTree = buildRouteTree(parts, optionsCount);

  return (
    <RouterProvider
      router={createRouter({
        history: createMemoryHistory(),
        routeTree,
      })}
    />
  );
}
