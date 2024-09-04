import React, { Suspense } from "react";
import { createRootRouteWithContext } from "@tanstack/react-router";
import App from "../App";

const TanStackRouterDevtools = import.meta.env.DEV
  ? React.lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    )
  : () => null;

export const Route = createRootRouteWithContext<{ demo: string }>()({
  validateSearch: (search): { rootLogin?: boolean } => search,
  component: () => {
    return (
      <>
        <App />
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </>
    );
  },
});
