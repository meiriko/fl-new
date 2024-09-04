import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/miro/$miroId/$tabId")({
  component: TabDisplay,
});

function TabDisplay() {
  const params = Route.useParams();
  return (
    <div>
      <div>inside tab</div>
      <div>{JSON.stringify(params, null, 2)}</div>
    </div>
  );
}
