import { useEffect } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Auth0Login } from "@fl/components";
import { asTypedParams } from "@fl/routing";
import { Button, Box } from "@chakra-ui/react";
import _ from "lodash";

export const Route = createFileRoute("/_authenticated")({
  component: AuthWrapper,
  validateSearch: asTypedParams<{ code?: string }>(),
});

function AuthContent() {
  const { isAuthenticated, logout, user, getAccessTokenSilently } = useAuth0();

  const { code } = Route.useSearch();
  const { pathname } = useLocation();
  useEffect(() => {
    if (user) {
      getAccessTokenSilently().then((authToken: string) => {
        localStorage.setItem("authToken", authToken);
      });
    }
  }, [user]);

  return (
    <div>
      {isAuthenticated || (code && pathname === "/welcome") ? (
        <Box>
          <Outlet />
          <Button
            onClick={() =>
              logout({
                logoutParams: { returnTo: "http://localhost:3000/auth" },
              })
            }
          >
            logout
          </Button>
        </Box>
      ) : (
        <AuthLogin />
      )}
    </div>
  );
}

function AuthLogin() {
  const location = useLocation();
  const resume = btoa(
    [
      location.pathname,
      new URLSearchParams(
        _.mapValues(location.search, _.toString) ?? {},
      ).toString(),
    ]
      .filter(Boolean)
      .join("?"),
  );
  return <Auth0Login resume={resume} />;
}

function AuthWrapper() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "read:current_user update:current_user_metadata",
      }}
      cacheLocation="localstorage"
    >
      <AuthContent />
    </Auth0Provider>
  );
}
