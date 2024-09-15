import { Box } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { Auth0Login } from "@fl/components";

export const Route = createFileRoute("/Auth")({
  component: Auth,
});

function Auth() {
  return (
    <Box>
      <Box>auth/login page</Box>
      <Auth0Login resume={btoa("/")} />
    </Box>
  );
}
