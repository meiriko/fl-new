import { createFileRoute } from "@tanstack/react-router";
import { addTabProps } from "@fl/routing";
import { FLLinkTabs } from "@fl/routing-components";

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
    </div>
  );
}
