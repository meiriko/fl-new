import { createFileRoute } from "@tanstack/react-router";
// import { addTabProps } from "fl-routing";

// const tabs = ["miro", "was", "here"] as const;

export const Route = createFileRoute("/miro/$miroId/$tabId")(
  // addTabProps(
  {
    component: TabDisplay,
  }
  //, "tabId", tabs)
);

function TabDisplay() {
  const params = Route.useParams();
  return (
    <div>
      <div>inside tab</div>
      <div>{JSON.stringify(params, null, 2)}</div>
    </div>
  );
}
