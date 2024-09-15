import { useAuth0 } from "@auth0/auth0-react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Box } from "@chakra-ui/react";
import _ from "lodash";
import { asTypedParams } from "@fl/routing";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/welcome")({
  component: WelcomePage,
  validateSearch: asTypedParams<{ resume?: string }>(),
});

function WelcomePage() {
  const navigate = Route.useNavigate();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const search = Route.useSearch();
  const hasCode = Boolean(search.code);
  const resume = search.resume;
  useEffect(() => {
    if (hasCode) {
      if (isAuthenticated) {
        if (resume) {
          navigate({ to: atob(resume) });
        } else {
          navigate({
            search: (v) => {
              return _.omit(v, ["code", "state"]);
            },
          });
        }
        return;
      }
      const authenticateUser = async () => {
        await getAccessTokenSilently();
      };

      authenticateUser();
    }
  }, [hasCode, resume, isAuthenticated, navigate, getAccessTokenSilently]);

  return (
    <Box>
      {hasCode ? undefined : (
        <Box>
          Welcome page {isAuthenticated ? "auth" : "nope"}
          {hasCode ? "got code" : "NO CODE"}
        </Box>
      )}
      <Outlet />
    </Box>
  );
}
