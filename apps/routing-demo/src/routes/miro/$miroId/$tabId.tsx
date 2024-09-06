import { createFileRoute } from "@tanstack/react-router";
import { addTabProps } from "@fl/routing";
import { FLTabs } from "@fl/routing-components";

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
    <div>
      <div>inside tab</div>
      <div>{JSON.stringify(params, null, 2)}</div>
      <FLTabs
        tabs={tabs}
        tabKey="tabId"
        h={10}
        bg="gray.500"
        w="full"
        justifyContent="space-between"
        linkProps={{
          color: "blue",
          px: 8,
          h: "full",
          display: "flex",
          alignItems: "center",
          _activeLink: { color: "red", bg: "black" },
          _hover: { bg: "gray.400" },
        }}
      />
    </div>
  );
}
