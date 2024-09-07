import { createFileRoute, Outlet } from "@tanstack/react-router";
import { addTabProps } from "@fl/routing";
import { FLLinkTabs } from "@fl/routing-components";
import { Box } from "@chakra-ui/react";

const tabs = ["snake", "was", "here"] as const;

export const Route = createFileRoute("/miro/$miroId/$tabId")(
  addTabProps(
    {
      component: TabDisplay,
    },
    "tabId",
    tabs
  )
);

function TabDisplay() {
  const params = Route.useParams();
  return (
    <Box>
      <Box>inside tab</Box>
      <Box>{JSON.stringify(params, null, 2)}</Box>
      <FLLinkTabs
        tabs={tabs}
        tabKey="tabId"
        h={10}
        w="full"
        // linkProps={{
        //   variant: "tab",
        //   size: { sm: "sm", md: "md", lg: "lg" },
        // }}
      />
      <Outlet />
    </Box>
  );
}
